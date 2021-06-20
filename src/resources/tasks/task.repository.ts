import { getRepository } from '../utils';
import { ITask } from '../../types';
import Task from './task.model';

/**
 * Returns tasks by board Id
 * @param {string} boardId Id of the board which contains tasks
 * @returns {Promise<Array>} Promise represents the array of tasks
 */
export const getTasksByBoardId = async (boardId: string) => {
  const taskRepository = await getRepository<Task & {
    userId: string | null;
    boardId: string;
    columnId: string;
  }>(Task);
  return taskRepository.find({ boardId });
}

/**
 * Returns tasks by user Id
 * @param {string} userId Id of the user who has tasks
 * @returns {Promise<Array>} Promise represents the array of tasks
 */
export const getTasksByUserId = async (userId: string) => {
  const taskRepository = await getRepository<Task & {
    userId: string | null;
    boardId: string;
    columnId: string;
  }>(Task);
  try {
    return await taskRepository.find({ userId });
  } catch (e) {
    console.log('DELETE USER ERROR: ', e);
    return undefined;
  }
}

/**
 * Returns a task by Id
 * @param {string} taskId Id of the desired task
 * @returns {Promise<Object>} Promise represents the task
 */
export const getTaskById = async (taskId: string) => {
  const taskRepository = await getRepository(Task);
  return taskRepository.findOne({ id: taskId });
}

/**
 * Creates a task
 * @param {Object} task Object represents a task
 * @returns {Promise<Object>} Promise represents a task
 */
export const createTask = async (task: ITask & {
  userId: string | null;
  boardId: string;
  columnId: string;
}) => {
  const newTask = new Task() as (Task & {
    userId: string | null;
    boardId: string;
    columnId: string;
  });
  newTask.boardId = task.boardId;
  newTask.columnId = task.columnId;
  newTask.description = task.description;
  newTask.order = task.order;
  newTask.title = task.title;
  newTask.userId = task.userId as unknown as string;

  const userRepository = await getRepository(Task);
  return userRepository.save(newTask);
};

/**
 * Updates a task
 * @param {Object} updatedTask Object with information about a task
 * @returns {Promise<Object>} Promise represents the updated task
 */
export const updateTask = async (updatedTask: ITask & {
  userId: string | null;
  boardId: string;
  columnId: string;
}) => {
  const task = await getTaskById(updatedTask.id) as (Task & {
    userId: string | null;
    boardId: string;
    columnId: string;
  });
  if (!task) {
    return undefined;
  }
  task.boardId = updatedTask.boardId;
  task.columnId = updatedTask.columnId;
  task.description = updatedTask.description;
  task.order = updatedTask.order;
  task.title = updatedTask.title;
  task.userId = updatedTask.userId as unknown as string;

  const userRepository = await getRepository(Task);
  return userRepository.save(task);
};

/**
 * Deletes a task
 * @param {string} taskId Id of the task that you want to delete
 * @returns {Promise<boolean>} Promise represents the result of the deletion process
 */
export const deleteTask = async (taskId: string) => {
  const task = await getTaskById(taskId);

  const userRepository = await getRepository(Task);
  if (task) {
    return userRepository.remove(task);
  }
  return undefined;
};