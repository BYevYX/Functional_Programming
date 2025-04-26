import { Applicative } from '../structures/functors/pointed-monad.js';
import { curry } from './curry.js';

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

export const liftA2 = curry(
  <A, B, C>(
    fn: CurryForOne<(a: A, b: B) => C>,
    a1: Applicative<A>,
    a2: Applicative<B>,
  ): Applicative<C> => a1.map(fn).ap(a2),
);

export const liftA3 = curry(
  <A, B, C, D>(
    fn: CurryForOne<(a: A, b: B, c: C) => D>,
    a1: Applicative<A>,
    a2: Applicative<B>,
    a3: Applicative<C>,
  ): Applicative<D> => a1.map(fn).ap(a2).ap(a3),
);
