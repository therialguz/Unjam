import { cooperativeFor } from "../for";

/**
 * Creates an array of arrays, where each array is a chunk of the provided array. The last chunk may contain less than the specified size.
 *
 * @template T - The type of the elements in the array.
 *
 * @param arrayOrPromise - Array or Promise of an array to chunk
 * @param size - The length of each chunk
 * @returns A Promise that resolves with a new array of arrays.
 *
 * @example
 * ```ts
 * const array = [1, 2, 3, 4, 5];
 * const result = await chunk(array, 2);
 * console.log(result); // Output: [[1, 2], [3, 4], [5]]
 * ```
 */
export const chunk = async <T>(
  arrayOrPromise: T[] | Promise<T[]>,
  size: number
): Promise<[T[]]> => {
  const array =
    arrayOrPromise instanceof Promise ? await arrayOrPromise : arrayOrPromise;

  const result: T[][] = [];
  await cooperativeFor(0, array.length, size, (i) => {
    result.push(array.slice(i, i + size));
  });

  return result as [T[]];
};
