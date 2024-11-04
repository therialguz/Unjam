import { map } from ".";

describe("map", () => {
  it("maps over an array", async () => {
    const arr = [1, 2, 3];
    const result = await map(arr, (item) => item * 2);
    expect(result).toEqual([2, 4, 6]);
  });

  it("handles an empty array without errors", async () => {
    const arr: number[] = [];
    const result = await map(arr, (item) => item * 2);
    expect(result).toEqual([]);
  });

  it("catches errors in the callback", async () => {
    const arr = [1, 2, 3];
    const error = new Error("test error");
    try {
      await map(arr, (item) => {
        if (item === 2) throw error;
        return item * 2;
      });
    } catch (e) {
      expect(e).toBe(error);
    }
  });
});
