"use server";

import { PizzaSizes } from "@/types/pizza";

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
}: PlaceOrderInput) {
  console.log(pizzaId);
  console.log(toppingIds);
  console.log(drinkId);
}
