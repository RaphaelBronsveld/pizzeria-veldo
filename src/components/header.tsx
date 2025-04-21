import { Pizza } from "lucide-react";
import Link from "next/link";

type NavItem = {
  /** Href of nav header item */
  href: string;
  /** Label of the nav header item */
  label: string;
};

const navItems: NavItem[] = [{ href: "/menu", label: "Menu" }];

export function Header() {
  return (
    <header className="p-4 container mx-auto flex justify-between">
      <Link href="/" className="flex items-center gap-2 text-red-700">
        <Pizza className="h-8 w-8" />
        <span className="text-xl font-bold">Pizzeria Veldo</span>
      </Link>
      <nav className="flex items-center gap-6">
        {navItems.map((navItem) => {
          return (
            <Link
              key={`navitem-${navItem.label}`}
              href={navItem.href}
              className="p-1 text-red-900 hover:text-red-700"
            >
              {navItem.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
