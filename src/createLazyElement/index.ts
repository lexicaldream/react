import * as R from 'react'
import { LazyElement } from './LazyElement'
import { ChildrenProp, ReactChildrenProp } from '../types'
import { createElement_ } from '../createElement'

type CreateLazyElement = {
  <
    SuppliedProps extends Partial<
      R.InputHTMLAttributes<HTMLInputElement> &
        R.ClassAttributes<HTMLInputElement> &
        ReactChildrenProp
    >
  >(
    type: 'input',
    props: SuppliedProps
  ): LazyElement<
    R.DetailedReactHTMLElement<
      R.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    R.InputHTMLAttributes<HTMLInputElement> &
      R.ClassAttributes<HTMLInputElement> &
      ReactChildrenProp,
    SuppliedProps
  >

  <
    Props extends R.HTMLAttributes<T>,
    SuppliedProps extends Partial<
      R.ClassAttributes<T> & Props & ReactChildrenProp
    >,
    T extends HTMLElement
  >(
    type: keyof R.ReactHTML,
    props: SuppliedProps
  ): LazyElement<
    R.DetailedReactHTMLElement<Props, T>,
    R.ClassAttributes<T> & Props & ReactChildrenProp,
    SuppliedProps
  >

  <
    Props extends R.SVGAttributes<T>,
    SuppliedProps extends Partial<
      R.ClassAttributes<T> & Props & ReactChildrenProp
    >,
    T extends SVGElement
  >(
    type: keyof R.ReactSVG,
    props: SuppliedProps
  ): LazyElement<
    R.ReactSVGElement,
    R.ClassAttributes<T> & Props & ReactChildrenProp,
    SuppliedProps
  >

  <
    Props extends R.DOMAttributes<T>,
    SuppliedProps extends Partial<
      R.ClassAttributes<T> & Props & ReactChildrenProp
    >,
    T extends Element
  >(
    type: string,
    props: SuppliedProps
  ): LazyElement<
    R.DOMElement<Props, T>,
    R.ClassAttributes<T> & Props & ReactChildrenProp,
    SuppliedProps
  >

  // Custom components

  <Props extends object, SuppliedProps extends Partial<R.Attributes & Props>>(
    type: R.FunctionComponent<Props>,
    props: SuppliedProps
  ): LazyElement<
    R.FunctionComponentElement<Props>,
    R.Attributes & Props,
    SuppliedProps
  >

  <
    Props extends ChildrenProp,
    SuppliedProps extends Partial<R.Attributes & Props>
  >(
    type: R.FunctionComponent<Props>,
    props: SuppliedProps
  ): LazyElement<
    R.FunctionComponentElement<Props>,
    R.Attributes & Props,
    SuppliedProps
  >

  <
    Props extends object,
    SuppliedProps extends Partial<R.ClassAttributes<T> & Props>,
    T extends R.Component<Props, R.ComponentState>,
    C extends R.ComponentClass<Props>
  >(
    type: R.ClassType<Props, T, C>,
    props: SuppliedProps
  ): LazyElement<
    R.CElement<Props, T>,
    R.ClassAttributes<T> & Props,
    SuppliedProps
  >

  <
    Props extends ChildrenProp,
    SuppliedProps extends Partial<R.ClassAttributes<T> & Props>,
    T extends R.Component<Props, R.ComponentState>,
    C extends R.ComponentClass<Props>
  >(
    type: R.ClassType<Props, T, C>,
    props: SuppliedProps
  ): LazyElement<
    R.CElement<Props, T>,
    R.ClassAttributes<T> & Props,
    SuppliedProps
  >

  <Props extends object, SuppliedProps extends Partial<R.Attributes & Props>>(
    type: R.FunctionComponent<Props> | R.ComponentClass<Props> | string,
    props: SuppliedProps
  ): LazyElement<R.ReactElement<Props>, R.Attributes & Props, SuppliedProps>

  <
    Props extends ChildrenProp,
    SuppliedProps extends Partial<R.Attributes & Props>
  >(
    type: R.FunctionComponent<Props> | R.ComponentClass<Props> | string,
    props: SuppliedProps
  ): LazyElement<R.ReactElement<Props>, R.Attributes & Props, SuppliedProps>
}

export const createLazyElement_: CreateLazyElement = ((
    type: string,
    props: object
  ) =>
  (p: object | ((p: object) => object)) =>
    /* eslint-disable */
    p === undefined
      ? createElement_(type, props)
      : createLazyElement_(
          type as any,
          typeof p === 'function' ? p(props) : { ...props, ...p }
          /* eslint-enable */
        )) as never
