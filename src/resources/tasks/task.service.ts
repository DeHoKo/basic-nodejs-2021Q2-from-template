import * as tasksRepo from './task.repository';

import { ITask } from '../../types';

/**
 * Returns tasks by board Id
 * @param {string} boardId Id of the board which contains tasks
 * @returns {Promise<Array>} Promise represents the array of tasks
 */
export const getTasksByBoardId = (boardId: string) =>
  tasksRepo.getTasksByBoardId(boardId);

/**
 * Returns tasks by user Id
 * @param {string} userId Id of the user who has tasks
 * @returns {Promise<Array>} Promise represents the array of tasks
 */
export const getTasksByUserId = (userId: string) => tasksRepo.getTasksByUserId(userId);

/**
 * Returns a task by Id
 * @param {string} taskId Id of the desired task
 * @returns {Promise<Object>} Promise represents the task
 */
export const getTaskById = (taskId: string) => tasksRepo.getTaskById(taskId);

/**
 * Creates a task
 * @param {Object} taskData Object represents a task
 * @param {string} boardId Id of the board where task should be put
 * @returns {Promise<Object>} Promise represents a task
 */
export const createTask = (taskData: ITask & {
  userId: string | null;
  boardId: string;
  columnId: string;
}, boardId: string) => 
  tasksRepo.createTask({ ...taskData, boardId });

/**
 * Updates a task
 * @param {Object} updatedTask Object with information about a task
 * @returns {Promise<Object>} Promise represents the updated task
 */
export const updateTask = (taskData: ITask & {
  userId: string | null;
  boardId: string;
  columnId: string;
}) =>
  tasksRepo.updateTask(taskData);

/**
 * Deletes a task
 * @param {string} taskId Id of the task that you want to delete
 * @returns {Promise<boolean>} Promise represents the result of the deletion process
 */
export const deleteTask = (taskId: string) => tasksRepo.deleteTask(taskId);
