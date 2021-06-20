import * as boardsRepo from './board.repository';

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
export const createBoard = (boardData: IBoard) => 
  boardsRepo.createBoard(boardData);

/**
 * Updates a board
 * @param {Object} boardData Object with information about a board
 * @returns {Promise<Object>} Promise represents the updated board
 */
export const updateBoard = (boardData: IBoard) =>
  boardsRepo.updateBoard(boardData);


/**
 * Deletes a board
 * @param {string} boardId Id of the board that you want to delete
 * @returns {Promise<boolean>} Promise represents the result of the deletion process
 */
export const deleteBoard = async (boardId: string) =>
  boardsRepo.deleteBoard(boardId);
