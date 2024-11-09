import { config } from "../config";
import { cooperate, getCurrentCooperation } from "../cooperate";

export const cooperativeWhile = (
  condition: () => boolean,
  action: () => Promise<void | unknown> | void | unknown
) => {
  return cooperate(async (handoff) => {
    let startedAt = getCurrentCooperation().startedAt;

    while (condition()) {
      const result = action();
      if (result instanceof Promise) {
        await result;
      }

      const now = Date.now();
      if (now - startedAt >= config.maxTime && condition()) {
        await handoff();
        startedAt = getCurrentCooperation().startedAt;
      }
    }
  });
};
