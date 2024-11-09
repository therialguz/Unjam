import { cooperate } from "../cooperate";
import { forEach } from "../forEach";

/**
 * Maps each element of an array to a new value and filters out null and undefined values.
 *
 * @template T - The type of the elements in the array.
 * @template U - The type of the mapped values.
 *
 * @param arrayOrPromise - An array or a promise that resolves to an array.
 * @param callbackfn - A function that maps each element of the array to a new value. If the function returns null or undefined, the value is filtered out.
 * @returns A promise that resolves to an array of mapped values.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * const result = await compactMap(array, (value) =>
 *  value % 2 === 0 ? value * 2 : null
 * );
 * console.log(result); // [4, 8]
 */
export const compactMap = async <T, U>(
  arrayOrPromise: T[] | Promise<T[]>,
  callbackfn: (
    value: T,
    index: number,
    array: T[]
  ) => Promise<U | null | undefined> | U | null | undefined
): Promise<U[]> => {
  const array =
    arrayOrPromise instanceof Promise ? await arrayOrPromise : arrayOrPromise;

  return cooperate(async () => {
    const result: U[] = [];

    await forEach(array, async (value, index, array) => {
      const returnValue = callbackfn(value, index, array);
      const mappedValue =
        returnValue instanceof Promise ? await returnValue : returnValue;
      if (mappedValue != null) {
        result.push(mappedValue);
      }
    });

    return result;
  });
};
