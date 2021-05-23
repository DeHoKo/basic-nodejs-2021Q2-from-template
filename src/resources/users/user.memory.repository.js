let USERS = [];

const getAll = async () => USERS;

const getUserById = async (userId) => USERS.find((user) => user.id === userId);

const createUser = async (user) => {
  USERS.push(user);

  return user;
};

const updateUser = async (updatedUser) => {
  const userIndex = USERS.findIndex((user) => user.id === updatedUser.id);

  USERS[userIndex] = updatedUser;

  return updatedUser;
};

const deleteUser = async (userId) => {
  USERS = USERS.filter((user) => user.id !== userId);

  return true;
};

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser };
