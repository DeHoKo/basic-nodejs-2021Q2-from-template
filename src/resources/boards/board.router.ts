import app from 'express';
import ash from 'express-async-handler';
import * as boardsService from './board.service';

const router = app.Router();

router.route('/').get(
  ash(async (_req, res) => {
    const boards = await boardsService.getAll();

    res.json(boards);
  })
);

router.route('/:boardId').get(
  ash(async (req, res) => {
    const { boardId } = req.params as { boardId: string };
    const board = await boardsService.getBoardById(boardId);

    res.status(board ? 200 : 404).json(board);
  })
);

router.route('/').post(
  ash(async (req, res) => {
    const { body: boardData } = req;
    const createdBoard = await boardsService.createBoard(boardData);

    res.status(201).json(createdBoard);
  })
);

router.route('/:boardId').put(
  ash(async (req, res) => {
    const { body: newBoardData } = req;
  
    const updatedBoardData = await boardsService.updateBoard(newBoardData);
    res.json(updatedBoardData);
  })
);

router.route('/:boardId').delete(
  ash(async (req, res) => {
    const { boardId } = req.params as { boardId: string };

    const isDeleted = await boardsService.deleteBoard(boardId);

    res.sendStatus(isDeleted ? 204 : 404);
  })
);

export default router;
