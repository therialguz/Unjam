import { describe, it, expect } from "vitest";
import { compactMap } from "./index";

describe("compactMap", () => {
  it("should map and filter out null and undefined values", async () => {
    const array = [1, 2, 3, 4, 5];
    const result = await compactMap(array, (value) =>
      value % 2 === 0 ? value * 2 : null
    );
    expect(result).toEqual([4, 8]);
  });

  it("should handle an empty array", async () => {
    const array: number[] = [];
    const result = await compactMap(array, (value) => value * 2);
    expect(result).toEqual([]);
  });

  it("should handle a promise that resolves to an array", async () => {
    const arrayPromise = Promise.resolve([1, 2, 3, 4, 5]);
    const result = await compactMap(arrayPromise, (value) =>
      value % 2 === 0 ? value * 2 : null
    );
    expect(result).toEqual([4, 8]);
  });

  it("should handle a callback that returns undefined", async () => {
    const array = [1, 2, 3, 4, 5];
    const result = await compactMap(array, (value) =>
      value % 2 === 0 ? undefined : value
    );
    expect(result).toEqual([1, 3, 5]);
  });

  it("should handle a callback that returns a mix of values", async () => {
    const array = [1, 2, 3, 4, 5];
    const result = await compactMap(array, (value) =>
      value % 2 === 0 ? value * 2 : null
    );
    expect(result).toEqual([4, 8]);
  });
});
