# zip

## Functions

### zip()

> **zip**\<`T`, `U`\>(`arrayOrPromise1`, `arrayOrPromise2`): `Promise`\<[`T`, `U`][]\>

Creates an array of arrays, where the first element of the provided arrays are grouped together, and the second element of the provided arrays are grouped together.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `U` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `arrayOrPromise1` | `T`[] \| `Promise`\<`T`[]\> | The first array or Promise of an array to iterate over. |
| `arrayOrPromise2` | `U`[] \| `Promise`\<`U`[]\> | The first array or Promise of an array to iterate over. |

#### Returns

`Promise`\<[`T`, `U`][]\>

A Promise that resolves with a new array of arrays.

#### Example

```ts
const array1 = [1, 2, 3];
const array2 = ["a", "b", "c"];
const result = await zip(array1, array2);
console.log(result); // Output: [[1, "a"], [2, "b"], [3, "c"]]
```

#### Defined in

[src/zip/index.ts:18](https://github.com/therialguz/Unjam/blob/9e9381fe8605ec86756f855f0366216b2297b145/src/zip/index.ts#L18)
