import { forEach } from ".";

describe("forEach", () => {
  it("iterates over an array", async () => {
    const arr = [1, 2, 3];
    const result: number[] = [];
    await forEach(arr, (item) => result.push(item));
    expect(result).toEqual(arr);
  });

  it("handles an empty array without errors", async () => {
    const arr: number[] = [];
    const result: number[] = [];
    await forEach(arr, (item) => result.push(item));
    expect(result).toEqual(arr);
  });

  it("catches errors in the callback", async () => {
    const arr = [1, 2, 3];
    const result: number[] = [];
    const error = new Error("test error");
    try {
      await forEach(arr, (item) => {
        result.push(item);
        if (item === 2) throw error;
      });
    } catch (e) {
      expect(e).toBe(error);
    }
  });
});
