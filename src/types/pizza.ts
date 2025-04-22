import { Tables } from "@/types/database.types";

export type Pizza = Omit<Tables<"pizzas">, "created_at">;
export type Topping = Omit<Tables<"toppings">, "created_at">;
export type Drink = Omit<Tables<"drinks">, "created_at">;

export type PizzaSizes = "small" | "medium" | "large";
