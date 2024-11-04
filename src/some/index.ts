import { cooperate } from "../cooperate";
import { cooperativeFor } from "../for";

/**
 * Determines whether the specified callback function returns true for any element of an array.
 * @param array - The array to iterate over.
 * @param callbackfn - A function that accepts up to three arguments. The some method calls the callbackfn function one time for each element in the array until the callbackfn returns true, or until the end of the array.
 * @returns A Promise that resolves with a boolean value indicating whether at least one element in the array satisfies the specified test.
 *
 * @example
 * ```ts
 * const array = [1, 2, 3, 4];
 * const result = await some(array, (value) => value > 2);
 * console.log(result); // Output: true
 * ```
 */
export const some = async <T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => boolean
): Promise<boolean> => {
  return cooperate(async () => {
    let result = false;

    await cooperativeFor(array.length, (i) => {
      const value = array[i];
      if (callbackfn(value, i, array)) {
        result = true;

        // Stop the loop
        return true;
      }
    });

    return result;
  });
};
