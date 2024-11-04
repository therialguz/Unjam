import { describe, it, expect } from "vitest";
import { reduce } from "./index";

describe("reduce", () => {
  it("should sum all numbers in an array", async () => {
    const array = [1, 2, 3, 4];
    const result = await reduce(
      array,
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    expect(result).toBe(10);
  });

  it("should concatenate all strings in an array", async () => {
    const array = ["a", "b", "c", "d"];
    const result = await reduce(
      array,
      (previousValue, currentValue) => previousValue + currentValue,
      ""
    );
    expect(result).toBe("abcd");
  });

  it("should return the initial value for an empty array", async () => {
    const array: number[] = [];
    const result = await reduce(
      array,
      (previousValue, currentValue) => previousValue + currentValue,
      10
    );
    expect(result).toBe(10);
  });

  it("should handle array of objects", async () => {
    const array = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const result = await reduce(
      array,
      (previousValue, currentValue) => previousValue + currentValue.value,
      0
    );
    expect(result).toBe(6);
  });
});
