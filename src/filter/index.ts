import { executeCooperative } from "../executeCooperative";

export const filter = async <T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => boolean
): Promise<T[]> => {
  return new Promise((resolve) => {
    const result: T[] = [];
    executeCooperative(
      array,
      0,
      (value, index, array) => {
        if (callbackfn(value, index, array)) {
          result.push(value);
        }
      },
      () => resolve(result)
    );
  });
};
