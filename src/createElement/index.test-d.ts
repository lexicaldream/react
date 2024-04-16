import { expectType, expectError } from 'tsd'
import * as R from 'react'
import { createElement_ } from './index'

// # Required props

type ComponentWithRequiredProps = { reqA: string }

declare const ComponentWithRequiredProps: (
  props: ComponentWithRequiredProps
) => R.ReactNode

// All required props supplied
expectType<R.FunctionComponentElement<ComponentWithRequiredProps>>(
  createElement_(ComponentWithRequiredProps, { reqA: 'a' })
)

// Required prop is missing
expectError(
  createElement_(ComponentWithRequiredProps, { requiredPropIsMissing: 'x' })
)

// Extra prop supplied
expectError(
  createElement_(ComponentWithRequiredProps, { reqA: 'a', extraProp: 'b' })
)

// Unwanted children supplied
expectError(
  createElement_(ComponentWithRequiredProps, { reqA: 'a', children: ['b'] })
)

// # Optional props

type ComponentWithOptionalProps = { optA?: string }

declare const ComponentWithOptionalProps: (
  props: ComponentWithOptionalProps
) => R.ReactNode

// No props supplied
expectType<R.FunctionComponentElement<ComponentWithOptionalProps>>(
  createElement_(ComponentWithOptionalProps, {})
)

// All props supplied
expectType<R.FunctionComponentElement<ComponentWithOptionalProps>>(
  createElement_(ComponentWithOptionalProps, { optA: 'a' })
)

// Extra prop supplied
expectError(createElement_(ComponentWithOptionalProps, { extraProp: 'x' }))

// Unwanted children supplied
expectError(createElement_(ComponentWithOptionalProps, { children: ['a'] }))

// # Children

// ## "Normal" child array

type ComponentWithChildren = { children: ReadonlyArray<R.ReactNode> }

declare const ComponentWithChildren: (
  props: ComponentWithChildren
) => R.ReactNode

// Children supplied
expectType<R.FunctionComponentElement<ComponentWithChildren>>(
  createElement_(ComponentWithChildren, {
    children: ['a', 'b']
  })
)

// Empty children supplied
expectType<R.FunctionComponentElement<ComponentWithChildren>>(
  createElement_(ComponentWithChildren, {
    children: []
  })
)

// Children missing
expectError(createElement_(ComponentWithChildren, {}))

// Children malformed
expectError(createElement_(ComponentWithChildren, { children: 'not an array' }))

// Children maltyped
expectError(createElement_(ComponentWithChildren, { children: [new Date()] }))

// ## Tuple children

type ComponentWithChildrenTuple = { children: [number, string] }

declare const ComponentWithChildrenTuple: (
  props: ComponentWithChildrenTuple
) => R.ReactNode

// Children supplied
expectType<R.FunctionComponentElement<ComponentWithChildrenTuple>>(
  createElement_(ComponentWithChildrenTuple, {
    children: [1, 'a']
  })
)

// Extra children supplied
expectError(
  createElement_(ComponentWithChildrenTuple, {
    children: [1, 'a', 'b']
  })
)

// Not enough children supplied
expectError(
  createElement_(ComponentWithChildrenTuple, {
    children: [1]
  })
)
