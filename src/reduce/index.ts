import { executeCooperative } from "../executeCooperative";

/**
 * Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
 * @param array - The array to iterate over.
 * @param callbackfn - A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
 * @param initialValue - The initial value of the accumulator.
 * @returns A Promise that resolves with the value that results from the reduction.
 *
 * @example
 * ```ts
 * const array = [1, 2, 3, 4];
 * const result = await reduce(array, (previousValue, currentValue) => previousValue + currentValue, 0);
 * console.log(result); // Output: 10
 * ```
 */
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
