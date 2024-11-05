import { cooperate } from "../cooperate";
import { forEach } from "../forEach";

/**
 * Calls a defined callback function on each element of an array and returns a new array with the results.
 * @param array - The array to iterate over.
 * @param callbackfn - A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
 * @returns A Promise that resolves with a new array containing the results of calling the callbackfn function on each element in the array.
 */
export const map = async <T, U>(
  arrayOrPromise: T[] | Promise<T[]>,
  callbackfn: (value: T, index: number, array: T[]) => U
): Promise<U[]> => {
  const array =
    arrayOrPromise instanceof Promise ? await arrayOrPromise : arrayOrPromise;

  const result: U[] = [];
  return cooperate(async () => {
    await forEach(array, (value, index, array) => {
      result.push(callbackfn(value, index, array));
    });
    return result;
  });
};
