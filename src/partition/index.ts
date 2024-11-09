import { cooperate } from "../cooperate";
import { forEach } from "../forEach";

/**
 *
 * @param arrayOrPromise - The array or Promise of an array to iterate over.
 * @param callbackfn - A function that accepts up to three arguments. The partition method calls the callbackfn function one time for each element in the array.
 * @returns A Promise that resolves with an array containing two arrays: the first array contains the elements that satisfy the condition, and the second array contains the elements that do not satisfy the condition.
 *
 * @example
 * ```ts
 * const array = [1, 2, 3, 4];
 * const result = await partition(array, (value) => value > 2);
 * console.log(result); // Output: [[3, 4], [1, 2]]
 */
export const partition = async <T>(
  arrayOrPromise: T[] | Promise<T[]>,
  callbackfn: (
    value: T,
    index: number,
    array: T[]
  ) => Promise<boolean> | boolean
): Promise<[T[], T[]]> => {
  const array =
    arrayOrPromise instanceof Promise ? await arrayOrPromise : arrayOrPromise;

  return cooperate(async () => {
    const result: [T[], T[]] = [[], []];
    await forEach(array, async (value, index, array) => {
      const returnValue = callbackfn(value, index, array);
      const partitionValue =
        returnValue instanceof Promise ? await returnValue : returnValue;
      if (partitionValue) {
        result[0].push(value);
      } else {
        result[1].push(value);
      }
    });
    return result;
  });
};
