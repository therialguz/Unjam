import { cooperate } from "../cooperate";
import { cooperativeFor } from "../for";

/**
 * Creates an array of arrays, where the first element of the provided arrays are grouped together, and the second element of the provided arrays are grouped together.
 * @param arrayOrPromise1 - The first array or Promise of an array to iterate over.
 * @param arrayOrPromise2 - The first array or Promise of an array to iterate over.
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
  arrayOrPromise1: T[] | Promise<T[]>,
  arrayOrPromise2: U[] | Promise<U[]>
): Promise<[T, U][]> => {
  let array1: T[];
  let array2: U[];
  if (
    arrayOrPromise1 instanceof Promise ||
    arrayOrPromise2 instanceof Promise
  ) {
    const [result1, result2] = await Promise.all([
      arrayOrPromise1,
      arrayOrPromise2,
    ]);
    array1 = result1;
    array2 = result2;
  } else {
    array1 = arrayOrPromise1;
    array2 = arrayOrPromise2;
  }

  return cooperate(async () => {
    const result: [T, U][] = [];
    const minLenght = Math.min(array1.length, array2.length);

    await cooperativeFor(minLenght, async (index) => {
      result.push([array1[index], array2[index]]);
    });

    return result;
  });
};
