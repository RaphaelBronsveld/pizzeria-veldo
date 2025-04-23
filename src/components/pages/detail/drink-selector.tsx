"use client";

import { usePizza } from "@/components/pages/detail/pizza-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DrinkSelector() {
  const { drinks, selectedDrink, setSelectedDrink } = usePizza();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Add a Drink</h2>
      <Select
        name="drink"
        value={selectedDrink}
        onValueChange={setSelectedDrink}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a drink" />
        </SelectTrigger>
        <SelectContent>
          {drinks.map((drink) => (
            <SelectItem key={drink.id} value={drink.id}>
              {drink.name} {drink.price > 0 && `(+$${drink.price.toFixed(2)})`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
