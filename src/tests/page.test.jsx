import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

test("Homepage to contain one heading level 1 element.", () => {
  render(<Page />);
  expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
});
