# some

## Functions

### some()

> **some**\<`T`\>(`arrayOrPromise`, `callbackfn`): `Promise`\<`boolean`\>

Determines whether the specified callback function returns true for any element of an array.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `arrayOrPromise` | `T`[] \| `Promise`\<`T`[]\> | The array or Promise of an array to iterate over. |
| `callbackfn` | (`value`, `index`, `array`) => `boolean` | A function that accepts up to three arguments. The some method calls the callbackfn function one time for each element in the array until the callbackfn returns true, or until the end of the array. |

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves with a boolean value indicating whether at least one element in the array satisfies the specified test.

#### Example

```ts
const array = [1, 2, 3, 4];
const result = await some(array, (value) => value > 2);
console.log(result); // Output: true
```

#### Defined in

[src/some/index.ts:17](https://github.com/therialguz/Unjam/blob/9e9381fe8605ec86756f855f0366216b2297b145/src/some/index.ts#L17)
