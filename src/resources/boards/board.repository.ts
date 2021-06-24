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
  const board = await boardRepository.createQueryBuilder('board')
    .leftJoinAndSelect('board.columns', 'column')
      .where('board.id = :boardId', { boardId })
      .getOne();
  if (!board?.columns?.length) {
    delete board?.columns;
  }
  return board;
};

/**
 * Creates a board
 * @param {Object} board Object with information about a board
 * @returns {Promise<Object>} Promise represents the created board
 */
export const createBoard = async (board: IBoard) => {
  const newBoard = new Board();
  newBoard.title = board.title;

  let columns;
  if (board.columns) {
    columns = board.columns.map(column => {
      const newColumn = new Column();
      newColumn.order = column.order;
      newColumn.title = column.title;
      return newColumn;
    })
  }

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
  const boardRepository = await getRepository(Board);
  const board = await boardRepository.findOne(updatedBoard.id);
  if (!board) {
    return undefined;
  }

  // const columns = updatedBoard.columns.map(column => {
  //   const newColumn = new Column();
  //   newColumn.order = column.order;
  //   newColumn.title = column.title;
  //   return newColumn;
  // })

  // board.columns = columns;
  board.title = updatedBoard.title;
  const savedBoard = await boardRepository.save(board);
  console.log('SAVED BOARD: ', savedBoard);
  const columnRepository = await getRepository(Column);
  let columns;
  if (updatedBoard.columns) {
    columns = updatedBoard.columns.map(column => {
      const newColumn = new Column();
      newColumn.boardId = savedBoard.id;
      newColumn.order = column.order;
      newColumn.title = column.title;
      return columnRepository.save(newColumn);
    })
  }
  if (columns) {
    await Promise.all(columns);
  }
  const thisBoard = await getBoardById(savedBoard.id);
  console.log('AGAIN SAVED BOARD: ', thisBoard);
  return savedBoard;
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