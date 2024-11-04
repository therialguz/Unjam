import { describe, it, expect } from "vitest";
import { groupBy } from "./index";

describe("groupBy", () => {
  it("should group numbers by their remainder when divided by 2", async () => {
    const array = [1, 2, 3, 4, 5, 6];
    const result = await groupBy(array, (value) => value % 2);
    expect(result.get(0)).toEqual([2, 4, 6]);
    expect(result.get(1)).toEqual([1, 3, 5]);
  });

  it("should group strings by their length", async () => {
    const array = ["one", "two", "three", "four", "five"];
    const result = await groupBy(array, (value) => value.length);
    expect(result.get(3)).toEqual(["one", "two"]);
    expect(result.get(4)).toEqual(["four", "five"]);
    expect(result.get(5)).toEqual(["three"]);
  });

  it("should return an empty map for an empty array", async () => {
    const array: number[] = [];
    const result = await groupBy(array, (value) => value % 2);
    expect(result.size).toBe(0);
  });

  it("should handle grouping by a property of objects", async () => {
    const array = [
      { type: "fruit", name: "apple" },
      { type: "fruit", name: "banana" },
      { type: "vegetable", name: "carrot" },
    ];
    const result = await groupBy(array, (value) => value.type);
    expect(result.get("fruit")).toEqual([
      { type: "fruit", name: "apple" },
      { type: "fruit", name: "banana" },
    ]);
    expect(result.get("vegetable")).toEqual([
      { type: "vegetable", name: "carrot" },
    ]);
  });
});
