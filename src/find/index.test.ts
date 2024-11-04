import { describe, it, expect } from "vitest";
import { find } from "./index";

describe("find", () => {
  it("should return the first element that satisfies the condition", async () => {
    const array = [5, 12, 8, 130, 44];
    const result = await find(array, (value) => value > 10);
    expect(result).toBe(12);
  });

  it("should return undefined if no element satisfies the condition", async () => {
    const array = [5, 8, 9];
    const result = await find(array, (value) => value > 10);
    expect(result).toBeUndefined();
  });

  it("should work with an empty array", async () => {
    const array: number[] = [];
    const result = await find(array, (value) => value > 10);
    expect(result).toBeUndefined();
  });

  it("should return the first element that satisfies the condition with complex objects", async () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = await find(array, (value) => value.id === 2);
    expect(result).toEqual({ id: 2 });
  });

  it("should return undefined if no element satisfies the condition with complex objects", async () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = await find(array, (value) => value.id === 4);
    expect(result).toBeUndefined();
  });
});
