export type Primitive =
  | bigint
  | boolean
  | null
  | number
  | string
  | symbol
  | undefined

export const MemoBrand: unique symbol = Symbol.for('safer-react/MemoBrand')

export type Memo<A> = A & { [MemoBrand]: A }

export type Omem<A extends { [MemoBrand]: unknown }> = A[typeof MemoBrand]

export type Memod<A> = A extends Primitive
  ? A
  : A & {
      [MemoBrand]: A
    }

export type Memos<A> = {
  [K in keyof A]: Memo<A[K]>
}

export type Omems<A extends Record<PropertyKey, { [MemoBrand]: unknown }>> = {
  [K in keyof A]: Omem<A[K]>
}
