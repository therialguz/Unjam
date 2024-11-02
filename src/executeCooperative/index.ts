import { config } from "../config";

let currentCooperation: [starter: Symbol, started: number] | null = null;

export const executeCooperative = <T>(
  array: T[],
  from: number,
  callbackfn: (value: T, index: number, array: T[]) => void,
  resolve: () => void
) => {
  let cooperativeId = startCooperation();

  try {
    for (let i = from; i < array.length; i++) {
      callbackfn(array[i], i, array);

      const now = Date.now();
      if (
        now - currentCooperation![1] >= config.maxTime &&
        i < array.length - 1
      ) {
        console.log("Execution iterated:", i - from);
        setTimeout(() => executeCooperative(array, i + 1, callbackfn, resolve));
        return;
      }
    }

    resolve();
  } finally {
    stopCooperation(cooperativeId);
  }
};

const startCooperation = (): Symbol | null => {
  if (currentCooperation !== null) {
    return null;
  }

  let symbol = Symbol();
  const start = Date.now();

  currentCooperation = [symbol, start];

  return symbol;
};

/**
 *
 * @param symbol -
 * @returns
 */
const stopCooperation = (symbol: Symbol | null) => {
  if (currentCooperation === null) {
    // No cooperation in progress
    throw new Error("No cooperation in progress.");
  }

  if (currentCooperation[0] !== symbol) {
    // The current caller is not the one who started the cooperation
    return;
  }

  currentCooperation = null;
};
