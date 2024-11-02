import { executeCooperative } from "../executeCooperative";

export const find = async <T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => boolean
): Promise<T | undefined> => {
  return new Promise((resolve) => {
    let result: T | undefined;
    executeCooperative(
      array,
      0,
      (value, index, array) => {
        if (callbackfn(value, index, array)) {
          result = value;
          resolve(result);
        }
      },
      () => resolve(undefined)
    );
  });
};
