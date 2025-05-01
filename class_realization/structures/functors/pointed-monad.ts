import { Functor } from './functor.js';

/* eslint-disable @typescript-eslint/no-unused-vars */
export abstract class Pointed<T> extends Functor<T> {
  abstract override map<U>(fn: (val: T) => U): Pointed<U>;

  static of<U>(val: U): Pointed<U> {
    // Subclasses must override
    throw new Error('Pointed.of<U> not implemented');
  }
}

export abstract class Applicative<T> extends Pointed<T> {
  abstract override map<U>(fn: (val: T) => U): Applicative<U>;

  abstract ap<A, B>(
    this: Applicative<(a: A) => B>,
    other: Applicative<A>,
  ): Applicative<B>;
}

export abstract class Monad<T> extends Applicative<T> {
  abstract override map<U>(fn: (val: T) => U): Monad<U>;
  abstract ap<A, B>(this: Monad<(a: A) => B>, other: Monad<A>): Monad<B>;

  abstract join<U>(this: Monad<Monad<U>>): Monad<U>;
  abstract chain<U>(fn: (value: T) => Monad<U>): Monad<U>;
}
