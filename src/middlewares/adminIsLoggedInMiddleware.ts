import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';
import { JWTPayload } from '../constants/interfaces';

export const adminIsLoggedInMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token?.trim()) {
    return res
      .status(401)
      .json({ status: 'error', message: 'Unauthorized request' });
  }

  try {
    const { role, id, email, allowLogin } = <JWTPayload>(
      jwt.verify(token, config.jwtSecret)
    );

    if (!allowLogin) {
      return res
        .status(401)
        .json({ status: 'error', message: 'Unauthorized request' });
    }


    next();
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong',
    });
  }
};
