import { Applicative } from '../structures/functors/pointed-monad.js';
import { curry } from '../../functions/curry.js';
import { CurryForOne } from '../../utilities/typeHelpers.js';

// BIG TROUBLE: типизация функций с дженериками после каррировани ломается (так как ts по отдельным аргументам не может получить параметры в <>)

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
