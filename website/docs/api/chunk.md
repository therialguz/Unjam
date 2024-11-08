# chunk

## Functions

### chunk()

> **chunk**\<`T`\>(`arrayOrPromise`, `size`): `Promise`\<[`T`[]]\>

Creates an array of arrays, where each array is a chunk of the provided array. The last chunk may contain less than the specified size.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the elements in the array. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `arrayOrPromise` | `T`[] \| `Promise`\<`T`[]\> | Array or Promise of an array to chunk |
| `size` | `number` | The length of each chunk |

#### Returns

`Promise`\<[`T`[]]\>

A Promise that resolves with a new array of arrays.

#### Example

```ts
const array = [1, 2, 3, 4, 5];
const result = await chunk(array, 2);
console.log(result); // Output: [[1, 2], [3, 4], [5]]
```

#### Defined in

[src/chunk/index.ts:19](https://github.com/therialguz/Unjam/blob/d4a4b9bac1809c1eac22f36c6da11daa773b8abc/src/chunk/index.ts#L19)
