import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-red-900 sm:text-5xl md:text-6xl">
          Authentic Italian Pizza
          <span className="block text-red-700">Made Fresh Daily</span>
        </h1>
        <p className="mb-10 text-lg text-red-800 md:text-xl">
          Hand-tossed dough, premium ingredients, and wood-fired to perfection.
          Experience the taste of Italy right in your neighborhood.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/menu"
            className={buttonVariants({ variant: "default", size: "lg" })}
            // className="w-full sm:w-auto bg-red-700 hover:bg-red-800 text-white px-8 py-6 text-lg"
          >
            Order Online
          </Link>
          <Link
            href="/menu"
            className={buttonVariants({ variant: "outline", size: "lg" })}
            // className="w-full sm:w-auto border-red-700 text-red-700 hover:bg-red-50 px-8 py-6 text-lg"
          >
            Pickup
          </Link>
        </div>
      </div>
    </div>
  );
}
