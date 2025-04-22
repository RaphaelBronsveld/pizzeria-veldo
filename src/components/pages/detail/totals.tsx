import { usePizza } from "@/components/pages/detail/pizza-provider";

export function Totals() {
  const { size, pizza, toppings, selectedToppings } = usePizza();
  return (
    <div className="pt-4 border-t">
      <h2 className="text-lg font-semibold mb-3">Totals</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>
            Pizza {pizza.name} ({size}):
          </span>
          <span>
            $
            {size === "small"
              ? (pizza.price - 2).toFixed(2)
              : size === "large"
                ? (pizza.price + 3).toFixed(2)
                : pizza.price.toFixed(2)}
          </span>
        </div>

        {selectedToppings.length > 0 && (
          <div>
            <div className="flex justify-between">
              <span>Toppings:</span>
              <span>
                {selectedToppings.length <= 3
                  ? "FREE (3 free toppings promotion)"
                  : (() => {
                      // Get the selected topping objects
                      const selectedToppingObjects = selectedToppings
                        .map((id) => toppings.find((t) => t.id === id))
                        .filter(Boolean);

                      // Sort by price
                      const sortedToppings = [...selectedToppingObjects].sort(
                        (a, b) => a.price - b.price
                      );

                      // Only charge for toppings beyond the first 3 cheapest
                      const paidToppings = sortedToppings.slice(3);
                      const toppingsPrice = paidToppings.reduce(
                        (sum, topping) => sum + topping.price,
                        0
                      );

                      return `$${toppingsPrice.toFixed(2)} (3 free + ${paidToppings.length} paid)`;
                    })()}
              </span>
            </div>
          </div>
        )}

        {/*{selectedDrink !== "none" && (
          <div className="flex justify-between">
            <span>
              Drink ({drinks.find((d) => d.id === selectedDrink)?.name}
              ):
            </span>
            <span>
              ${drinks.find((d) => d.id === selectedDrink)?.price.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">Total Price:</span>
        <span className="text-2xl font-bold text-red-700">
          ${totalPrice.toFixed(2)}
        </span> */}
      </div>
    </div>
  );
}
