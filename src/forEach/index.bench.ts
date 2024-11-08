import { bench } from "vitest";
import { forEach } from ".";

describe("forEach", () => {
  describe.each([1_000, 10_000, 100_000, 1_000_000])(`%i iterations`, (i) => {
    const array = Array.from({ length: i }, (_, i) => i);

    bench("forEach(array)", async () => {
      const result: number[] = [];
      await forEach(array, (item) => result.push(item));
    });

    bench("array.forEach", () => {
      const result: number[] = [];
      array.forEach((item) => result.push(item));
    });
  });
});
