import { Curried, CurryType } from '../functions/curry.js';
import { AnyFn } from '../types/fn.js';

export type OmitFirstParam<F extends AnyFn> =
  F extends CurryType<infer P, infer R>
    ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
      P extends [infer _, ...infer Rest]
      ? Rest['length'] extends 0
        ? R
        : Curried<(...args: Rest) => R>
      : never
    : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CurryForOne<F extends (...args: any[]) => any> = F extends (
  ...args: infer P
) => infer R
  ? P extends [infer A, ...infer Rest]
    ? Rest extends []
      ? (arg: A) => R
      : (arg: A) => CurryForOne<(...args: Rest) => R>
    : () => R
  : never;
