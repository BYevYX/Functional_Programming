import { Traversable } from '../structures/functors/foldable-traversable.js';
import {
  Applicative,
  Monad,
  Pointed,
} from '../structures/functors/pointed-monad.js';
import { Monoid } from '../structures/semigroup-monoid.js';

export const Maybe = class Maybe<T> implements Monad<T>, Traversable<T> {
  constructor(readonly _value: T) {}

  get value() {
    return this._value;
  }

  static of<U>(val: U): Maybe<U> {
    return new Maybe(val);
  }

  static nothing<A>(): Maybe<A> {
    return new Maybe<A>(null as A);
  }

  get isNothing() {
    return this.value === null || this.value === undefined;
  }

  map<U>(fn: (val: T) => U): Maybe<U> {
    return this.isNothing ? Maybe.nothing() : Maybe.of(fn(this.value));
  }

  ap<A, B>(this: Maybe<(a: A) => B>, other: Maybe<A>): Maybe<B> {
    return this.isNothing ? Maybe.nothing() : other.map(this.value);
  }

  chain<U>(fn: (value: T) => Maybe<U>): Maybe<U> {
    return this.isNothing ? Maybe.nothing() : this.map(fn).join();
  }

  join<U>(this: Maybe<Maybe<U>>): Maybe<U> {
    return this.isNothing ? Maybe.nothing() : this.value;
  }

  foldMap<M>(monoid: Monoid<M>, fn: (x: T) => M): M {
    return this.reduce<M>((acc, x) => monoid.concat(acc, fn(x)), monoid.empty);
  }

  sequence<U>(
    this: Maybe<Applicative<U>>,
    of: <V>(val: V) => Applicative<V>,
  ): Applicative<Maybe<U>> {
    return this.traverse(of, (x) => x);
  }

  traverse<U>(
    of: <V>(val: V) => Applicative<V>,
    fn: (val: T) => Applicative<U>,
  ): Applicative<Maybe<U>> {
    return this.isNothing
      ? of(Maybe.nothing())
      : (fn(this.value).map(Maybe.of) as Applicative<Maybe<U>>);
  }

  reduce<R>(fn: (acc: R, val: T) => R, initialValue: R): R {
    return this.isNothing ? initialValue : fn(initialValue, this.value);
  }
} satisfies Pointed;
