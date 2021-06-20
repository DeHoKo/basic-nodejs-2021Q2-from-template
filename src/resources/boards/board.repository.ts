import { getRepository } from '../utils';
import { IBoard } from '../../types';
import Board from './board.model';
import Column from '../columns/column.model';

/**
 * Returns all boards
 * @returns {Promise<Array>} Promise represents array of boards
 */
export const getAll = async () => {
  const boardRepository = await getRepository(Board);
  return boardRepository.find();
};

/**
 * Returns a board by Id
 * @param {string} boardId Id of the desired board
 * @returns {Promise<Object>} Promise represents the board by given Id
 */
export const getBoardById = async (boardId: string) => {
  const boardRepository = await getRepository(Board);
  return boardRepository.findOne({ id: boardId });
};

/**
 * Creates a board
 * @param {Object} board Object with information about a board
 * @returns {Promise<Object>} Promise represents the created board
 */
export const createBoard = async (board: IBoard) => {
  const newBoard = new Board();
  newBoard.title = board.title;

  const columns = board.columns.map(column => {
    const newColumn = new Column();
    newColumn.order = column.order;
    newColumn.title = column.title;
    return newColumn;
  })

  newBoard.columns = columns;
  const boardRepository = await getRepository(Board);
  return boardRepository.save(newBoard);
};

/**
 * Updates a board
 * @param {Object} updatedBoard Object with information about a board
 * @returns {Promise<Object>} Promise represents the updated board
 */
export const updateBoard = async (updatedBoard: IBoard) => {
  const board = await getBoardById(updatedBoard.id);
  if (!board) {
    return undefined;
  }

  board.title = updatedBoard.title;
    const boardRepository = await getRepository(Board);
    return boardRepository.save(board);
};

/**
 * Deletes a board
 * @param {string} boardId Id of the board that you want to delete
 * @returns {Promise<boolean>} Promise represents the result of the deletion process
 */
export const deleteBoard = async (boardId: string) => {
  const board = await getBoardById(boardId);
  if (!board) {
    return undefined;
  }

  const boardRepository = await getRepository(Board);
  return boardRepository.remove(board);
};