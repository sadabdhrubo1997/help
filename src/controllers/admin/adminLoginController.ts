import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import AdminModel from './../../models/adminModel';
import { createJwtToken } from './../../utils/jwtService';
import { cookieOptions } from '../../utils/cookie';

export const adminLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Please fill all the required fields',
    });
  }

  // validate email
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.status(400).json({
      status: 'error',
      message: 'Please enter a valid email address',
    });
  }

  // validate password
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    return res.status(400).json({
      status: 'error',
      message:
        'Password should have minimum eight characters, at least one letter and one number',
    });
  }

  try {
    const admin = await AdminModel.findOne({ email: email.trim() })
      .select('+password')
      .lean();

    if (!admin) {
      return res
        .status(404)
        .json({ status: 'error', message: "Email doesn't exists" });
    }

    const { password: hashedPassword, ...adminDataWithoutPassword } = admin;

    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid credentials' });
    }

    const token = createJwtToken(
      { email, id: admin._id, allowLogin: true },
      '7d'
    );

    return res
      .status(200)
      .cookie('token', token, cookieOptions())
      .json({
        status: 'success',
        message: 'Login successful',
        data: { admin: adminDataWithoutPassword },
      });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      error: error.message,
      message: 'something went wrong',
    });
  }
};
