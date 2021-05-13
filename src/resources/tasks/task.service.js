const tasksRepo = require('./task.memory.repository');
const TaskModel = require('./task.model');

const getTasksByBoardId = (boardId) => tasksRepo.getTasksByBoardId(boardId);

const getTasksByUserId = (userId) => tasksRepo.getTasksByUserId(userId);

const getTaskById = (taskId) => tasksRepo.getTaskById(taskId);


const createTask = (taskData, boardId) => {
  const task = new TaskModel({ ...taskData, boardId });

  return tasksRepo.createTask(task);
};

const updateTask = (taskData) => {
  const task = new TaskModel(taskData);

  return tasksRepo.updateTask(task);
};

const deleteTask = (taskId) => tasksRepo.deleteTask(taskId);

module.exports = {
  getTasksByBoardId,
  getTasksByUserId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
