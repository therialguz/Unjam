# flatMap

## Functions

### flatMap()

> **flatMap**\<`T`, `U`\>(`arrayOrPromise`, `callbackfn`): `Promise`\<`U`[]\>

Calls a defined callback function on each element of an array, and then flattens the result into a new array.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `U` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `arrayOrPromise` | `T`[] \| `Promise`\<`T`[]\> | The array or Promise of an array to iterate over. |
| `callbackfn` | (`value`, `index`, `array`) => `U`[] | A function that accepts up to three arguments. The flatMap method calls the callbackfn function one time for each element in the array. |

#### Returns

`Promise`\<`U`[]\>

A Promise that resolves with a new array with the results of calling a provided function on every element in the calling array and flattening the result into a new array.

#### Example

```ts
const array = [1, 2, 3, 4];
const result = await flatMap(array, (value) => [value, value * 2]);
console.log(result); // Output: [1, 2, 2, 4, 3, 6, 4, 8]
```

#### Defined in

[src/flatMap/index.ts:17](https://github.com/therialguz/Unjam/blob/d4a4b9bac1809c1eac22f36c6da11daa773b8abc/src/flatMap/index.ts#L17)
