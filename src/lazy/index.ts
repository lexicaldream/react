import { Fragment, ReactNode, createElement } from 'react'
import { CreateElement, CreateLazyElement } from '../types'

export const h: CreateElement = ((type: string, props: object) => {
  /* eslint-disable */
  const { children, ...p } = props as any
  return Array.isArray(children)
    ? createElement(type, p, ...children)
    : createElement(type, p, children)
  /* eslint-enable */
}) as never

export const h_: CreateLazyElement = ((type: string, props: object) =>
  (p: object | ((p: object) => object)) =>
    /* eslint-disable */
    p === undefined
      ? h(type, props)
      : h_(
          type as any,
          typeof p === 'function' ? p(props) : { ...props, ...p }
          /* eslint-enable */
        )) as never

export const frag = (...children: ReadonlyArray<ReactNode>) =>
  createElement(Fragment, {}, ...children)
