import { describe, it, expect, vi } from "vitest";
import { cooperativeFor } from "./index";
import { CooperationPromise } from "../cooperate";
import { config } from "../config";

describe("cooperativeFor", () => {
  it("should execute action for each iteration when called with (end, action)", async () => {
    const action = vi.fn();
    const promise = cooperativeFor(5, action);
    await promise;
    expect(action).toHaveBeenCalledTimes(5);
    for (let i = 0; i < 5; i++) {
      expect(action).toHaveBeenCalledWith(i);
    }
  });

  it("should execute action for each iteration when called with (start, end, action)", async () => {
    const action = vi.fn();
    const promise = cooperativeFor(2, 5, action);
    await promise;
    expect(action).toHaveBeenCalledTimes(3);
    for (let i = 2; i < 5; i++) {
      expect(action).toHaveBeenCalledWith(i);
    }
  });

  it("should execute action for each iteration when called with (start, end, step, action)", async () => {
    const action = vi.fn();
    const promise = cooperativeFor(0, 10, 2, action);
    await promise;
    expect(action).toHaveBeenCalledTimes(5);
    for (let i = 0; i < 10; i += 2) {
      expect(action).toHaveBeenCalledWith(i);
    }
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
    const action = vi.fn(() => wait(5));
    const promise = cooperativeFor(0, 5, action) as CooperationPromise<void>;
    await promise;
    expect(action).toHaveBeenCalledTimes(5);
    expect(promise._status.numberOfCooperations).toEqual(5);

    // Reset the maxTime
    config.maxTime = originalTime;
  });

  it("should throw an error for invalid arguments", async () => {
    // @ts-ignore
    expect(() => cooperativeFor(0, 5)).toThrow(
      "Invalid arguments: Expected (end, action), (start, end, action), or (start, end, step, action)."
    );
  });
});
