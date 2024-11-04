import { cooperate } from "../cooperate";
import { cooperativeFor } from "../for";

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
export const find = <T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => boolean
): Promise<T | undefined> => {
  return cooperate(async () => {
    let result: T | undefined;
    await cooperativeFor(array.length, (i) => {
      const value = array[i];
      if (callbackfn(value, i, array)) {
        result = value;

        // Stop the loop
        return true;
      }
    });
    return result;
  });
};
