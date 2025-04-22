"use client";
import { usePizza } from "@/components/pages/detail/pizza-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Topping } from "@/types/pizza";

export function PizzaToppingSelector() {
  const { toppings, selectedToppings, setSelectedToppings } = usePizza();

  const handleToppingChange = (toppingId: string) => {
    setSelectedToppings((prev) => {
      if (prev.includes(toppingId)) {
        return prev.filter((id) => id !== toppingId);
      } else {
        return [...prev, toppingId];
      }
    });
  };

  const selectedToppingObjects = selectedToppings
    .map((id) => toppings.find((t) => t.id === id))
    .filter(Boolean) as Topping[];

  let sortedToppings = [...selectedToppingObjects].sort(
    (a, b) => a.price - b.price
  );

  const paidToppings = sortedToppings.slice(3);
  const toppingsPrice = paidToppings.reduce(
    (sum, topping) => sum + topping.price,
    0
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-3">Extra Toppings</h2>
        <span className="text-green-600 font-medium text-sm mb-3">
          First 3 cheapest toppings free
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {toppings.map((topping) => {
          // Determine if this topping would be free based on current selections
          let isFree = false;
          if (selectedToppings.includes(topping.id)) {
            // Get all selected toppings
            const selectedToppingObjects = sortedToppings
              .map((topping) => toppings.find((t) => t.id === topping.id))
              .filter(Boolean) as Topping[];

            // Sort by price
            sortedToppings = [...selectedToppingObjects].sort(
              (a, b) => a.price - b.price
            );

            // Check if this topping is among the 3 cheapest
            const cheapestThree = sortedToppings.slice(0, 3);
            isFree = cheapestThree.some((t) => t.id === topping.id);
          }

          return (
            <div key={topping.id} className="flex items-center space-x-2 h-5">
              <Checkbox
                name="toppings"
                value={String(topping.id)}
                id={String(topping.id)}
                checked={selectedToppings.includes(topping.id)}
                onCheckedChange={() => handleToppingChange(topping.id)}
              />
              <Label htmlFor={String(topping.id)} className="flex items-center">
                {topping.name}
                {selectedToppings.includes(topping.id) && isFree ? (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                    Free
                  </span>
                ) : (
                  <span className="ml-1 text-xs">
                    (+${topping.price.toFixed(2)})
                  </span>
                )}
              </Label>
            </div>
          );
        })}
      </div>
      <div>{toppingsPrice}</div>
    </div>
  );
}
