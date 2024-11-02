import { executeCooperative } from ".";

describe("executeCooperative", () => {
  it("iterates over an array", async () => {
    const arr = [1, 2, 3];
    const result: number[] = [];
    const resolve = vi.fn();
    executeCooperative(arr, 0, (item) => result.push(item), resolve);
    expect(result).toEqual(arr);
    expect(resolve).toHaveBeenCalled();
  });

  it("handles an empty array without errors", async () => {
    const arr: number[] = [];
    const result: number[] = [];
    const resolve = vi.fn();
    executeCooperative(arr, 0, (item) => result.push(item), resolve);
    expect(result).toEqual(arr);
  });

  it("catches errors in the callback", async () => {
    const arr = [1, 2, 3];
    const result: number[] = [];
    const error = new Error("test error");
    const resolve = vi.fn();
    try {
      executeCooperative(
        arr,
        0,
        (item) => {
          result.push(item);
          if (item === 2) throw error;
        },
        resolve
      );
    } catch (e) {
      expect(e).toBe(error);
    }
  });

  it("process a large array in batches", async () => {
    // Enable fake timers
    vi.useFakeTimers({ shouldAdvanceTime: true });

    const arr = Array.from({ length: 1_000_000 }, (_, i) => i);
    const result: number[] = [];
    const resolve = vi.fn();

    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");

    executeCooperative(arr, 0, (item) => result.push(item), resolve);

    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(result).not.toEqual(arr);
    expect(resolve).not.toHaveBeenCalled();

    // Clear the spy and restore timers
    setTimeoutSpy.mockRestore();
    vi.useRealTimers();
  });

  it("process multiple cooperative executions", async () => {
    // Enable fake timers
    vi.useFakeTimers({ shouldAdvanceTime: true });

    const arr1 = Array.from({ length: 1_000_000 }, (_, i) => i);
    const arr2 = Array.from({ length: 10 }, (_, i) => i);
    const result1: number[] = [];
    const resolve1 = vi.fn();
    const resolve2 = vi.fn();

    const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");

    executeCooperative(
      arr1,
      0,
      (item) => {
        result1.push(item);
        executeCooperative(arr2, 0, () => {}, resolve2);
      },
      resolve1
    );

    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(result1).not.toEqual(arr1);
    expect(resolve1).not.toHaveBeenCalled();
    expect(resolve2).toHaveBeenCalled();

    // Clear the spy and restore timers
    setTimeoutSpy.mockRestore();
    vi.useRealTimers();
  });
});
