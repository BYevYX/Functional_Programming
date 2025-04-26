import { Monoid } from '../semigroup-monoid.js';
import { Functor } from './functor.js';
import { Applicative } from './pointed-monad.js';

export abstract class Foldable<T> extends Functor<T> {
  abstract override map<U>(fn: (val: T) => U): Foldable<U>;

  abstract reduce<R>(fn: (acc: R, val: T) => R, initialValue: R): R;

  foldMap<M>(monoid: Monoid<M>, fn: (x: T) => M): M {
    return this.reduce<M>((acc, x) => monoid.concat(acc, fn(x)), monoid.empty);
  }
}

export abstract class Traversable<T> extends Foldable<T> {
  abstract override map<U>(fn: (val: T) => U): Traversable<U>;

  abstract traverse<U>(
    of: <V>(val: V) => Applicative<V>,
    fn: (val: T) => Applicative<U>,
  ): Applicative<Traversable<U>>;

  sequence<U>(
    this: Traversable<Applicative<U>>,
    of: <V>(val: V) => Applicative<V>,
  ): Applicative<Traversable<U>> {
    return this.traverse(of, (x) => x);
  }
}

// TODO: сделать функции миксины чтобы наследоваться от 2 классов +  закомпозить их
