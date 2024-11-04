import { cooperate } from "../cooperate";
import { cooperativeFor } from "../for";

/**
 * Determines whether all the members of an array satisfy the specified test.
 * @param array - The array to iterate over.
 * @param callbackfn - A function that accepts up to three arguments. The every method calls the callbackfn function for each element in the array until the callbackfn returns false, or until the end of the array.
 * @returns A Promise that resolves with a boolean value indicating whether all the members of the array satisfy the specified test.
 *
 * @example
 * ```ts
 * const array = [1, 30, 39, 29, 10, 13];
 * const result = await every(array, (value) => value < 40);
 * console.log(result); // Output: true
 * ```
 */
export const every = <T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => boolean
): Promise<boolean> => {
  return cooperate(async () => {
    let result = true;
    await cooperativeFor(0, array.length, async (i) => {
      if (callbackfn(array[i], i, array) === false) {
        result = false;

        // Break the loop
        return true;
      }
    });

    return result;
  });
};
