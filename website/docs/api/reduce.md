# reduce

## Functions

### reduce()

> **reduce**\<`T`, `U`\>(`arrayOrPromise`, `callbackfn`, `initialValue`): `Promise`\<`U`\>

Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `U` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `arrayOrPromise` | `T`[] \| `Promise`\<`T`[]\> | The array or Promise of an array to iterate over. |
| `callbackfn` | (`previousValue`, `currentValue`, `currentIndex`, `array`) => `U` | A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array. |
| `initialValue` | `U` | The initial value of the accumulator. |

#### Returns

`Promise`\<`U`\>

A Promise that resolves with the value that results from the reduction.

#### Example

```ts
const array = [1, 2, 3, 4];
const result = await reduce(array, (previousValue, currentValue) => previousValue + currentValue, 0);
console.log(result); // Output: 10
```

#### Defined in

[src/reduce/index.ts:18](https://github.com/therialguz/Unjam/blob/9e9381fe8605ec86756f855f0366216b2297b145/src/reduce/index.ts#L18)
