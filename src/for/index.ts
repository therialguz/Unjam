import { config } from "../config";
import { cooperate, getCurrentCooperation } from "../cooperate";

type CooperativeForType = {
  (end: number, action: (i: number) => void): Promise<void>;
  (start: number, end: number, action: (i: number) => void): Promise<void>;
  (
    start: number,
    end: number,
    step: number,
    action: (i: number) => void
  ): Promise<void>;
};

export const cooperativeFor: CooperativeForType = (
  startOrEnd: number,
  endOrAction: number | ((i: number) => boolean | unknown),
  stepOrAction?: number | ((i: number) => boolean | unknown),
  actionCallback?: (i: number) => boolean | unknown
) => {
  // Determine which overload was used and assign parameters accordingly
  let start = 0;
  let end: number;
  let step = 1;
  let action: (i: number) => boolean | unknown;

  if (typeof endOrAction === "function") {
    // Case: cooperativeFor(end, action)
    end = startOrEnd;
    action = endOrAction;
  } else if (typeof stepOrAction === "function") {
    // Case: cooperativeFor(start, end, action)
    start = startOrEnd;
    end = endOrAction;
    action = stepOrAction;
  } else if (actionCallback) {
    // Case: cooperativeFor(start, end, step, action)
    start = startOrEnd;
    end = endOrAction;
    step = stepOrAction as number;
    action = actionCallback;
  } else {
    throw new Error(
      "Invalid arguments: Expected (end, action), (start, end, action), or (start, end, step, action)."
    );
  }

  // Implementation of the cooperative `for` loop logic
  let current = start;

  const maxTime = config.maxTime;
  return cooperate<void>(async (handoff) => {
    const currentCooperation = getCurrentCooperation();
    let endTime = currentCooperation.startedAt + maxTime;

    let maxBatchSize = 1;
    let batchSize = 1; // Start with 1 iteration per batch

    while (current < end) {
      const batchStart = performance.now();
      // Run a batch of iterations without calling Date.now()
      for (let i = 0; i < batchSize && current < end; i++) {
        const shouldBreak = action(current);
        current += step;

        if (shouldBreak === true || current >= end) {
          return; // Exit early if the action indicates to stop
        }
      }

      // Check the time only after completing the batch
      const batchEnd = performance.now();
      const batchDuration = batchEnd - batchStart;
      const averageBatchTime = Math.max(batchDuration / batchSize, 0.00001);
      // Dynamically set batch size to run more iterations if each batch is short
      maxBatchSize = Math.max(1, Math.floor(maxTime / averageBatchTime));

      // Calculate the time left in the current cooperation
      let timeLeft = endTime - Date.now();

      // Check if maxTime has been exceeded
      if (timeLeft <= 0) {
        // Yield control after each batch
        await handoff();

        // Update the end time to the time the currentCooperation started plus the max time
        endTime = currentCooperation.startedAt + maxTime;

        // We need to recalculate the time left because we could be inside a nested cooperation so we could have less time left
        timeLeft = Math.max(endTime - Date.now(), 0);
      }

      // Calculate the number of iterations that can be run in the remaining time
      batchSize = Math.min(
        maxBatchSize,
        Math.max(Math.floor(timeLeft / averageBatchTime), 1)
      );
    }
  });
};
