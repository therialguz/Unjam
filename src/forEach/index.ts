import { cooperativeFor } from "../for";

/**
 * Calls a defined callback function on each element of an array.
 *
 * @remarks
 * Calls a defined callback function on each element of an array. The forEach method calls the callbackfn function one time for each element in the array.
 *
 * @template T - The type of the elements in the array.
 *
 * @param arrayOrPromise - The array or Promise of an array to iterate over.
 * @param callbackfn - A function that accepts up to three arguments. The forEach method calls the callbackfn function one time for each element in the array.
 *
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
  arrayOrPromise: T[] | Promise<T[]>,
  callbackfn: (value: T, index: number, array: T[]) => void
): Promise<void> => {
  const array =
    arrayOrPromise instanceof Promise ? await arrayOrPromise : arrayOrPromise;

  return cooperativeFor(array.length, (index) => {
    callbackfn(array[index], index, array);
  });
};
