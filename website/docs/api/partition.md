# partition

## Functions

### partition()

> **partition**\<`T`\>(`arrayOrPromise`, `callbackfn`): `Promise`\<[`T`[], `T`[]]\>

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `arrayOrPromise` | `T`[] \| `Promise`\<`T`[]\> | The array or Promise of an array to iterate over. |
| `callbackfn` | (`value`, `index`, `array`) => `boolean` | A function that accepts up to three arguments. The partition method calls the callbackfn function one time for each element in the array. |

#### Returns

`Promise`\<[`T`[], `T`[]]\>

A Promise that resolves with an array containing two arrays: the first array contains the elements that satisfy the condition, and the second array contains the elements that do not satisfy the condition.

#### Example

```ts
const array = [1, 2, 3, 4];
const result = await partition(array, (value) => value > 2);
console.log(result); // Output: [[3, 4], [1, 2]]

#### Defined in

[src/partition/index.ts:16](https://github.com/therialguz/Unjam/blob/9e9381fe8605ec86756f855f0366216b2297b145/src/partition/index.ts#L16)
