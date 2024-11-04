import { describe, it, expect } from "vitest";
import { some } from "./index";

describe("some", () => {
  it("should return true if at least one element satisfies the condition", async () => {
    const array = [1, 2, 3, 4];
    const result = await some(array, (value) => value > 2);
    expect(result).toBe(true);
  });

  it("should return false if no elements satisfy the condition", async () => {
    const array = [1, 2, 3, 4];
    const result = await some(array, (value) => value > 4);
    expect(result).toBe(false);
  });

  it("should return false for an empty array", async () => {
    const array: number[] = [];
    const result = await some(array, (value) => value > 0);
    expect(result).toBe(false);
  });

  it("should work with different types of elements", async () => {
    const array = ["apple", "banana", "cherry"];
    const result = await some(array, (value) => value === "banana");
    expect(result).toBe(true);
  });

  it("should pass the correct arguments to the callback function", async () => {
    const array = [1, 2, 3];
    const callback = vi.fn();
    await some(array, callback);
    expect(callback).toHaveBeenCalledWith(1, 0, array);
    expect(callback).toHaveBeenCalledWith(2, 1, array);
    expect(callback).toHaveBeenCalledWith(3, 2, array);
  });
});
