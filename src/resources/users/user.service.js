const usersRepo = require('./user.memory.repository');
const UserModel = require('./user.model');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUserById = (userId) => usersRepo.getUserById(userId);

const createUser = (userData) => {
  const user = new UserModel(userData);

  return usersRepo.createUser(user);
};

const updateUser = (userData) => {
  const user = new UserModel(userData);

  return usersRepo.updateUser(user);
};

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
