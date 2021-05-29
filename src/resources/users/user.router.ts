import app from 'express';
import ash from 'express-async-handler';
import User from './user.model';
import * as usersService from './user.service';

const router = app.Router();

router.route('/').get(ash(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
}));

router.route('/:userId').get(
  ash(async (req, res) => {
    const { userId } = req.params;
    const user = await usersService.getUserById(userId);

    res.status(user ? 200 : 404).json(User.toResponse(user));
  })
);

router.route('/').post(
  ash(async (req, res) => {
    const { body: userData } = req;

    const createdUser = await usersService.createUser(userData);

    res.status(201).json(User.toResponse(createdUser));
  })
);

router.route('/:userId').put(
  ash(async (req, res) => {
    const { body: newUserData } = req;
    const { userId } = req.params;

    const oldUserData = await usersService.getUserById(userId);
    const userData = { ...oldUserData, ...newUserData };
    const updatedUserData = await usersService.updateUser(userData);

    res.json(User.toResponse(updatedUserData));
  })
);

router.route('/:userId').delete(
  ash(async (req, res) => {
    const { userId } = req.params;

    const isDeleted = await usersService.deleteUser(userId);

    res.json(isDeleted);
  })
);

export default router;
