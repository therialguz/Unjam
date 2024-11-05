import { cooperate } from "../cooperate";
import { forEach } from "../forEach";

/**
 * Groups the elements of an array based on the result of the callbackfn function.
 * @param array - The array to iterate over.
 * @param callbackfn - A function that accepts up to three arguments. The groupBy method calls the callbackfn function one time for each element in the array.
 * @returns A Promise that resolves with a Map containing the elements grouped by the key returned by the callbackfn function.
 */
export const groupBy = async <T, U>(
  arrayOrPromise: T[] | Promise<T[]>,
  callbackfn: (value: T, index: number, array: T[]) => U
): Promise<Map<U, T[]>> => {
  const array =
    arrayOrPromise instanceof Promise ? await arrayOrPromise : arrayOrPromise;

  return cooperate(async () => {
    const result = new Map<U, T[]>();
    await forEach(array, (value, index, array) => {
      const key = callbackfn(value, index, array);
      const group = result.get(key);
      if (group) {
        group.push(value);
      } else {
        result.set(key, [value]);
      }
    });
    return result;
  });
};
