import { Request, Response } from 'express';

import QuoteModel from '../../models/quoteModel';

export const createQuoteController = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, companyName, interested } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !companyName ||
    !interested
  ) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Required field missing.' });
  }

  // validate email
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Please enter a valid email address' });
  }

  try {
    // create a quote

    const newQuote = await QuoteModel.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      companyName: companyName.trim(),
      interested: interested.trim(),
    });

    return res.status(200).json({
      status: 'success',
      message: 'Quote created successfully',
      data: { quote: newQuote },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong',
    });
  }
};
