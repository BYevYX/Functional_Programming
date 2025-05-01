import { AbstractConstructor } from '../../../types/fn.js';
import { Monoid } from '../semigroup-monoid.js';
import { Functor } from './functor.js';
import { Applicative } from './pointed-monad.js';

export abstract class Foldable<T> {
  abstract reduce<R>(fn: (acc: R, val: T) => R, initialValue: R): R;

  foldMap<M>(monoid: Monoid<M>, fn: (x: T) => M): M {
    return this.reduce<M>((acc, x) => monoid.concat(acc, fn(x)), monoid.empty);
  }
}

function FoldableMixin<TBase extends AbstractConstructor>(Base: TBase) {
  abstract class FoldableMix extends Base {
    abstract reduce<R>(fn: (acc: R, val: unknown) => R, initialValue: R): R;

    foldMap<M, V>(this: Foldable<V>, monoid: Monoid<M>, fn: (x: V) => M): M {
      return this.reduce<M>(
        (acc, x) => monoid.concat(acc, fn(x)),
        monoid.empty,
      );
    }
  }
  return FoldableMix;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Traversable<T> extends FoldableMixin(Functor<any>) {
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

export function TraversableMixin<TBase extends AbstractConstructor>(
  Base: TBase,
) {
  abstract class TraversableMix extends FoldableMixin(Base) {
    abstract traverse<U>(
      of: <V>(val: V) => Applicative<V>,
      fn: (val: unknown) => Applicative<U>,
    ): Applicative<Traversable<U>>;

    sequence<U>(
      this: Traversable<Applicative<U>>,
      of: <V>(val: V) => Applicative<V>,
    ): Applicative<Traversable<U>> {
      return this.traverse(of, (x) => x);
    }
  }

  return TraversableMix;
}
