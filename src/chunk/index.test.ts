import { describe, it, expect } from "vitest";
import { chunk } from "./index";

describe("chunk", () => {
  it("should chunk an array into smaller arrays of the specified size", async () => {
    const array = [1, 2, 3, 4, 5];
    const result = await chunk(array, 2);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("should handle an empty array", async () => {
    const array: number[] = [];
    const result = await chunk(array, 2);
    expect(result).toEqual([]);
  });

  it("should handle a chunk size larger than the array length", async () => {
    const array = [1, 2, 3];
    const result = await chunk(array, 5);
    expect(result).toEqual([[1, 2, 3]]);
  });

  it("should handle a chunk size of 1", async () => {
    const array = [1, 2, 3];
    const result = await chunk(array, 1);
    expect(result).toEqual([[1], [2], [3]]);
  });

  it("should handle a chunk size equal to the array length", async () => {
    const array = [1, 2, 3];
    const result = await chunk(array, 3);
    expect(result).toEqual([[1, 2, 3]]);
  });

  it("should handle a promise that resolves to an array", async () => {
    const arrayPromise = Promise.resolve([1, 2, 3, 4, 5]);
    const result = await chunk(arrayPromise, 2);
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });
});
