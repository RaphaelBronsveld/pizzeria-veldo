import { PizzaCard } from "@/components/pages/list/pizza-card";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "Menu | Pizzeria Veldo",
    description: "Something describing the menu page.",
  };
}
export default async function MenuPage() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <section>
        <h1 className="text-4xl font-bold text-red-900 mb-4">Our Menu</h1>
        <p className="text-lg text-red-800 max-w-2xl">
          Authentic Italian pizzas made with fresh ingredients and baked in our
          traditional wood-fired oven.
        </p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Suspense fallback={<PizzasSkeleton />}>
          <PizzaMenu />
        </Suspense>
      </section>
    </div>
  );
}

/**
 * While we could relocate pizza skeleton + pizza list + fetch data to another file..
 * since it'll only be used here this is fine.
 */
function PizzasSkeleton() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <div key={i}>
          <Skeleton className="h-48" />
          <div className="p-4 bg-white">
            <Skeleton className="h-7" />
            <Skeleton className="mt-2 h-20" />
            <Skeleton className="mt-4 h-8" />
          </div>
        </div>
      ))}
    </>
  );
}

async function PizzaMenu() {
  const pizzas = await getPizzas();

  // Simulate fake "loading time";
  // await new Promise((resolve) => setTimeout(resolve, 500));

  return (
    <>
      {pizzas.map((pizza, index) => (
        <PizzaCard pizza={pizza} position={index} key={`pizza-${pizza.id}`} />
      ))}
    </>
  );
}

/**
 * Fetch pizza's from Supabase.
 * Types are inferred from the createClient function.
 */
async function getPizzas() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("pizzas").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
