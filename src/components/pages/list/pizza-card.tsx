import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pizza } from "@/types/pizza";
import Image from "next/image";
import Link from "next/link";

type PizzaCardProps = {
  pizza: Pizza;
  /**
   * Position of the Pizza Card in a grid/list view.
   * this is used to determine if the image should be priority fetched.
   */
  position?: number | undefined;
};

export function PizzaCard({ pizza, position = undefined }: PizzaCardProps) {
  return (
    <Link
      href={`/menu/${pizza.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-lg duration-300 hover:shadow-xl"
    >
      <div className="relative h-48">
        <Image
          src={pizza.image || "/placeholder.svg"}
          alt={`${pizza.name} Pizza`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={position === 0}
          loading={
            position !== undefined ? (position > 1 ? "lazy" : "eager") : "lazy"
          }
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-red-700">{pizza.name}</h3>
        <p className="text-gray-600 mt-2 h-20 overflow-hidden">
          {pizza.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">${pizza.price.toFixed(2)}</span>
          <span
            className={cn(
              buttonVariants({ variant: "default" }),
              "group-hover:translate-x-0.5 transition-transform"
            )}
          >
            Configure
          </span>
        </div>
      </div>
    </Link>
  );
}
