import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '@/config';
import { AuthenticationError } from '@/utils/errors';

export interface AuthRequest extends Request {
  user?: {
    username: string;
    type: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AuthenticationError('No token provided');
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded as { username: string; type: string };
    next();
  } catch (error) {
    next(new AuthenticationError('Invalid token'));
  }
};
