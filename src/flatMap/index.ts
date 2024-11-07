import { cooperate } from "../cooperate";
import { forEach } from "../forEach";

/**
 * Calls a defined callback function on each element of an array, and then flattens the result into a new array.
 * @param arrayOrPromise - The array or Promise of an array to iterate over.
 * @param callbackfn - A function that accepts up to three arguments. The flatMap method calls the callbackfn function one time for each element in the array.
 * @returns A Promise that resolves with a new array with the results of calling a provided function on every element in the calling array and flattening the result into a new array.
 *
 * @example
 * ```ts
 * const array = [1, 2, 3, 4];
 * const result = await flatMap(array, (value) => [value, value * 2]);
 * console.log(result); // Output: [1, 2, 2, 4, 3, 6, 4, 8]
 * ```
 */
export const flatMap = async <T, U>(
  arrayOrPromise: T[] | Promise<T[]>,
  callbackfn: (value: T, index: number, array: T[]) => U[]
): Promise<U[]> => {
  const array =
    arrayOrPromise instanceof Promise ? await arrayOrPromise : arrayOrPromise;

  return cooperate(async () => {
    const result: U[] = [];
    await forEach(array, (value, index, array) => {
      result.push(...callbackfn(value, index, array));
    });
    return result;
  });
};
