"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { usePizza } from "@/components/pages/detail/pizza-provider";
import { PizzaSizes } from "@/types/pizza";

export function PizzaSizeSelector() {
  const { pizza, size, setSize } = usePizza();
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Choose Your Size</h2>
      <RadioGroup
        value={size}
        onValueChange={(v: PizzaSizes) => {
          setSize(v);
        }}
        className="flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="small" id="size-small" />
          <Label htmlFor="size-small">
            Small (10&quot;) - ${(pizza.price - 2).toFixed(2)}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="size-medium" />
          <Label htmlFor="size-medium">
            Medium (12&quot;) - ${pizza.price.toFixed(2)}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="large" id="size-large" />
          <Label htmlFor="size-large">
            Large (14&quot;) - ${(pizza.price + 3).toFixed(2)}
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
