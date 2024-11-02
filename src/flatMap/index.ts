import { executeCooperative } from "../executeCooperative";

export const flatMap = async <T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U[]
): Promise<U[]> => {
  return new Promise((resolve) => {
    const result: U[] = [];
    executeCooperative(
      array,
      0,
      (value, index, array) => {
        result.push(...callbackfn(value, index, array));
      },
      () => resolve(result)
    );
  });
};
