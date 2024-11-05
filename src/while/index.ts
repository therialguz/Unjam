import { config } from "../config";
import { cooperate, getCurrentCooperation } from "../cooperate";

export type CooperativeWhileType = {
  (condition: () => boolean, action: () => void): void;
};

export const cooperativeWhile = (
  condition: () => boolean,
  action: () => void | Promise<void> | unknown
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
