import { Drink, Pizza, PizzaSizes, Topping } from "@/types/pizza";

type CalculatePricingInput = {
  pizza: Pizza;
  size: PizzaSizes;
  toppings: Topping[];
  drink?: Drink;
};

type TotalResult<M = undefined> = {
  value: number;
  meta?: M;
};

type TotalHandler<M = undefined> = (
  input: CalculatePricingInput
) => TotalResult<M>;

const totalHandlers: { id: string; handler: TotalHandler }[] = [
  {
    id: "price",
    handler: ({ size, pizza }) => ({
      value: { small: -1, medium: 0, large: 1 }[size] + pizza.price,
    }),
  },
  {
    id: "toppingsTotal",
    handler: ({ toppings }) => {
      const { free, paid, total, description } =
        calculateToppingPricing(toppings);

      return {
        value: total,
        meta: {
          free: free,
          paid: paid,
          description,
        },
      };
    },
  },
  {
    id: "drinkTotal",
    handler: ({ drink }) => ({ value: drink?.price ?? 0 }),
  },
];

export function calculateTotals(input: CalculatePricingInput) {
  const totals: Record<string, number> = {};
  // TODO: I'd like to infer types without creating a type map for each total.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const metadata: Record<string, any> = {};

  for (const { id, handler } of totalHandlers) {
    const result = handler(input);

    totals[id] = result.value;
    if (result.meta) {
      metadata[id] = result.meta;
    }
  }

  const total = Object.values(totals).reduce((sum, val) => sum + val, 0);
  totals["grandTotal"] = +total.toFixed(2);

  return {
    totals,
    metadata,
  };
}

export type ToppingPricingMeta = {
  free: Topping[];
  paid: Topping[];
  total: number;
  description: string;
};

/**
 * Calculate topping pricing.
 */
export function calculateToppingPricing(
  toppings: Topping[],
  firstXFree: number = 3
): ToppingPricingMeta {
  const sorted = [...toppings].sort((a, b) => a.price - b.price);
  const free = sorted.slice(0, firstXFree);
  const paid = sorted.slice(firstXFree);
  const total = paid.reduce((sum, t) => sum + t.price, 0) || 0;

  return {
    free,
    paid,
    total: Math.round(total * 100) / 100,
    description: `${firstXFree} free + ${paid.length} paid`,
  };
}
