import { executeCooperative } from "../executeCooperative";

export const groupBy = async <T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U
): Promise<Map<U, T[]>> => {
  return new Promise((resolve) => {
    const result = new Map<U, T[]>();
    executeCooperative(
      array,
      0,
      (value, index, array) => {
        const key = callbackfn(value, index, array);
        const group = result.get(key);
        if (group) {
          group.push(value);
        } else {
          result.set(key, [value]);
        }
      },
      () => resolve(result)
    );
  });
};
