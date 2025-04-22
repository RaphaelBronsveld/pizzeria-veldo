import { cache } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cn } from "../../../lib/utils";
import { PizzaConfigurator } from "@/components/pages/detail/configurator";
import { PizzaProvider } from "@/components/pages/detail/pizza-provider";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const pizza = await getPizza({ id });
  return {
    title: pizza ? `Pizza ${pizza.name} | Pizzeria Veldo` : "Pizza Not Found",
    description: pizza ? pizza.description : "Some Pizza description",
  };
}

export default async function PizzaDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pizza = await getPizza({ id });
  const toppings = await getToppings();
  const drinks = await getDrinks();

  return (
    <div className="pb-12">
      <Link
        href="/menu"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mb-4 pl-0! text-red-700"
        )}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Menu
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={pizza.image || "/placeholder.svg"}
            alt={`${pizza.name} Pizza`}
            fill
            priority={true}
            className="object-cover"
          />
        </div>

        <section>
          <h1 className="text-3xl font-bold text-red-700 mb-2">{pizza.name}</h1>
          <p className="text-gray-600 mb-6">{pizza.description}</p>

          <PizzaProvider pizza={pizza} drinks={drinks} toppings={toppings}>
            <PizzaConfigurator />
          </PizzaProvider>
        </section>
      </div>
    </div>
  );
}

const getPizza = cache(async ({ id }: { id: string }) => {
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
});

const getToppings = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("toppings").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
});

const getDrinks = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("drinks").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
});
