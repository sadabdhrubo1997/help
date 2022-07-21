import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWTPayload } from '../../constants/interfaces';
import config from './../../config';
import AdminModel from './../../models/adminModel';
import { createJwtToken } from './../../utils/jwtService';
import { cookieOptions } from '../../utils/cookie';

export const adminIsLoggedInController = async (
  req: Request,
  res: Response
) => {
  const { token } = req.cookies;

  if (!token?.trim()) {
    return res
      .status(401)
      .json({ status: 'error', message: 'Unauthorized request' });
  }

  console.log(token);

  try {
    const { id } = <JWTPayload>jwt.verify(token, config.jwtSecret);

    let admin = await AdminModel.findById(id);

    if (!admin) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Admin not found' });
    }

    const newToken = createJwtToken(
      { email: admin.email, id: admin._id, allowLogin: true },
      '7d'
    );

    return res
      .status(200)
      .cookie('token', newToken, cookieOptions())
      .json({
        status: 'success',
        message: 'login success',
        data: { admin: { email: admin.email, _id: admin._id } },
      });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      error: error.message,
      message: 'something went wrong',
    });
  }
};
