import * as boardsRepo from './board.memory.repository';
import BoardModel from './board.model';
import * as tasksService from '../tasks/task.service';

import { IBoard } from '../../types';

/**
 * Returns all boards
 * @returns {Promise<Array>} Promise represents array of boards
 */
export const getAll = () => boardsRepo.getAll();

/**
 * Returns a board by Id
 * @param {string} boardId Id of the desired board
 * @returns {Promise<Object>} Promise represents the board by given Id
 */
export const getBoardById = (boardId: string) => boardsRepo.getBoardById(boardId);

/**
 * Creates a board
 * @param {Object} boardData Object with information about a board
 * @returns {Promise<Object>} Promise represents the created board
 */
export const createBoard = (boardData: IBoard) => {
  const board = new BoardModel(boardData);

  return boardsRepo.createBoard(board);
};

/**
 * Updates a board
 * @param {Object} boardData Object with information about a board
 * @returns {Promise<Object>} Promise represents the updated board
 */
export const updateBoard = (boardData: IBoard) => {
  // my way to add an id to columns
  const board = new BoardModel(boardData);

  return boardsRepo.updateBoard(board);
};

/**
 * Deletes a board
 * @param {string} boardId Id of the board that you want to delete
 * @returns {Promise<boolean>} Promise represents the result of the deletion process
 */
export const deleteBoard = async (boardId: string) => {
  const boardTasks = await tasksService.getTasksByBoardId(boardId);

  await Promise.all(boardTasks.map((task) => tasksService.deleteTask(task.id)));

  return boardsRepo.deleteBoard(boardId);
};
