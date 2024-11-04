import { config } from "../config";
import { cooperate, getCurrentCooperation } from "../cooperate";

export type CooperativeWhileType = {
  (condition: () => boolean, action: () => void): void;
};

export const cooperativeWhile = (
  condition: () => boolean,
  action: () => void
) => {
  return cooperate(async (handoff) => {
    let startedAt = getCurrentCooperation()[1];

    while (condition()) {
      action();

      const now = Date.now();
      if (now - startedAt >= config.maxTime && condition()) {
        await handoff();
        startedAt = getCurrentCooperation()[1];
      }
    }
  });
};
