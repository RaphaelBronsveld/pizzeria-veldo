import { Drink, Pizza, PizzaSizes, Topping } from "@/types/pizza";

type CalculatePricingInput = {
  pizza: Pizza;
  size: PizzaSizes;
  toppings?: Topping[] | null;
  drink?: Drink | null;
};

export function calculateOrderTotal({
  pizza,
  size,
  toppings,
  drink,
}: CalculatePricingInput) {
  const basePrice = pizza.price;

  const sizePriceAdjustment = {
    small: 0,
    medium: 1,
    large: 2,
  }[size];

  const toppingsTotal = toppings?.reduce((sum, t) => sum + t.price, 0) || 0;
  const drinkPrice = drink?.price ?? 0;

  const total = basePrice + sizePriceAdjustment + toppingsTotal + drinkPrice;

  return {
    base: basePrice,
    sizeAdjustment: sizePriceAdjustment,
    toppingsTotal,
    drinkPrice,
    total,
  };
}
