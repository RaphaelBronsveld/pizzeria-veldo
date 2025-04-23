import { describe, it, expect } from "vitest";
import { calculateTotals } from "../lib/pricing";

describe("calculateTotals", () => {
  const mockInput = {
    pizza: { price: 10 },
    size: "large",
    toppings: [{ price: 1.5 }, { price: 2 }],
    drink: { price: 3 },
  };

  it("should calculate the correct totals", () => {
    const { totals } = calculateTotals(mockInput);
    expect(totals.price).toBe(11);
    expect(totals.toppingsTotal).toBe(0);
    expect(totals.drinkTotal).toBe(3);
    expect(totals.grandTotal).toBe(14);
  });

  it("should handle missing drink and toppings", () => {
    const { totals } = calculateTotals({
      ...mockInput,
      drink: undefined,
      toppings: [],
    });
    expect(totals.drinkTotal).toBe(0);
    expect(totals.toppingsTotal).toBe(0);
    expect(totals.grandTotal).toBe(11);
  });

  /** Topping specific tests */
  it("should be free if fewer than 3 toppings selected", () => {
    const { totals, metadata } = calculateTotals({
      ...mockInput,
      toppings: [{ price: 1 }, { price: 2 }],
    });

    expect(totals.toppingsTotal).toBe(0);
    expect(metadata.toppingsTotal.free.length).toBe(2);
    expect(metadata.toppingsTotal.paid.length).toBe(0);
    expect(metadata.toppingsTotal.description).toBe("3 free + 0 paid");
  });

  it("should be free when exactly 3 toppings are selected", () => {
    const { totals, metadata } = calculateTotals({
      ...mockInput,
      toppings: [{ price: 1 }, { price: 2 }, { price: 3 }],
    });

    expect(totals.toppingsTotal).toBe(0);
    expect(metadata.toppingsTotal.free.length).toBe(3);
    expect(metadata.toppingsTotal.paid.length).toBe(0);
    expect(metadata.toppingsTotal.description).toBe("3 free + 0 paid");
  });

  it("should calculate price for toppings when 3+ toppigns are selected", () => {
    const { totals, metadata } = calculateTotals({
      ...mockInput,
      toppings: [
        { price: 0.5 },
        { price: 1 },
        { price: 1.5 },
        { price: 2 },
        { price: 3 },
      ],
    });

    expect(totals.toppingsTotal).toBe(5);
    expect(metadata.toppingsTotal.free.length).toBe(3);
    expect(metadata.toppingsTotal.paid.length).toBe(2);
    expect(metadata.toppingsTotal.description).toBe("3 free + 2 paid");
  });
});
