import { describe, it, expect } from "vitest";
import { every } from "./index";

describe("every", () => {
  it("should return true if all elements satisfy the condition", async () => {
    const array = [1, 30, 39, 29, 10, 13];
    const result = await every(array, (value) => value < 40);
    expect(result).toBe(true);
  });

  it("should return false if any element does not satisfy the condition", async () => {
    const array = [1, 30, 39, 29, 10, 41];
    const result = await every(array, (value) => value < 40);
    expect(result).toBe(false);
  });

  it("should return true for an empty array", async () => {
    const array: number[] = [];
    const result = await every(array, (value) => value < 40);
    expect(result).toBe(true);
  });
});
