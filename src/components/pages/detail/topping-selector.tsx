"use client";
import { usePizza } from "@/components/pages/detail/pizza-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { calculateToppingPricing } from "@/lib/pricing";
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

  const { free: freeToppings } = calculateToppingPricing(
    selectedToppingObjects
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
          const isSelected = selectedToppings.includes(topping.id);
          const isFree =
            isSelected && freeToppings.some((t) => t.id === topping.id);

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
    </div>
  );
}
