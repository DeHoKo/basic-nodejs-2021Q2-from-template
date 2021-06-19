import { RequestHandler } from 'express';
import logger from '../utils/logger';
import { LogType } from '../types';

const requestHandler: RequestHandler = (req, res, next) => {
  let queryParams = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(req.params)) {
    queryParams += `${key}: ${value} `;
  }
  logger(
    `url: ${req.url}\n query parameters: ${
      queryParams ? queryParams.trim() : 'params are empty'
    }\n body: ${req?.body ? req.body : 'body is empty'}\n status code: ${
      res.statusCode
    }\n--------------------------------------------------------`,
    LogType.REQUEST
  );
  next();
};

export default requestHandler;
