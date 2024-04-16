import { ChildrenProp } from '../types'

type RequiredProps<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K]
}

type StillNeeded<Props, SuppliedProps> = Exclude<
  keyof RequiredProps<Props>,
  keyof RequiredProps<SuppliedProps>
>

export const RequiredKeys: unique symbol = Symbol.for(
  '@lexicaldream/react/LazyElement/RequiredKeys'
)

export type RequiredKeys = typeof RequiredKeys

export type LazyElement<
  Component,
  Props extends object | ChildrenProp,
  SuppliedProps
> = {
  <SuppliedProps2 extends Partial<Props>>(
    props: SuppliedProps2
  ): LazyElement<Component, Props, SuppliedProps & SuppliedProps2>

  <SuppliedProps2 extends Partial<Props>>(
    f: (props: SuppliedProps) => SuppliedProps & SuppliedProps2
  ): LazyElement<Component, Props, SuppliedProps & SuppliedProps2>

  (): [StillNeeded<Props, SuppliedProps>] extends [never]
    ? Component
    : LazyElement<Component, Props, SuppliedProps>

  [RequiredKeys]: StillNeeded<Props, SuppliedProps>
}
