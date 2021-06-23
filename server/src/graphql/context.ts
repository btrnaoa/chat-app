import type User from '../models/User';

export type Context = {
  userId: User['id'];
};
