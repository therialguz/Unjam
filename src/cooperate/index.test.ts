import { cooperate, CooperatePromise } from ".";

describe("cooperate", () => {
  it("should call the callback and resolve the promise", async () => {
    const callback = vi.fn(async () => {});
    const promise = cooperate(callback) as CooperatePromise<void>;
    await promise;

    expect(callback).toHaveBeenCalled();
    expect(promise._status.numberOfCooperations).toBe(1);
  });

  it("should propagate any error thrown by the callback", async () => {
    const callback = vi.fn(() => {
      throw new Error("Test error");
    });
    const promise = cooperate(callback) as CooperatePromise<never>;

    await expect(promise).rejects.toThrow("Test error");
    expect(callback).toHaveBeenCalled();
    expect(promise._status.numberOfCooperations).toBe(1);
  });

  it("should handle cooperative handoff", async () => {
    const callback = vi.fn(async (handoff) => {
      await handoff();
    });
    const promise = cooperate(callback) as CooperatePromise<void>;
    await promise;

    expect(callback).toHaveBeenCalledTimes(1);
    expect(promise._status.numberOfCooperations).toBe(2);
  });

  it("should handle nested cooperation", async () => {
    const parentCooperation = cooperate(async (handoff) => {
      await handoff();
      await handoff();
      await handoff();
      await cooperate(async (handoff) => {
        await handoff();
        await handoff();
        await handoff();
      });
      return 123;
    }) as CooperatePromise<number>;

    await parentCooperation;

    // 1 parent + 3 parent handoffs
    expect(parentCooperation._status.numberOfCooperations).toBe(4);
  });
});
