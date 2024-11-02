import { executeCooperative } from "../executeCooperative";

export const reduce = async <T, U>(
  array: T[],
  callbackfn: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => U,
  initialValue: U
): Promise<U> => {
  return new Promise((resolve) => {
    let accumulator = initialValue;
    executeCooperative(
      array,
      0,
      (value, index, array) => {
        accumulator = callbackfn(accumulator, value, index, array);
      },
      () => resolve(accumulator)
    );
  });
};
