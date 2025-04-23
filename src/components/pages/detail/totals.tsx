import { usePizza } from "@/components/pages/detail/pizza-provider";
import { calculateTotals } from "@/lib/pricing";
import { Topping } from "@/types/pizza";

export function Totals() {
  const { size, pizza, toppings, drinks, selectedToppings, selectedDrink } =
    usePizza();

  const selectedToppingObjects = selectedToppings.map((topping) => {
    return toppings.find((t) => t.id === topping);
  }) as Topping[];
  const activeDrink = drinks.find((d) => d.id === selectedDrink);

  const { totals, metadata } = calculateTotals({
    pizza,
    size,
    toppings: selectedToppingObjects,
    drink: activeDrink,
  });

  return (
    <div className="pt-4 border-t">
      <h2 className="text-lg font-semibold mb-3">Totals</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>
            Pizza {pizza.name} ({size}):
          </span>
          <span>${totals.price}</span>
        </div>

        {selectedToppings.length > 0 && (
          <div>
            <div className="flex justify-between">
              <span>Toppings:</span>
              <span>
                {selectedToppings.length <= 3
                  ? "Free (first 3 cheapest are free)"
                  : (() => {
                      return `$${totals.toppingsTotal} (3 free + ${metadata.toppingsTotal?.paid.length} paid)`;
                    })()}
              </span>
            </div>
          </div>
        )}

        {selectedDrink !== "none" && (
          <div className="flex justify-between">
            <span>
              Drink ({activeDrink?.name}
              ):
            </span>
            <span>${totals.drinkTotal}</span>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Grand Total:</span>
          <span className="text-2xl font-bold text-red-700">
            ${totals.grandTotal}
          </span>
        </div>
      </div>
    </div>
  );
}
