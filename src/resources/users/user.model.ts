import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { IUser } from '../../types';

@Entity()
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
    default: 'USER'
  })
  name: string;

  @Column({
    length: 64,
    default: 'user'
  })
  login: string;

  @Column({
    length: 64,
    default: 'P@55w0rd'
  })
  password: string;

  static toResponse(user: IUser | undefined) {
    if (user) {
      const { id, name, login } = user;
      return { id, name, login };
    }
    return undefined;
  }
}

export default User;
