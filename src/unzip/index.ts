import { reduce } from "../reduce";

/**
 * Unzips an array of tuples into two arrays.
 *
 * @template T - The type of the first element in the tuple.
 * @template U - The type of the second element in the tuple.
 *
 * @param arrayOrPromise - Array or Promise of an array to unzip
 * @returns A Promise that resolves with a new array of arrays.
 *
 * @example
 * ```ts
 * const array = [[1, 'a'], [2, 'b'], [3, 'c']];
 * const result = await unzip(array);
 * console.log(result); // Output: [[1, 2, 3], ['a', 'b', 'c']]
 * ```
 */
export const unzip = async <T, U>(
  arrayOrPromise: [T, U][] | Promise<[T, U][]>
): Promise<[T[], U[]]> => {
  return reduce(
    arrayOrPromise,
    ([a, b], [item1, item2]) => {
      a.push(item1);
      b.push(item2);
      return [a, b] as [T[], U[]];
    },
    [[] as T[], [] as U[]] as [T[], U[]]
  );
};
