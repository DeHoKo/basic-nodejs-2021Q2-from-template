let USERS = [];

/**
 * Returns all users
 * @returns {Promise<Array>} Promise represents array of users
 */
const getAll = async () => USERS;

/**
 * Returns a user by Id
 * @param {string} userId Id of the desired user
 * @returns {Promise<Object>} Promise represents the user by given Id
 */
const getUserById = async (userId) => USERS.find((user) => user.id === userId);

/**
 * Creates a user
 * @param {Object} user Object with information about a user
 * @returns {Promise<Object>} Promise represents the created user
 */
const createUser = async (user) => {
  USERS.push(user);

  return user;
};

/**
 * Updates a user
 * @param {Object} updatedUser Object with information about a user
 * @returns Promise represents the updated user
 */
const updateUser = async (updatedUser) => {
  const userIndex = USERS.findIndex((user) => user.id === updatedUser.id);

  USERS[userIndex] = updatedUser;

  return updatedUser;
};

/**
 * Deletes a user
 * @param {string} userId Id of the user that you want to delete
 * @returns Promise represents the result of the deletion process
 */
const deleteUser = async (userId) => {
  USERS = USERS.filter((user) => user.id !== userId);

  return true;
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
