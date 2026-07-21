// src/jsx.d.ts - Complete Type Definition Architecture for Levelo JS

declare global {
  namespace JSX {
    type Element = HTMLElement | SVGElement;

    export interface ElementAttributesProperty {
      props: {};
    }
    export interface ElementChildrenAttribute {
      children: {};
    }

    type Reactive<T> = T | (() => T);

    export interface DOMEvents {
      onClick?: (e: MouseEvent) => void;
      onDblClick?: (e: MouseEvent) => void;
      onMouseDown?: (e: MouseEvent) => void;
      onMouseUp?: (e: MouseEvent) => void;
      onMouseMove?: (e: MouseEvent) => void;
      onMouseEnter?: (e: MouseEvent) => void;
      onMouseLeave?: (e: MouseEvent) => void;
      onKeyDown?: (e: KeyboardEvent) => void;
      onKeyUp?: (e: KeyboardEvent) => void;
      onKeyPress?: (e: KeyboardEvent) => void;
      onFocus?: (e: FocusEvent) => void;
      onBlur?: (e: FocusEvent) => void;
      onSubmit?: (e: SubmitEvent) => void;
      onInput?: (e: InputEvent) => void;
      onChange?: (e: Event) => void;
      onScroll?: (e: Event) => void;
      onTouchStart?: (e: TouchEvent) => void;
      onTouchMove?: (e: TouchEvent) => void;
      onTouchEnd?: (e: TouchEvent) => void;
    }

    export interface HTMLAttributes extends DOMEvents {
      class?: Reactive<string>;
      className?: Reactive<string>;
      id?: Reactive<string>;
      style?: Reactive<Partial<CSSStyleDeclaration> | string>;
      renderString?: Reactive<string>;
      title?: Reactive<string>;
      dir?: Reactive<string>;
      lang?: Reactive<string>;
      hidden?: Reactive<boolean>;
      tabIndex?: Reactive<number>;
      role?: Reactive<string>;
      children?: any;
      [key: string]: any;
    }

    export interface AnchorHTMLAttributes extends HTMLAttributes {
      href?: Reactive<string>;
      target?: Reactive<'_blank' | '_self' | '_parent' | '_top'>;
      download?: Reactive<any>;
      rel?: Reactive<string>;
    }

    export interface ButtonHTMLAttributes extends HTMLAttributes {
      type?: Reactive<'button' | 'submit' | 'reset'>;
      disabled?: Reactive<boolean>;
      name?: Reactive<string>;
      value?: Reactive<string | number>;
    }

    export interface FormHTMLAttributes extends HTMLAttributes {
      action?: Reactive<string>;
      method?: Reactive<'get' | 'post'>;
      target?: Reactive<string>;
    }

    export interface InputHTMLAttributes extends HTMLAttributes {
      type?: Reactive<string>;
      value?: Reactive<string | number | boolean>;
      placeholder?: Reactive<string>;
      checked?: Reactive<boolean>;
      disabled?: Reactive<boolean>;
      readOnly?: Reactive<boolean>;
      required?: Reactive<boolean>;
      name?: Reactive<string>;
      min?: Reactive<string | number>;
      max?: Reactive<string | number>;
      step?: Reactive<string | number>;
      maxLength?: Reactive<number>;
      minLength?: Reactive<number>;
      pattern?: Reactive<string>;
      autocomplete?: Reactive<string>;
    }

    export interface TextAreaHTMLAttributes extends HTMLAttributes {
      value?: Reactive<string | number>;
      placeholder?: Reactive<string>;
      rows?: Reactive<number>;
      cols?: Reactive<number>;
      disabled?: Reactive<boolean>;
      readOnly?: Reactive<boolean>;
      required?: Reactive<boolean>;
    }

    export interface SelectHTMLAttributes extends HTMLAttributes {
      value?: Reactive<string | number | string[]>;
      disabled?: Reactive<boolean>;
      multiple?: Reactive<boolean>;
      name?: Reactive<string>;
      required?: Reactive<boolean>;
    }

    export interface OptionHTMLAttributes extends HTMLAttributes {
      value?: Reactive<string | number>;
      selected?: Reactive<boolean>;
      disabled?: Reactive<boolean>;
    }

    export interface ImgHTMLAttributes extends HTMLAttributes {
      src?: Reactive<string>;
      alt?: Reactive<string>;
      width?: Reactive<number | string>;
      height?: Reactive<number | string>;
      loading?: Reactive<'eager' | 'lazy'>;
    }

    export interface SVGAttributes extends HTMLAttributes {
      xmlns?: string;
      viewBox?: Reactive<string>;
      fill?: Reactive<string>;
      stroke?: Reactive<string>;
      strokeWidth?: Reactive<number | string>;
      strokeLinecap?: Reactive<'butt' | 'round' | 'square' | 'inherit'>;
      strokeLinejoin?: Reactive<'miter' | 'round' | 'bevel' | 'inherit'>;
      width?: Reactive<number | string>;
      height?: Reactive<number | string>;
      gradientTransform?: Reactive<string>;
      gradientUnits?: Reactive<string>;
      patternUnits?: Reactive<string>;
    }

    export interface IntrinsicElements {
      a: AnchorHTMLAttributes;
      abbr: HTMLAttributes;
      address: HTMLAttributes;
      article: HTMLAttributes;
      aside: HTMLAttributes;
      audio: HTMLAttributes;
      b: HTMLAttributes;
      blockquote: HTMLAttributes;
      body: HTMLAttributes;
      br: HTMLAttributes;
      button: ButtonHTMLAttributes;
      canvas: HTMLAttributes;
      code: HTMLAttributes;
      div: HTMLAttributes;
      em: HTMLAttributes;
      footer: HTMLAttributes;
      form: FormHTMLAttributes;
      h1: HTMLAttributes;
      h2: HTMLAttributes;
      h3: HTMLAttributes;
      h4: HTMLAttributes;
      h5: HTMLAttributes;
      h6: HTMLAttributes;
      header: HTMLAttributes;
      hr: HTMLAttributes;
      i: HTMLAttributes;
      iframe: HTMLAttributes;
      img: ImgHTMLAttributes;
      input: InputHTMLAttributes;
      label: HTMLAttributes;
      li: HTMLAttributes;
      main: HTMLAttributes;
      nav: HTMLAttributes;
      option: OptionHTMLAttributes;
      p: HTMLAttributes;
      pre: HTMLAttributes;
      section: HTMLAttributes;
      select: SelectHTMLAttributes;
      span: HTMLAttributes;
      strong: HTMLAttributes;
      table: HTMLAttributes;
      tbody: HTMLAttributes;
      td: HTMLAttributes;
      textarea: TextAreaHTMLAttributes;
      th: HTMLAttributes;
      thead: HTMLAttributes;
      tr: HTMLAttributes;
      ul: HTMLAttributes;
      ol: HTMLAttributes;
      video: HTMLAttributes;

      svg: SVGAttributes;
      path: SVGAttributes;
      circle: SVGAttributes;
      rect: SVGAttributes;
      line: SVGAttributes;
      polyline: SVGAttributes;
      polygon: SVGAttributes;
      g: SVGAttributes;
      text: SVGAttributes;
      defs: SVGAttributes;
      use: SVGAttributes;

      math: HTMLAttributes;

      [elemName: string]: HTMLAttributes;
    }
  }
}

export type JSX = {
  Element: JSX.Element;
  IntrinsicElements: JSX.IntrinsicElements;
  HTMLAttributes: JSX.HTMLAttributes;
  DOMEvents: JSX.DOMEvents;
};