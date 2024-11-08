# every

## Functions

### every()

> **every**\<`T`\>(`arrayOrPromise`, `callbackfn`): `Promise`\<`boolean`\>

Determines whether all the members of an array satisfy the specified test.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `arrayOrPromise` | `T`[] \| `Promise`\<`T`[]\> | The array or Promise of an array to iterate over. |
| `callbackfn` | (`value`, `index`, `array`) => `boolean` | A function that accepts up to three arguments. The every method calls the callbackfn function for each element in the array until the callbackfn returns false, or until the end of the array. |

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves with a boolean value indicating whether all the members of the array satisfy the specified test.

#### Example

```ts
const array = [1, 30, 39, 29, 10, 13];
const result = await every(array, (value) => value < 40);
console.log(result); // Output: true
```

#### Defined in

[src/every/index.ts:17](https://github.com/therialguz/Unjam/blob/d4a4b9bac1809c1eac22f36c6da11daa773b8abc/src/every/index.ts#L17)
