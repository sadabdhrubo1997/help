import { Request, Response } from 'express';

import QuoteModel from '../../models/quoteModel';

export const deleteSingleQuoteController = async (
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

    const deletedQuote = await QuoteModel.findByIdAndDelete(quoteId);
    res.status(200).json({
      status: 'success',
      message: 'Quote deleted successfully',
      quote: deletedQuote,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      error: error.message,
      message: 'something went wrong',
    });
  }
};
