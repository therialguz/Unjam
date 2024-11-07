import { describe, it, expect } from "vitest";
import { unzip } from "./index";

describe("unzip", () => {
  it("should unzip an array of tuples into two arrays", async () => {
    const array = [
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ] as [number, string][];
    const result = await unzip(array);
    expect(result).toEqual([
      [1, 2, 3],
      ["a", "b", "c"],
    ]);
  });

  it("should handle an empty array", async () => {
    const array: [number, string][] = [];
    const result = await unzip(array);
    expect(result).toEqual([[], []]);
  });

  it("should handle a promise of an array", async () => {
    const array = Promise.resolve([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ] as [number, string][]);
    const result = await unzip(array);
    expect(result).toEqual([
      [1, 2, 3],
      ["a", "b", "c"],
    ]);
  });

  it("should handle arrays with different types", async () => {
    const array = [
      [1, true],
      [2, false],
      [3, true],
    ] as [number, boolean][];
    const result = await unzip(array);
    expect(result).toEqual([
      [1, 2, 3],
      [true, false, true],
    ]);
  });

  it("should handle arrays with complex types", async () => {
    const array = [
      [{ id: 1 }, "a"],
      [{ id: 2 }, "b"],
      [{ id: 3 }, "c"],
    ] as [{ id: number }, string][];
    const result = await unzip(array);
    expect(result).toEqual([
      [{ id: 1 }, { id: 2 }, { id: 3 }],
      ["a", "b", "c"],
    ]);
  });
});
