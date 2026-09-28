import { session } from 'grammy';
import { initialSession } from '../../types/context';

export const sessionMiddleware = session({
  initial: initialSession,
});
