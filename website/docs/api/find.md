# find

## Functions

### find()

> **find**\<`T`\>(`arrayOrPromise`, `callbackfn`): `Promise`\<`undefined` \| `T`\>

Returns the first element in an array that satisfies the provided testing function.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `arrayOrPromise` | `T`[] \| `Promise`\<`T`[]\> | The array or Promise of an array to iterate over. |
| `callbackfn` | (`value`, `index`, `array`) => `boolean` | A function that accepts up to three arguments. The find method calls the callbackfn function one time for each element in the array. |

#### Returns

`Promise`\<`undefined` \| `T`\>

A Promise that resolves with the first element in the array that satisfies the provided testing function. Otherwise, undefined is returned.

#### Example

```ts
const array = [5, 12, 8, 130, 44];
const result = await find(array, (value) => value > 10);
console.log(result); // Output: 12
```

#### Defined in

[src/find/index.ts:17](https://github.com/therialguz/Unjam/blob/d4a4b9bac1809c1eac22f36c6da11daa773b8abc/src/find/index.ts#L17)
