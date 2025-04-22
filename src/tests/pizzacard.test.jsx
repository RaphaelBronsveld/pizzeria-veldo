import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PizzaCard } from "../components/pizza-card";

const pizza = {
  id: 1,
  name: "Margherita",
  description:
    "Classic tomato sauce, fresh mozzarella, basil, and extra virgin olive oil",
  price: 12.99,
  image: "/pizzas/margherita.webp",
};

describe("PizzaCard", () => {
  it("adjusts loading attribute based on given position property ", () => {
    const { rerender } = render(<PizzaCard pizza={pizza} position={0} />);

    const img = screen.getByRole("img");
    expect(img.getAttribute("loading")).toBe("eager");

    rerender(<PizzaCard pizza={pizza} position={2} />);
    expect(img.getAttribute("loading")).toBe("lazy");
  });
});
