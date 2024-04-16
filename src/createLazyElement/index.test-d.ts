import { expectType, expectError, expectAssignable } from 'tsd'
import * as R from 'react'
import { createLazyElement_ } from './index'
import { LazyElement, RequiredKeys } from './LazyElement'

// # Required props

type Props = {
  req: string
  req1: string
  opt?: number
  children?: ReadonlyArray<R.ReactNode>
}

declare const Component: (props: Props) => R.ReactNode

// All props supplied
if (true) {
  const e = createLazyElement_(Component, {
    req: 'a',
    req1: 'b',
    opt: 1,
    children: ['x']
  })

  expectAssignable<
    LazyElement<R.FunctionComponentElement<Props>, Props, Props>
  >(e)

  expectType<never>(e[RequiredKeys])
}

// Prop is missing
if (true) {
  const e = createLazyElement_(Component, { opt: 1, children: ['x'] })

  expectAssignable<
    LazyElement<
      R.FunctionComponentElement<Props>,
      Props,
      { opt: number; children: ReadonlyArray<R.ReactNode> }
    >
  >(e)

  expectType<'req' | 'req1'>(e[RequiredKeys])
}

// Prop added
if (true) {
  const e = createLazyElement_(Component, { opt: 1, children: ['x'] })({
    req: 'a'
  })

  expectAssignable<
    LazyElement<
      R.FunctionComponentElement<Props>,
      Props,
      {
        opt: number
        children: ReadonlyArray<R.ReactNode>
        req: string
      }
    >
  >(e)

  expectType<'req1'>(e[RequiredKeys])
}

// Child appended
expectAssignable<
  LazyElement<
    R.FunctionComponentElement<Props>,
    Props,
    {
      opt: number
      children: ReadonlyArray<R.ReactNode>
    }
  >
>(
  createLazyElement_(Component, { opt: 1, children: ['x'] })(p => ({
    ...p,
    children: [...p.children, 'x']
  }))
)

// Extra prop supplied
expectError(createLazyElement_(Component, { opt: 1, extra: 'b' }))

// Extra prop supplied solo
expectError(createLazyElement_(Component, { extra: 'b' }))

// Attempt to render without required prop
expectAssignable<
  LazyElement<
    R.FunctionComponentElement<Props>,
    Props,
    { opt: number; children: ReadonlyArray<R.ReactNode> }
  >
>(createLazyElement_(Component, { opt: 1, children: ['x'] })())

// Render with supplied required props
expectType<R.FunctionComponentElement<Props>>(
  createLazyElement_(Component, { req: 'a', req1: 'b' })()
)

// # Optional props

type ComponentWithOptionalProps = { optA?: string }

declare const ComponentWithOptionalProps: (
  props: ComponentWithOptionalProps
) => R.ReactNode

// No props supplied
expectType<
  LazyElement<
    R.FunctionComponentElement<ComponentWithOptionalProps>,
    ComponentWithOptionalProps,
    {}
  >
>(createLazyElement_(ComponentWithOptionalProps, {}))

// All props supplied
expectType<
  LazyElement<
    R.FunctionComponentElement<ComponentWithOptionalProps>,
    ComponentWithOptionalProps,
    { optA: string }
  >
>(createLazyElement_(ComponentWithOptionalProps, { optA: 'a' }))

// Extra prop supplied
expectError(createLazyElement_(ComponentWithOptionalProps, { extraProp: 'x' }))

// Unwanted children supplied
expectError(createLazyElement_(ComponentWithOptionalProps, { children: ['a'] }))
