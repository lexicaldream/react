import * as R from 'react'

import { MemoBrand, Memo } from './memo'

type Primitive = bigint | boolean | null | number | string | symbol | undefined

type DependencyList = Array<Primitive | { [MemoBrand]: unknown }>

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
