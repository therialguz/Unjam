# cooperate

## Functions

### cooperate()

> **cooperate**\<`T`\>(`callback`, `signal`?): `CooperationPromise`\<`T`\>

Executes a function cooperatively, allowing it to hand off control to the next cooperative function.

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `void` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`handoff`) => `Promise`\<`T`\> | The callback function to execute cooperatively. |
| `signal`? | `AbortSignal` | - |

#### Returns

`CooperationPromise`\<`T`\>

A promise that resolves when the cooperation is complete.

#### Defined in

[src/cooperate/index.ts:18](https://github.com/therialguz/Unjam/blob/9e9381fe8605ec86756f855f0366216b2297b145/src/cooperate/index.ts#L18)

***

### getCurrentCooperation()

> **getCurrentCooperation**(): `object`

Gets the current cooperation ID and the time when the cooperation started.

#### Returns

`object`

A tuple containing the cooperation ID and the time when the cooperation started.

##### initiator

> **initiator**: `Symbol`

##### startedAt

> **startedAt**: `number`

#### Throws

An error if no cooperation is in progress.

#### Defined in

[src/cooperate/index.ts:117](https://github.com/therialguz/Unjam/blob/9e9381fe8605ec86756f855f0366216b2297b145/src/cooperate/index.ts#L117)
