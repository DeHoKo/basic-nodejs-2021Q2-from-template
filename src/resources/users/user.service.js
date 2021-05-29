const usersRepo = require('./user.memory.repository');
const UserModel = require('./user.model');
const tasksService = require('../tasks/task.service');

/**
 * Returns all users
 * @returns {Promise<Array>} Promise represents array of users
 */
const getAll = () => usersRepo.getAll();

/**
 * Returns a user by Id
 * @param {string} userId Id of the desired user
 * @returns {Promise<Object>} Promise represents the user by given Id
 */
const getUserById = (userId) => usersRepo.getUserById(userId);

/**
 * Creates a user
 * @param {Object} userData Object with information about a user
 * @returns {Promise<Object>} Promise represents the created user
 */
const createUser = (userData) => {
  const user = new UserModel(userData);

  return usersRepo.createUser(user);
};

/**
 * Updates a user
 * @param {Object} userData Object with information about a user
 * @returns Promise represents the updated user
 */
const updateUser = (userData) => {
  const user = new UserModel(userData);

  return usersRepo.updateUser(user);
};

/**
 * Deletes a user
 * @param {string} userId Id of the user that you want to delete
 * @returns Promise represents the result of the deletion process
 */
const deleteUser = async (userId) => {
  const userTasks = await tasksService.getTasksByUserId(userId);

  await Promise.all(
    userTasks.map((userTask) =>
      tasksService.updateTask({ ...userTask, userId: null })
    )
  );

  return usersRepo.deleteUser(userId);
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
