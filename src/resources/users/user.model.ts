import { v4 as uuid } from 'uuid';

import { IUser } from '../../types';

class User implements IUser {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: IUser = {} as IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: IUser | undefined) {
    if (user) {
      const { id, name, login } = user;
      return { id, name, login };
    }
    return undefined;
  }
}

export default User;