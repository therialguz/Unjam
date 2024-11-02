import { executeCooperative } from "../executeCooperative";

export const some = async <T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => boolean
): Promise<boolean> => {
  return new Promise((resolve) => {
    let result = false;
    executeCooperative(
      array,
      0,
      (value, index, array) => {
        if (callbackfn(value, index, array)) {
          result = true;
          resolve(result);
        }
      },
      () => resolve(result)
    );
  });
};
