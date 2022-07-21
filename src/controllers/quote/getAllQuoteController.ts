import { Request, Response } from 'express';
import QuoteModel from '../../models/quoteModel';

export const getAllQuoteController = async (req: Request, res: Response) => {
  try {
    const { markAs, limit = 10, skip = 0 } = req.query;

    const markStatus = markAs === 'read' ? true : false;

    const count = await QuoteModel.find({ markAsRead: markStatus })
      .limit(Number(limit))
      .skip(Number(skip))
      .count();
      
    const data = await QuoteModel.find({ markAsRead: markStatus })
      .select('-markAsRead -__v')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(skip));

    res.json({
      status: 'Success',
      data: { count, quotes: data },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      error: error.message,
      message: 'something went wrong',
    });
  }
};
