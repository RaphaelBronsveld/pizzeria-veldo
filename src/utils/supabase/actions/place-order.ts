"use server";

import { calculateTotals } from "@/lib/pricing";
import { OrderItem } from "@/types/order";
import { PizzaSizes, Topping } from "@/types/pizza";
import { createClient } from "@/utils/supabase/server";
import {
  getDrinks,
  getPizza,
  getToppings,
} from "@/utils/supabase/services/query-data";

export type PlaceOrderInput = {
  pizzaId: string;
  size: PizzaSizes;
  toppingIds?: string[] | null;
  drinkId?: string | null;
};

export async function placeOrder({
  pizzaId,
  toppingIds,
  drinkId,
  size,
}: PlaceOrderInput) {
  // Very.. very simple validation.
  if (!pizzaId || !toppingIds || !drinkId)
    return { success: false, message: "Please verify your input :)" };

  try {
    // Fetch "fresh" data from DB.
    const [pizza, toppings, drinks] = await Promise.all([
      getPizza({ id: pizzaId }),
      getToppings(),
      getDrinks(),
    ]);

    const selectedToppingObjects = toppingIds.map((topping) => {
      return toppings.find((t) => t.id === topping);
    }) as Topping[];

    const activeDrink = drinks.find((d) => d.id === drinkId);

    const { totals, metadata } = calculateTotals({
      pizza,
      size,
      toppings: selectedToppingObjects,
      drink: activeDrink,
    });

    const isToppingFree = (topping: Topping): boolean =>
      metadata.toppingsTotal.free.some((t: Topping) => t.id === topping.id);

    const order = await insertOrder({ grandTotal: totals.grandTotal });
    const orderItems = [
      {
        order_id: order.id,
        sku: pizza.sku,
        total: totals.price, // includes size adjustment
      },
      ...selectedToppingObjects.map((topping) => {
        return {
          order_id: order.id,
          sku: topping.sku,
          total: isToppingFree(topping) ? 0 : topping.price,
        };
      }),
      ...(activeDrink && activeDrink.sku !== "none"
        ? [
            {
              order_id: order.id,
              sku: activeDrink?.sku,
              total: activeDrink?.price,
            },
          ]
        : []),
    ] as OrderItem[];

    await insertOrderItems({
      orderItems,
    });
  } catch (error) {
    console.error(error);
    throw new Error(
      "Something went wrong placing the order. Please try again."
    );
  }
}

const insertOrder = async ({ grandTotal }: { grandTotal: number }) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .insert({ grand_total: grandTotal })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const insertOrderItems = async ({
  orderItems,
}: {
  orderItems: OrderItem[];
}) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("order_item")
    .insert(orderItems)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
