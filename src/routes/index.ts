import { Request, Response, Router } from 'express';
// import bcrypt from 'bcrypt';

import adminRoutes from './adminRoutes';
import quoteRoutes from './quoteRoutes';
// import AdminModel from './../models/adminModel';

const router = Router();

router.use(adminRoutes);
router.use(quoteRoutes);

// router.post('/admin/dev/registration', async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   try {
//     // check for all the required fields
//     if (!email?.trim() || !password) {
//       return res.status(400).json({
//         status: 'error',
//         message: 'Please fill all the required fields',
//       });
//     }

//     // validate email
//     if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
//       return res.status(400).json({
//         status: 'error',
//         message: 'Please enter a valid email address',
//       });
//     }

//     // validate password
//     if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
//       return res.status(400).json({
//         status: 'error',
//         message:
//           'Password should have minimum eight characters, at least one letter and one number',
//       });
//     }

//     // hash password
//     const salt = await bcrypt.genSalt(12);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const admin = await AdminModel.create({
//       email: email,
//       password: hashedPassword,
//     });

//     res.status(200).json({ user: { email: admin.email } });
//   } catch (error: any) {
//     return res.status(500).json({
//       status: 'error',
//       message: error.message || 'Something went wrong',
//     });
//   }
// });

export default router;
