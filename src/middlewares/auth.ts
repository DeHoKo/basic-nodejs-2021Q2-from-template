import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { JWT_SECRET_KEY } from '../common/config';

const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  try {
    jwt.verify(token, JWT_SECRET_KEY!);
    return next();
  } catch (e) {
    return res.sendStatus(403);
  }
};

export default authenticateToken;
