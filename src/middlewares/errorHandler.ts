import { ErrorRequestHandler } from 'express';
import logger from '../utils/logger';
import { LogType } from '../types';

process
  .on('unhandledRejection', (reason) => {
    logger(`${reason}, Unhandled Rejection at Promise`, LogType.ERROR);
  })
  .on('uncaughtException', err => {
    logger(`${err}, Uncaught Exception thrown`, LogType.ERROR);
    process.exit(1);
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err: Error, _req, res, _next) => {
  logger(err.message, LogType.ERROR);
    res.sendStatus(500);
}

export default errorHandler;