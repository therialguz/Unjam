import { executeCooperative } from "../executeCooperative";

/**
 * Returns the first element in an array that satisfies the provided testing function.
 * @param array - The array to iterate over.
 * @param callbackfn - A function that accepts up to three arguments. The find method calls the callbackfn function one time for each element in the array.
 * @returns A Promise that resolves with the first element in the array that satisfies the provided testing function. Otherwise, undefined is returned.
 *
 * @example
 * ```ts
 * const array = [5, 12, 8, 130, 44];
 * const result = await find(array, (value) => value > 10);
 * console.log(result); // Output: 12
 * ```
 */
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
