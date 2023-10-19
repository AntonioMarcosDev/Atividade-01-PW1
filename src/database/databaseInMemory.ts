import type user from './userDTO';

export const users: user[] = [];

export class DatabaseInMemory {
  UserExists = (username: string): user | null => {
    const user = users.find(
      (currentUsername) => currentUsername.username === username
    );
    if (user !== undefined) {
      return user;
    }
    return null;
  };

  createUser = (user: user): boolean => {
    if (this.UserExists(user.username) !== null) {
      return false;
    }
    users.push(user);

    return true;
  };
}
