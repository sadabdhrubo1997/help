import { Router } from 'express';

// import QuoteModel from '../models/quoteModel';

import { createQuoteController } from '../controllers/quote/createQuoteController';
import { getAllQuoteController } from '../controllers/quote/getAllQuoteController';
import { quoteMarkAsReadController } from '../controllers/quote/quoteMarkAsReadController';
import { quoteMarkAsUnreadController } from '../controllers/quote/quoteMarkAsUnreadController';
import { deleteSingleQuoteController } from '../controllers/quote/deleteSingleQuoteController';
import { adminIsLoggedInMiddleware } from '../middlewares/adminIsLoggedInMiddleware';

const router = Router();

router.post('/quote/create', createQuoteController);
router.get('/quote/all', adminIsLoggedInMiddleware, getAllQuoteController);
router.put(
  '/quote/markAsRead/:quoteId',
  adminIsLoggedInMiddleware,
  quoteMarkAsReadController
);
router.put(
  '/quote/markAsUnread/:quoteId',
  adminIsLoggedInMiddleware,
  quoteMarkAsUnreadController
);
router.delete(
  '/quote/delete/:quoteId',
  adminIsLoggedInMiddleware,
  deleteSingleQuoteController
);

// router.get('/quote/test', async (req: any, res: any) => {
//   try {
//     const { limit = 10, skip = 0 } = req.query;

//     const count = await QuoteModel.find({ markAsRead: false }).count();
//     const data = await QuoteModel.find({ markAsRead: false })
//       .select('-markAsRead -__v')
//       .sort({ createdAt: -1 })
//       .limit(Number(limit))
//       .skip(Number(skip));

//     res.json({
//       status: 'Success',
//       data: { count, quotes: data },
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       status: 'error',
//       error: error.message,
//       message: 'something went wrong',
//     });
//   }
// });

export default router;
