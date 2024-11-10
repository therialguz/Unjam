import { CancelError } from "../CancelError";

/**
 * Global variable to store the current cooperation. This is used to ensure that nested cooperations are handled correctly.
 * The first element is the cooperation ID and the second element is the time when the cooperation started.
 * @internal
 */
let cooperationStatus: {
  initiator: Symbol;
  startedAt: number;
} | null = null;

/**
 * Executes a function cooperatively, allowing it to hand off control to the next cooperative function.
 * @param callback - The callback function to execute cooperatively.
 * @returns A promise that resolves when the cooperation is complete.
 */
export const cooperate = <T = void>(
  callback: (handoff: () => Promise<void>) => Promise<T>,
  signal?: AbortSignal
): CooperationPromise<T> => {
  const cooperationId = Symbol();

  const status: CooperationPromise<T>["_status"] = {
    numberOfCooperations: 0,
  };

  let signalEventListenerAbortController: AbortController | undefined =
    undefined;

  // Create a promise that resolves when the cooperation is complete
  const promise = new Promise<T>(async (resolve, reject) => {
    /**
     * A function to hand off the cooperation to the next cooperative function.
     * @returns A promise that resolves when the cooperation is handed off.
     */
    const handoff = () => {
      // The handoff function could be called from outside the cooperative function if the user has a reference to it so we need to check if the cooperation is in progress
      if (cooperationStatus === null) {
        throw new Error(
          "No cooperation in progress. You must call `handoff` within a cooperative function."
        );
      }

      // Save the cooperation status so we can restore it after the handoff
      const savedCooperationStatus = cooperationStatus;
      cooperationStatus = null;

      return new Promise<void>((resolve) => {
        // Schedule a task that will resume the cooperation in the next "macrotask"
        requestAnimationFrame(() => {
          queueMicrotask(() => {
            savedCooperationStatus.startedAt = Date.now();
            cooperationStatus = savedCooperationStatus;

            resolve();
            // Update the internal status of the cooperation
            status.numberOfCooperations++;
          });
        });
      });
    };

    if (signal !== undefined) {
      signalEventListenerAbortController = new AbortController();
      signal.addEventListener("abort", () => reject(new CancelError()), {
        once: true,
        signal: signalEventListenerAbortController.signal,
      });

      // Check if the signal has already been aborted and reject the promise if it has
      if (signal.aborted) {
        reject(new CancelError());
        return;
      }
    }

    // Start a new cooperation if one is not already in progress
    if (cooperationStatus === null) {
      cooperationStatus = {
        initiator: cooperationId,
        startedAt: Date.now(),
      };
    }

    // Update the internal status of the cooperation
    status.numberOfCooperations++;

    try {
      // Execute the cooperative callback
      resolve(await callback(handoff));
    } catch (error) {
      // Reject the promise if an error occurs
      reject(error);
    } finally {
      if (cooperationStatus === null) {
        throw new Error("No cooperation in progress. Please report this bug.");
      }

      // Stop the cooperation if the current caller is the one who started the cooperation
      if (cooperationStatus.initiator === cooperationId) {
        cooperationStatus = null;
      }

      // If we have an abort controller, abort it
      signalEventListenerAbortController?.abort();
    }
  }) as CooperationPromise<T>;

  // Attach the cooperative status to the promise
  Object.assign(promise, {
    _status: status,
  });

  return promise;
};

/**
 * Gets the current cooperation.
 * @throws An error if no cooperation is in progress.
 * @returns A tuple containing the cooperation ID and the time when the cooperation started.
 */
export const getCurrentCooperation = () => {
  if (cooperationStatus === null) {
    throw new Error("No cooperation in progress.");
  }

  return cooperationStatus;
};

/**
 * @internal - This type is not yet stable and might change.
 */
export interface CooperationPromise<T> extends Promise<T> {
  /**
   * @internal - The status of the cooperation.
   */
  _status: {
    /**
     * The number of times the cooperation has been started.
     */
    numberOfCooperations: number;
  };
}
