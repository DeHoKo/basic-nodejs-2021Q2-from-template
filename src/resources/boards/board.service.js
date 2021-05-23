const boardsRepo = require('./board.memory.repository');
const BoardModel = require('./board.model');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getBoardById = (boardId) => boardsRepo.getBoardById(boardId);

const createBoard = (boardData) => {
  const board = new BoardModel(boardData);

  return boardsRepo.createBoard(board);
};

const updateBoard = (boardData) => {
  // my way to add an id to columns
  const board = new BoardModel(boardData);

  return boardsRepo.updateBoard(board);
};

const deleteBoard = async (boardId) => {
  const boardTasks = await tasksService.getTasksByBoardId(boardId);

  await Promise.all(boardTasks.map((task) => tasksService.deleteTask(task.id)));

  return boardsRepo.deleteBoard(boardId);
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
};
