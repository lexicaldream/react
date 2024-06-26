import * as R from 'react'
import { createElement } from '../createElement'
import { Exactly, ReactChildrenProp } from '../types'
import { LazyElement } from './LazyElement'

type CreateLazyElement = {
  <
    SuppliedProps extends Exactly<
      Partial<
        R.InputHTMLAttributes<HTMLInputElement> &
          R.ClassAttributes<HTMLInputElement> &
          ReactChildrenProp
      >,
      SuppliedProps
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
    SuppliedProps extends Exactly<
      Partial<R.ClassAttributes<T> & Props & ReactChildrenProp>,
      SuppliedProps
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
    SuppliedProps extends Exactly<
      Partial<R.ClassAttributes<T> & Props & ReactChildrenProp>,
      SuppliedProps
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
    SuppliedProps extends Exactly<
      Partial<R.ClassAttributes<T> & Props & ReactChildrenProp>,
      SuppliedProps
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

  <
    Props extends object,
    SuppliedProps extends Exactly<Partial<R.Attributes & Props>, SuppliedProps>
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
    SuppliedProps extends Exactly<
      Partial<R.ClassAttributes<T> & Props>,
      SuppliedProps
    >,
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
    Props extends object,
    SuppliedProps extends Exactly<Partial<R.Attributes & Props>, SuppliedProps>
  >(
    type: R.FunctionComponent<Props> | R.ComponentClass<Props>,
    props: SuppliedProps
  ): LazyElement<R.ReactElement<Props>, R.Attributes & Props, SuppliedProps>
}

export const createLazyElement: CreateLazyElement = ((
    type: string,
    props: object
  ) =>
  (p: object | ((p: object) => object)) =>
    p === undefined
      ? createElement(type, props)
      : createLazyElement(
          type,
          (typeof p === 'function' ? p(props) : { ...props, ...p }) as object
        )) as never
