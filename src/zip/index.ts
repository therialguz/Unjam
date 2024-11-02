import { executeCooperative } from "../executeCooperative";

/**
 * Creates an array of arrays, where the first element of the provided arrays are grouped together, and the second element of the provided arrays are grouped together.
 * @param array1 - The first array to iterate over.
 * @param array2 - The second array to iterate over.
 * @returns A Promise that resolves with a new array of arrays.
 *
 * @example
 * ```ts
 * const array1 = [1, 2, 3];
 * const array2 = ["a", "b", "c"];
 * const result = await zip(array1, array2);
 * console.log(result); // Output: [[1, "a"], [2, "b"], [3, "c"]]
 */
export const zip = async <T, U>(
  array1: T[],
  array2: U[]
): Promise<[T, U][]> => {
  return new Promise((resolve) => {
    const result: [T, U][] = [];
    executeCooperative(
      array1,
      0,
      (value, index) => {
        result.push([value, array2[index]]);
      },
      () => resolve(result)
    );
  });
};
