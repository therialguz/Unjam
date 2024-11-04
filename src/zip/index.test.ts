import { describe, it, expect } from "vitest";
import { zip } from "./index";

describe("zip", () => {
  it("should zip two arrays of equal length", async () => {
    const array1 = [1, 2, 3];
    const array2 = ["a", "b", "c"];
    const result = await zip(array1, array2);
    expect(result).toEqual([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);
  });

  it("should zip two arrays of different lengths", async () => {
    const array1 = [1, 2];
    const array2 = ["a", "b", "c"];
    const result = await zip(array1, array2);
    expect(result).toEqual([
      [1, "a"],
      [2, "b"],
    ]);
  });

  it("should return an empty array if both arrays are empty", async () => {
    const array1: number[] = [];
    const array2: string[] = [];
    const result = await zip(array1, array2);
    expect(result).toEqual([]);
  });

  it("should return an empty array if one of the arrays is empty", async () => {
    const array1: number[] = [];
    const array2 = ["a", "b", "c"];
    const result = await zip(array1, array2);
    expect(result).toEqual([]);
  });

  it("should handle arrays with different types", async () => {
    const array1 = [1, 2, 3];
    const array2 = [true, false, true];
    const result = await zip(array1, array2);
    expect(result).toEqual([
      [1, true],
      [2, false],
      [3, true],
    ]);
  });
});
