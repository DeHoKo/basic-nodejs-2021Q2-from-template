let TASKS = [];

const getTasksByBoardId = async (boardId) =>
  TASKS.filter((task) => task.boardId === boardId);

const getTasksByUserId = async (userId) =>
  TASKS.filter((task) => task.userId === userId);

const getTaskById = async (taskId) => TASKS.find((task) => task.id === taskId);

const createTask = async (task) => {
  TASKS.push(task);

  return task;
};

const updateTask = async (updatedTask) => {
  const taskIndex = TASKS.findIndex((task) => task.id === updatedTask.id);

  TASKS[taskIndex] = updatedTask;

  return updatedTask;
};

const deleteTask = async (taskId) => {
  TASKS = TASKS.filter((task) => task.id !== taskId);

  return true;
};

module.exports = {
  getTasksByBoardId,
  getTasksByUserId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
