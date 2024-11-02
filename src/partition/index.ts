import { executeCooperative } from "../executeCooperative";

export const partition = async <T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => boolean
): Promise<[T[], T[]]> => {
  return new Promise((resolve) => {
    const result: [T[], T[]] = [[], []];
    executeCooperative(
      array,
      0,
      (value, index, array) => {
        if (callbackfn(value, index, array)) {
          result[0].push(value);
        } else {
          result[1].push(value);
        }
      },
      () => resolve(result)
    );
  });
};
