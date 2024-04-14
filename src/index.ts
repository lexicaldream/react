import * as R from 'react'

type Primitive = bigint | boolean | null | number | string | symbol | undefined

type DependencyList = Array<Primitive | { [MemoBrand]: unknown }>

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

export const useMemo_: <A>(
  f: () => A,
  dependencies: DependencyList
) => Memo<A> = R.useMemo as never

// eslint-disable-next-line @typescript-eslint/ban-types
export const useCallback_: <A extends Function>(
  callback: A,
  deps: DependencyList
) => Memo<A> = R.useCallback as never

export const useEffect_: (f: R.EffectCallback, deps?: DependencyList) => void =
  R.useEffect as never

export const useLayoutEffect_: (
  f: R.EffectCallback,
  deps?: DependencyList
) => void = R.useLayoutEffect as never

export const useImperativeHandle_: <T, R extends T>(
  ref: R.Ref<T> | undefined,
  init: () => R,
  deps?: DependencyList
) => void = R.useImperativeHandle

export const useInsertionEffect_: (
  effect: R.EffectCallback,
  deps?: DependencyList
) => void = R.useInsertionEffect as never

export const useState_: {
  <S>(
    initialState: S | (() => S)
  ): [Memo<S>, Memo<R.Dispatch<R.SetStateAction<S>>>]
  <S = undefined>(): [
    Memo<S | undefined>,
    Memo<R.Dispatch<R.SetStateAction<S | undefined>>>
  ]
} = R.useState as never

export const useRef_: {
  <T>(initialValue: T): Memo<R.MutableRefObject<T>>
  <T>(initialValue: T | null): Memo<R.RefObject<T>>
  <T = undefined>(): Memo<R.MutableRefObject<T | undefined>>
} = R.useRef as never

export type Delay<A extends R.ElementType> = {
  (
    props: Partial<R.ComponentPropsWithRef<A>>,
    ...children: Array<R.ReactNode>
  ): Delay<A>
  (): R.ReactNode
}

export { createElement as h } from 'react'

export const h_ = <A extends R.ElementType>(
  cmp: A,
  props: R.ComponentPropsWithRef<A>,
  ...children: Array<R.ReactNode>
): Delay<A> => {
  const go = (
    props: R.ComponentPropsWithRef<A>,
    ...children: Array<R.ReactNode>
  ): Delay<A> =>
    ((p: Partial<R.ComponentPropsWithRef<A>>, ...cs: Array<R.ReactNode>) =>
      p === undefined && cs.length === 0
        ? R.createElement(cmp, props, ...children)
        : h_(cmp, { ...props, ...p }, ...children, ...cs)) as never
  return go(props, ...children)
}
