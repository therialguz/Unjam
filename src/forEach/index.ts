import { executeCooperative } from "../executeCooperative";

export const forEach = async <T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => void
): Promise<void> => {
  return new Promise((resolve) => {
    executeCooperative(array, 0, callbackfn, resolve);
  });
};
