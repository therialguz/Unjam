import { cooperativeWhile } from ".";
import { config } from "../config";
import { CooperatePromise } from "../cooperate";

describe("cooperativeWhile", () => {
  it("should iterate while condition is true", async () => {
    let count = 0;
    const condition = vi.fn(() => count < 10);
    const action = vi.fn(() => count++);
    const promise = cooperativeWhile(
      condition,
      action
    ) as CooperatePromise<void>;
    await promise;

    expect(count).toBe(10);
    expect(condition).toHaveBeenCalledTimes(11);
    expect(action).toHaveBeenCalledTimes(10);
    expect(promise._status.numberOfCooperations).toBe(1);
  });

  it("should not iterates if condition is false", async () => {
    let count = 0;
    const condition = vi.fn(() => count < 0);
    const action = vi.fn(() => count++);
    const promise = cooperativeWhile(
      condition,
      action
    ) as CooperatePromise<void>;
    await promise;

    expect(count).toBe(0);
    expect(condition).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledTimes(0);
    expect(promise._status.numberOfCooperations).toBe(1);
  });

  it("should propagate any error thrown by the action", async () => {
    const condition = vi.fn(() => true);
    const action = vi.fn(() => {
      throw new Error("Test error");
    });
    const promise = cooperativeWhile(
      condition,
      action
    ) as CooperatePromise<void>;

    await expect(promise).rejects.toThrow("Test error");
    expect(condition).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledTimes(1);
    expect(promise._status.numberOfCooperations).toBe(1);
  });

  it("should handle cooperative handoff when maxTime is exceeded", async () => {
    // Set the maxTime to a low value to force a handoff
    const originalTime = config.maxTime;
    config.maxTime = 1;

    const wait = (ms: number) => {
      const start = Date.now();
      let now = start;
      while (now - start < ms) {
        now = Date.now();
      }
    };
    let i = 0;
    const action = vi.fn(() => {
      i++;
      wait(6);
    });
    const promise = cooperativeWhile(
      () => i < 5,
      action
    ) as CooperatePromise<void>;
    await promise;
    expect(action).toHaveBeenCalledTimes(5);
    expect(promise._status.numberOfCooperations).toEqual(5);

    // Reset the maxTime
    config.maxTime = originalTime;
  });
});
