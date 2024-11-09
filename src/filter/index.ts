import { cooperate } from "../cooperate";
import { forEach } from "../forEach";

/**
 * Creates a new array with all elements that pass the test implemented by the provided function.
 * @param arrayOrPromise - The array or Promise of an array to iterate over.
 * @param callbackfn - A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
 * @returns A Promise that resolves with a new array with the elements that pass the test.
 *
 * @example
 * ```ts
 * const array = [1, 30, 39, 29, 10, 13];
 * const result = await filter(array, (value) => value < 30);
 * console.log(result); // Output: [1, 29, 10, 13]
 * ```
 */
export const filter = async <T>(
  arrayOrPromise: T[] | Promise<T[]>,
  callbackfn: (
    value: T,
    index: number,
    array: T[]
  ) => Promise<boolean> | boolean
): Promise<T[]> => {
  const array =
    arrayOrPromise instanceof Promise ? await arrayOrPromise : arrayOrPromise;

  return cooperate(async () => {
    const result: T[] = [];
    await forEach(array, (value, index, array) => {
      if (callbackfn(value, index, array)) {
        result.push(value);
      }
    });
    return result;
  });
};
