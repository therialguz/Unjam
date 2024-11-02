import { executeCooperative } from "../executeCooperative";

export const every = async <T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => boolean
): Promise<boolean> => {
  return new Promise((resolve) => {
    executeCooperative(
      array,
      0,
      (value, index, array) => {
        if (!callbackfn(value, index, array)) {
          resolve(false);
        }
      },
      () => resolve(true)
    );
  });
};
