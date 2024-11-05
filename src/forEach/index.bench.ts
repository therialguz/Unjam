import { bench } from "vitest";
import { forEach } from ".";

describe("forEach", () => {
  const array = Array.from({ length: 100 }, (_, i) => i);

  bench("array as array", async () => {
    const result: number[] = [];
    await forEach(array, (item) => result.push(item));
  });

  bench("array as promise", async () => {
    const promise = Promise.resolve(array);
    const result: number[] = [];
    await forEach(promise, (item) => result.push(item));
  });
});
