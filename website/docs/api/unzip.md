# unzip

## Functions

### unzip()

> **unzip**\<`T`, `U`\>(`arrayOrPromise`): `Promise`\<[`T`[], `U`[]]\>

Unzips an array of tuples into two arrays.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the first element in the tuple. |
| `U` | The type of the second element in the tuple. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `arrayOrPromise` | [`T`, `U`][] \| `Promise`\<[`T`, `U`][]\> | Array or Promise of an array to unzip |

#### Returns

`Promise`\<[`T`[], `U`[]]\>

A Promise that resolves with a new array of arrays.

#### Example

```ts
const array = [[1, 'a'], [2, 'b'], [3, 'c']];
const result = await unzip(array);
console.log(result); // Output: [[1, 2, 3], ['a', 'b', 'c']]
```

#### Defined in

[src/unzip/index.ts:19](https://github.com/therialguz/Unjam/blob/d4a4b9bac1809c1eac22f36c6da11daa773b8abc/src/unzip/index.ts#L19)
