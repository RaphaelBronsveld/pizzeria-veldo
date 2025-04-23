"use client";

import { DrinkSelector } from "@/components/pages/detail/drink-selector";
import { usePizza } from "@/components/pages/detail/pizza-provider";
import { PizzaSizeSelector } from "@/components/pages/detail/size-selector";
import { PizzaToppingSelector } from "@/components/pages/detail/topping-selector";
import { Totals } from "@/components/pages/detail/totals";
import { Button } from "@/components/ui/button";
import { placeOrder } from "@/utils/supabase/actions/place-order";
import { Loader, ShoppingCartIcon } from "lucide-react";
import { useState, useTransition } from "react";

export function PizzaConfigurator() {
  const { pizza, size } = usePizza();
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const pizzaId = String(formData.get("id"));
    const toppingIds = formData.getAll("toppings") as string[];
    const drinkId = String(formData.get("drink")) || null;

    startTransition(async () => {
      try {
        await placeOrder({
          pizzaId,
          toppingIds,
          drinkId,
          size,
        });
        setDialogOpen(true);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
          console.error("Error placing order:", e);
        } else {
          setError("Something went wrong");
          console.error("Unknown error:", e);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={pizza.id} />
      <div className="space-y-8">
        <PizzaSizeSelector />
        <PizzaToppingSelector />
        <DrinkSelector />
        <Button
          disabled={isPending}
          className="w-full bg-red-700 hover:bg-red-800 text-lg py-6"
        >
          {isPending ? (
            <>
              <Loader className="animate-spin mr-1" /> Placing order
            </>
          ) : (
            <>
              <ShoppingCartIcon className="mr-1" /> Order Now
            </>
          )}
        </Button>
        {error ? <>{error}</> : null}
        <Totals />

        <Alert
          message={
            "Tada! You successfully placed an order. Now.. the question remains, will your order actually be fulfilled?"
          }
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
    </form>
  );
}

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

/** Ideally you would do this in a context provider.. */
function Alert({
  message,
  open,
  onOpenChange,
}: {
  message: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bellissimo!</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOpenChange(false)}>
            I&apos;ll find out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
