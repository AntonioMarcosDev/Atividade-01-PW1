import type user from '../database/userDTO';

declare global {
  namespace Express {
    export interface Request {
      user: user;
    }
  }
}
