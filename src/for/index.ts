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
    let startedAt = getCurrentCooperation().startedAt;

    while (current < end) {
      const shouldBreak = action(current);
      current += step;

      if (shouldBreak === true) {
        break;
      }

      if (current < end && Date.now() - startedAt >= maxTime) {
        await handoff();
        startedAt = getCurrentCooperation().startedAt;
      }
    }
  });
};
