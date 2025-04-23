"use client";
import { Drink, Pizza, PizzaSizes, Topping } from "@/types/pizza";
import { createContext, useContext, useState } from "react";

type PizzaContext =
  | {
      pizza: Pizza;
      /** Toppings */
      toppings: Topping[];
      selectedToppings: string[];
      setSelectedToppings: React.Dispatch<React.SetStateAction<string[]>>;
      /** Drinks */
      drinks: Drink[];
      selectedDrink: string;
      setSelectedDrink: React.Dispatch<React.SetStateAction<string>>;
      /** Pizza size */
      size: PizzaSizes;
      setSize: React.Dispatch<React.SetStateAction<PizzaSizes>>;
    }
  | undefined;

const PizzaContext = createContext<PizzaContext>(undefined);

/**
 * Currently the provider might be capturing a bit too much of the responsibilities
 * With providing current pizza, (selected) toppings, (selected) drinks.
 * For the purpose of this assessment I did split the responsibilities even further.
 */
export function PizzaProvider({
  children,
  pizza,
  toppings,
  drinks,
}: {
  children: React.ReactNode;
  pizza: Pizza;
  toppings: Topping[];
  drinks: Drink[];
}) {
  const [size, setSize] = useState<PizzaSizes>("medium");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<string>("none");

  return (
    <PizzaContext.Provider
      value={{
        pizza,
        toppings,
        drinks,
        selectedDrink,
        setSelectedDrink,
        size,
        setSize,
        selectedToppings,
        setSelectedToppings,
      }}
    >
      {children}
    </PizzaContext.Provider>
  );
}

/**
 * While `usePizza` does not really reflect the name in what it does..
 * I just had the opportunity to create a usePizza hook, so we'll keep it.
 *
 * @returns current visited pizza + drinks + toppings + selected size.
 */
export const usePizza = () => {
  const context = useContext(PizzaContext);
  if (!context) {
    throw new Error("usePizzaContext must be used within a PizzaProvider");
  }
  return context;
};
