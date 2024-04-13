type Primitive = bigint | boolean | null | number | string | symbol | undefined

export const MemoBrand: unique symbol = Symbol.for('@lexicaldream/react/Memo')

export type Memo<A> = A & { [MemoBrand]: A }

export type UnMemo<A extends { [MemoBrand]: unknown }> = A[typeof MemoBrand]

export type Memod<A = unknown> = A extends Primitive
  ? A
  : A & { [MemoBrand]: A }

export type Memos<A> = {
  [K in keyof A]: Memo<A[K]>
}

export type UnMemos<A extends Record<PropertyKey, { [MemoBrand]: unknown }>> = {
  [K in keyof A]: UnMemo<A[K]>
}

export const mem = <A>(a: A): Memo<A> => a as Memo<A>
