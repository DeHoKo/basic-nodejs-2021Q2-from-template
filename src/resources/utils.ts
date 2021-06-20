import { Repository, EntityTarget, getConnection } from 'typeorm';

export const getRepository = async <T>(target: EntityTarget<T>): Promise<Repository<T>> => {
  const connection = getConnection();
  return connection.getRepository(target);
}