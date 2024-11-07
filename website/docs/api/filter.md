# filter

## Functions

### filter()

> **filter**\<`T`\>(`arrayOrPromise`, `callbackfn`): `Promise`\<`T`[]\>

Creates a new array with all elements that pass the test implemented by the provided function.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `arrayOrPromise` | `T`[] \| `Promise`\<`T`[]\> | The array or Promise of an array to iterate over. |
| `callbackfn` | (`value`, `index`, `array`) => `boolean` | A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array. |

#### Returns

`Promise`\<`T`[]\>

A Promise that resolves with a new array with the elements that pass the test.

#### Example

```ts
const array = [1, 30, 39, 29, 10, 13];
const result = await filter(array, (value) => value < 30);
console.log(result); // Output: [1, 29, 10, 13]
```

#### Defined in

[src/filter/index.ts:17](https://github.com/therialguz/Unjam/blob/9e9381fe8605ec86756f855f0366216b2297b145/src/filter/index.ts#L17)
