let TASKS = [];

/**
 * Returns tasks by board Id
 * @param {string} boardId Id of the board which contains tasks
 * @returns {Promise<Array>} Promise represents the array of tasks
 */
export const getTasksByBoardId = async (boardId) =>
  TASKS.filter((task) => task.boardId === boardId);

/**
 * Returns tasks by user Id
 * @param {string} userId Id of the user who has tasks
 * @returns {Promise<Array>} Promise represents the array of tasks
 */
export const getTasksByUserId = async (userId) =>
  TASKS.filter((task) => task.userId === userId);

/**
 * Returns a task by Id
 * @param {string} taskId Id of the desired task
 * @returns {Promise<Object>} Promise represents the task
 */
export const getTaskById = async (taskId) => TASKS.find((task) => task.id === taskId);

/**
 * Creates a task
 * @param {Object} task Object represents a task
 * @returns {Promise<Object>} Promise represents a task
 */
export const createTask = async (task) => {
  TASKS.push(task);

  return task;
};

/**
 * Updates a task
 * @param {Object} updatedTask Object with information about a task
 * @returns {Promise<Object>} Promise represents the updated task
 */
export const updateTask = async (updatedTask) => {
  const taskIndex = TASKS.findIndex((task) => task.id === updatedTask.id);

  TASKS[taskIndex] = updatedTask;

  return updatedTask;
};

/**
 * Deletes a task
 * @param {string} taskId Id of the task that you want to delete
 * @returns {Promise<boolean>} Promise represents the result of the deletion process
 */
export const deleteTask = async (taskId) => {
  TASKS = TASKS.filter((task) => task.id !== taskId);

  return true;
};