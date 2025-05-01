import { Monoid } from '../semigroup-monoid.js';
import { Functor } from './functor.js';
import { Applicative } from './pointed-monad.js';

export interface Foldable<T> {
  reduce<R>(fn: (acc: R, val: T) => R, initialValue: R): R;
  foldMap<M>(monoid: Monoid<M>, fn: (x: T) => M): M;
}

export interface Traversable<T> extends Functor<T>, Foldable<T> {
  traverse<U>(
    of: <V>(val: V) => Applicative<V>,
    fn: (val: T) => Applicative<U>,
  ): Applicative<Traversable<U>>;

  sequence<U>(
    this: Traversable<Applicative<U>>,
    of: <V>(val: V) => Applicative<V>,
  ): Applicative<Traversable<U>>;
}
