let BOARDS = [];

const getAll = async () => BOARDS;

const getBoardById = async (boardId) => BOARDS.find((board) => board.id === boardId);

const createBoard = async (board) => {
  BOARDS.push(board);

  return board;
};

const updateBoard = async (updatedBoard) => {
  const boardIndex = BOARDS.findIndex((board) => board.id === updatedBoard.id);

  BOARDS[boardIndex] = updatedBoard;

  return updatedBoard;
};

const deleteBoard = async (boardId) => {
  const boardsLength = BOARDS.length;
  BOARDS = BOARDS.filter((board) => board.id !== boardId);

  // if the item was deleted this expression is true
  return BOARDS.length < boardsLength;
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
};
