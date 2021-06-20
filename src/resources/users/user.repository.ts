import { getRepository } from '../utils';
import { IUser } from '../../types';
import User from './user.model';

/**
 * Returns all users
 * @returns {Promise<Array>} Promise represents array of users
 */
export const getAll = async () => {
  const userRepository = await getRepository(User);
  return userRepository.find();
};

/**
 * Returns a user by Id
 * @param {string} userId Id of the desired user
 * @returns {Promise<Object>} Promise represents the user by given Id
 */
export const getUserById = async (userId: string) => {
  const userRepository = await getRepository(User);
  return userRepository.findOne({ id: userId })
};

/**
 * Creates a user
 * @param {Object} user Object with information about a user
 * @returns {Promise<Object>} Promise represents the created user
 */
export const createUser = async (user: IUser) => {
  const newUser = new User();
  newUser.login = user.login;
  newUser.name = user.name;
  newUser.password = user.password;

  const userRepository = await getRepository(User);
  return userRepository.save(newUser);
};

/**
 * Updates a user
 * @param {Object} updatedUser Object with information about a user
 * @returns Promise represents the updated user
 */
export const updateUser = async (updatedUser: IUser) => {
  const user = await getUserById(updatedUser.id);
  if (!user) {
    return undefined;
  }
  user.login = updatedUser.login;
  user.name = updatedUser.name;
  user.password = updatedUser.password;

  const userRepository = await getRepository(User);
  return userRepository.save(user);
};

/**
 * Deletes a user
 * @param {string} userId Id of the user that you want to delete
 * @returns Promise represents the result of the deletion process
 */
export const deleteUser = async (userId: string) => {
  const user = await getUserById(userId);

  const userRepository = await getRepository(User);
  if (user) {
    return userRepository.remove(user);
  }
  return undefined;
};
