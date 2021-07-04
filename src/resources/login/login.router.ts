import app from 'express';
import ash from 'express-async-handler';
import * as loginService from './login.service';

const router = app.Router();

router.route('/').post(
  ash(async (req, res) => {
    const {
      body: { login, password },
    } = req;

    const token = await loginService.loginUser(login, password);
    if (token) {
      return res.json({ token });
    }

    return res.sendStatus(403);
  })
);

export default router;
