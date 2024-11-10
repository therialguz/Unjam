import { cooperate, CooperationPromise } from ".";
import { CancelError } from "../CancelError";

describe("cooperate", () => {
  it("should call the callback and resolve the promise", async () => {
    const callback = vi.fn(async () => {});
    const promise = cooperate(callback) as CooperationPromise<void>;
    await promise;

    expect(callback).toHaveBeenCalled();
    expect(promise._status.numberOfCooperations).toBe(1);
  });

  it("should propagate any error thrown by the callback", async () => {
    const callback = vi.fn(() => {
      throw new Error("Test error");
    });
    const promise = cooperate(callback) as CooperationPromise<never>;

    await expect(promise).rejects.toThrow("Test error");
    expect(callback).toHaveBeenCalled();
    expect(promise._status.numberOfCooperations).toBe(1);
  });

  it("should handle cooperative handoff", async () => {
    const callback = vi.fn(async (handoff) => {
      await handoff();
    });
    const promise = cooperate(callback) as CooperationPromise<void>;
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
    }) as CooperationPromise<number>;

    await parentCooperation;

    // 1 parent + 3 parent handoffs
    expect(parentCooperation._status.numberOfCooperations).toBe(4);
  });

  describe("cancelation", () => {
    it("should throw an error if the cooperation is cancelled", async () => {
      const abortController = new AbortController();
      const callback = vi.fn(async (handoff) => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        await handoff();
      });

      const promise = cooperate(
        callback,
        abortController.signal
      ) as CooperationPromise<void>;
      abortController.abort();

      await expect(promise).rejects.toThrow(new CancelError());
    });

    it("should not throw an error if the cooperation is finished before being cancelled", async () => {
      const abortController = new AbortController();
      const callback = vi.fn(async (handoff) => {
        await handoff();
      });

      const promise = cooperate(
        callback,
        abortController.signal
      ) as CooperationPromise<void>;

      await promise;
      abortController.abort();

      expect(promise._status.numberOfCooperations).toBe(2);
    });

    it("should not cancel parent cooperation if a nested cooperation is cancelled", async () => {
      const abortController = new AbortController();
      const fn = vi.fn();
      await cooperate(async () => {
        setTimeout(() => abortController.abort(), 10);
        try {
          await cooperate(async () => {
            // This will be cancelled
            await new Promise((resolve) => setTimeout(resolve, 50));
          }, abortController.signal);
        } catch (error) {
          fn(error);
        }
      });

      expect(fn).toHaveBeenCalled();
      expect(fn).toHaveBeenCalledWith(new CancelError());
    });

    it.only("should not start a cooperation if the signal is already aborted", async () => {
      const abortController = new AbortController();
      abortController.abort();
      const callback = vi.fn(async () => {});

      const promise = cooperate(
        callback,
        abortController.signal
      ) as CooperationPromise<void>;

      await expect(promise).rejects.toThrow(new CancelError());
      expect(callback).not.toHaveBeenCalled();
    });

    it.only("should ", () => {});
  });
});
