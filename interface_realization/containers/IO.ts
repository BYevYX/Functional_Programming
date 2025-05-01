// import { Functor } from '../structures/functors/functor.js';
// import { AnyFn } from '../../types/fn.js';
// import { Traversable } from '../structures/functors/foldable-traversable.js';
// import {
//   Applicative,
//   Monad,
//   Pointed,
// } from '../structures/functors/pointed-monad.js';
// import { Monoid } from '../structures/semigroup-monoid.js';

// export const IO = class IO<T extends AnyFn>
//   implements Functor<T>, Traversable<T>
// {
//   constructor(readonly _value: T) {}

//   get value() {
//     return this._value;
//   }

//   unsafePerform() {
//     return this._value();
//   }

//   static of<U>(val: U): IO<U> {
//     if (typeof val === 'function') return new IO(val);
//     return new IO(() => val);
//   }

//   map<U>(fn: (val: ReturnType<T>) => U): IO<(...args: Parameters<T>) => U> {
//     return new IO(() => fn(this.value()));
//   }

//   ap<A, B>(this: IO<(a: A) => B>, other: IO<A>): IO<B> {
//     return this.chain((fn) => other.map(fn));
//   }

//   chain<U>(fn: (value: T) => Monad<U>): Monad<U> {}

//   join<U>(this: Monad<Monad<U>>): Monad<U> {}

//   foldMap<M>(monoid: Monoid<M>, fn: (x: T) => M): M {}

//   traverse<U>(
//     of: <V>(val: V) => Applicative<V>,
//     fn: (val: T) => Applicative<U>,
//   ): Applicative<Traversable<U>> {}

//   reduce<R>(fn: (acc: R, val: T) => R, initialValue: R): R {}
// } satisfies Pointed;
