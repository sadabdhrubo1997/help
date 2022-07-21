import { Request, Response } from 'express';
import QuoteModel from '../../models/quoteModel';

export const quoteMarkAsUnreadController = async (
  req: Request,
  res: Response
) => {
  const { quoteId } = req.params;
  try {
    let isQuoteExists;

    isQuoteExists = await QuoteModel.findById(quoteId);

    if (!isQuoteExists) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Quote not found' });
    }

    const updatedQuote = await QuoteModel.findByIdAndUpdate(
      quoteId,
      { markAsRead: false },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      message: 'Quote marked as unread successfully',
      quote: updatedQuote,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong',
    });
  }
};
