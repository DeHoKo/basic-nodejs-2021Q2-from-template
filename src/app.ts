import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import loginRouter from './resources/login/login.router';
import requestHandler from './middlewares/requestHandler';
import errorHandler from './middlewares/errorHandler';
import authHandler from './middlewares/auth';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(requestHandler);

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use(authHandler);

app.use('/users', userRouter);
app.use(
  '/boards/:boardId/tasks',
  (req, res, next) => {
    res.locals['boardId'] = req.params['boardId'];
    next();
  },
  taskRouter
);
app.use('/boards', boardRouter);

app.use(errorHandler);

export default app;
