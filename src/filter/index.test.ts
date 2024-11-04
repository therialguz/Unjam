import { describe, it, expect } from "vitest";
import { filter } from "./index";

describe("filter", () => {
  it("filters out elements that do not pass the test", async () => {
    const array = [1, 30, 39, 29, 10, 13];
    const result = await filter(array, (value) => value < 30);
    expect(result).toEqual([1, 29, 10, 13]);
  });

  it("returns an empty array if no elements pass the test", async () => {
    const array = [31, 32, 33];
    const result = await filter(array, (value) => value < 30);
    expect(result).toEqual([]);
  });

  it("returns the same array if all elements pass the test", async () => {
    const array = [1, 2, 3];
    const result = await filter(array, (value) => value < 30);
    expect(result).toEqual([1, 2, 3]);
  });

  it("works with an empty array", async () => {
    const array: number[] = [];
    const result = await filter(array, (value) => value < 30);
    expect(result).toEqual([]);
  });

  it("passes the correct arguments to the callback function", async () => {
    const array = [1];
    const callback = vi.fn();
    await filter(array, callback);
    expect(callback).toHaveBeenCalledWith(1, 0, array);
  });
});
