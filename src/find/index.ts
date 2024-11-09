import { cooperate } from "../cooperate";
import { cooperativeFor } from "../for";

/**
 * Returns the first element in an array that satisfies the provided testing function.
 * @param arrayOrPromise - The array or Promise of an array to iterate over.
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
  arrayOrPromise: T[] | Promise<T[]>,
  callbackfn: (
    value: T,
    index: number,
    array: T[]
  ) => Promise<boolean> | boolean
): Promise<T | undefined> => {
  const array =
    arrayOrPromise instanceof Promise ? await arrayOrPromise : arrayOrPromise;

  return cooperate(async () => {
    let result: T | undefined;
    await cooperativeFor(array.length, async (i) => {
      const value = array[i];
      const returnValue = callbackfn(value, i, array);
      const shouldBreak =
        returnValue instanceof Promise ? await returnValue : returnValue;
      if (shouldBreak) {
        result = value;

        // Stop the loop
        return true;
      }
    });
    return result;
  });
};
