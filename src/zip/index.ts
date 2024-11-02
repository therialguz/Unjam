import { executeCooperative } from "../executeCooperative";

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
