import { describe, it, expect } from "vitest";
import { flatMap } from "./index";

describe("flatMap", () => {
  it("should flatten and map the array correctly", async () => {
    const array = [1, 2, 3, 4];
    const result = await flatMap(array, (value) => [value, value * 2]);
    expect(result).toEqual([1, 2, 2, 4, 3, 6, 4, 8]);
  });

  it("should handle an empty array", async () => {
    const array: number[] = [];
    const result = await flatMap(array, (value) => [value, value * 2]);
    expect(result).toEqual([]);
  });

  it("should handle a callback that returns an empty array", async () => {
    const array = [1, 2, 3, 4];
    const result = await flatMap(array, () => []);
    expect(result).toEqual([]);
  });

  it("should handle a callback that returns arrays of different lengths", async () => {
    const array = [1, 2, 3];
    const result = await flatMap(array, (value) =>
      value % 2 === 0 ? [value] : [value, value * 2, value * 3]
    );
    expect(result).toEqual([1, 2, 3, 2, 3, 6, 9]);
  });

  it("should pass the correct arguments to the callback", async () => {
    const array = [1, 2, 3];
    const callback = vi.fn((value) => [value]);
    await flatMap(array, callback);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenNthCalledWith(1, 1, 0, array);
    expect(callback).toHaveBeenNthCalledWith(2, 2, 1, array);
    expect(callback).toHaveBeenNthCalledWith(3, 3, 2, array);
  });
});
