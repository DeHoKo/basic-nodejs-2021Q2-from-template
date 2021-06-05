import * as usersRepo from './user.memory.repository';
import UserModel from './user.model';
import * as tasksService from '../tasks/task.service';

import { IUser } from '../../types';

/**
 * Returns all users
 * @returns {Promise<Array>} Promise represents array of users
 */
export const getAll = () => usersRepo.getAll();

/**
 * Returns a user by Id
 * @param {string} userId Id of the desired user
 * @returns {Promise<Object>} Promise represents the user by given Id
 */
export const getUserById = (userId: string) => usersRepo.getUserById(userId);

/**
 * Creates a user
 * @param {Object} userData Object with information about a user
 * @returns {Promise<Object>} Promise represents the created user
 */
export const createUser = (userData: IUser) => {
  const user = new UserModel(userData);

  return usersRepo.createUser(user);
};

/**
 * Updates a user
 * @param {Object} userData Object with information about a user
 * @returns Promise represents the updated user
 */
export const updateUser = (userData: IUser) => {
  const user = new UserModel(userData);

  return usersRepo.updateUser(user);
};

/**
 * Deletes a user
 * @param {string} userId Id of the user that you want to delete
 * @returns Promise represents the result of the deletion process
 */
export const deleteUser = async (userId: string | null) => {
  if (userId === null) {
    return undefined;
  }
  
  const userTasks = await tasksService.getTasksByUserId(userId);

  await Promise.all(
    userTasks.map((userTask) =>
      tasksService.updateTask({ ...userTask, userId: null })
    )
  );

  return usersRepo.deleteUser(userId);
};
