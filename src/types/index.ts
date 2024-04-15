export * from './LazyNode'
export * from './LazyElement'
export * from './CreateElement'
export * from './CreateLazyElement'

import * as R from 'react'

export type SomeNode =
  | R.ReactElement
  | string
  | number
  | Iterable<SomeNode>
  | R.ReactPortal
  | boolean
