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

  it.skip("catches errors in the callback", async () => {
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

  it("process a large array in batches", async () => {
    // Enable fake timers
    vi.useFakeTimers({ shouldAdvanceTime: true });

    const arr = Array.from({ length: 1_000_000 }, (_, i) => i);
    const result: number[] = [];

    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");

    await forEach(arr, (item) => result.push(item));

    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(result).toEqual(arr);

    // Clear the spy and restore timers
    setTimeoutSpy.mockRestore();
    vi.useRealTimers();
  });
});
