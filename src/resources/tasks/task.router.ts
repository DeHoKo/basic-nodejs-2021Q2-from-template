import app from 'express';
import ash from 'express-async-handler';
import * as tasksService from './task.service';

const router = app.Router();

router.route('/').get(
  ash(async (_req, res) => {
    const { boardId } = res.locals;
    const tasks = await tasksService.getTasksByBoardId(boardId);

    res.json(tasks);
  })
);

router.route('/:taskId').get(
  ash(async (req, res) => {
    const { taskId } = req.params as { taskId: string };
    const task = await tasksService.getTaskById(taskId);

    res.status(task ? 200 : 404).json(task);
  })
);

router.route('/').post(
  ash(async (req, res) => {
    const { body: taskData } = req;
    const { boardId } = res.locals;

    const createdTask = await tasksService.createTask(taskData, boardId);

    res.status(201).json(createdTask);
  })
);

router.route('/:taskId').put(
  ash(async (req, res) => {
    const { body: newTaskData } = req;
    const { taskId } = req.params as { taskId: string };

    const oldTaskData = await tasksService.getTaskById(taskId);
    const taskData = { ...oldTaskData, ...newTaskData };
    const updatedTask = await tasksService.updateTask(taskData);

    res.json(updatedTask);
  })
);

router.route('/:taskId').delete(
  ash(async (req, res) => {
    const { taskId } = req.params as { taskId: string };

    const isDeleted = await tasksService.deleteTask(taskId);

    res.json(isDeleted);
  })
);

export default router;
