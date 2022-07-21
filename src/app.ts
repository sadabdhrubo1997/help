import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import AdminModel from './models/adminModel';
import router from './routes';
import { corsOptions } from './utils/cors';

// initialize express app
const app = express();

// initialize necessary middleware's
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan('dev'));

// testing endpoint
app.get('/up', async (req, res) => {
  res.status(200).send(`<h1>Ripify testing server up and running!</h1>`);
});

app.get('/create-admin', async (req, res, next) => {
  try {
    const admin = await AdminModel.create({
      email: 'admin@admin.com',
      password: '123456789',
    });
    res.status(200).json({
      status: 'success',
      message: 'login successful',
      data: {
        user: admin,
      },
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
});

app.get('/get-admin', async (req, res, next) => {
  try {
    const user = await AdminModel.findOne({ email: 'admin@admins.com' })
      .select({
        password: 1,
        _id: 1,
        email: 1,
      })
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json({
      status: 'success',
      data: {
        user: user,
      },
    });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
});

app.use('/api', router);

// export app
export default app;
