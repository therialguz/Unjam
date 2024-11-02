import { executeCooperative } from "../executeCooperative";

/**
 * Calls a defined callback function on each element of an array.
 * @param array - The array to iterate over.
 * @param callbackfn - A function that accepts up to three arguments. The forEach method calls the callbackfn function one time for each element in the array.
 * @returns A Promise that resolves when the loop is finished.
 *
 * @example
 * ```ts
 * const array = [1, 2, 3, 4];
 * await forEach(array, (value) => console.log(value));
 * // Output:
 * // 1
 * // 2
 * // 3
 * // 4
 * ```
 */
export const forEach = async <T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => void
): Promise<void> => {
  return new Promise((resolve) => {
    executeCooperative(array, 0, callbackfn, resolve);
  });
};
