let BOARDS = [];

/**
 * Returns all boards
 * @returns {Promise<Array>} Promise represents array of boards
 */
export const getAll = async () => BOARDS;

/**
 * Returns a board by Id
 * @param {string} boardId Id of the desired board
 * @returns {Promise<Object>} Promise represents the board by given Id
 */
export const getBoardById = async (boardId) => BOARDS.find((board) => board.id === boardId);

/**
 * Creates a board
 * @param {Object} board Object with information about a board
 * @returns {Promise<Object>} Promise represents the created board
 */
export const createBoard = async (board) => {
  BOARDS.push(board);

  return board;
};

/**
 * Updates a board
 * @param {Object} updatedBoard Object with information about a board
 * @returns {Promise<Object>} Promise represents the updated board
 */
export const updateBoard = async (updatedBoard) => {
  const boardIndex = BOARDS.findIndex((board) => board.id === updatedBoard.id);

  BOARDS[boardIndex] = updatedBoard;

  return updatedBoard;
};

/**
 * Deletes a board
 * @param {string} boardId Id of the board that you want to delete
 * @returns {Promise<boolean>} Promise represents the result of the deletion process
 */
export const deleteBoard = async (boardId) => {
  const boardsLength = BOARDS.length;
  BOARDS = BOARDS.filter((board) => board.id !== boardId);

  // if the item was deleted this expression is true
  return BOARDS.length < boardsLength;
};