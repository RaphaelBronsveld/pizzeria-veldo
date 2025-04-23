"use server";

import { createClient } from "@/utils/supabase/server";

/**
 * Fetch pizza's from Supabase.
 * Types are inferred from the createClient function.
 */
export async function getPizzas() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("pizzas").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPizza({ id }: { id: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pizzas")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getDrinks() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("drinks").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getToppings() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("toppings").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
