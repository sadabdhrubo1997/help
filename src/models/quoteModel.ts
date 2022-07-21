import { Schema, model, Document, Model } from 'mongoose';

interface QuoteModel extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  interested: string;
  markAsRead: boolean;
  updatedAt: Date;
  createdAt: Date;
}

const AdminSchema = new Schema<QuoteModel>(
  {
    firstName: {
      type: String,
      require: true,
      maxlength: [15, 'First name can not be more than 15 characters'],
    },
    lastName: {
      type: String,
      require: true,
      maxlength: [15, 'Last name can not be more than 15 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: false,
      maxlength: [50, 'Email can not be more than 50 characters'],
    },
    phone: {
      type: String,
      required: true,
      maxLength: [30, 'Phone number can not be more than 30 characters'],
    },
    companyName: {
      type: String,
      required: true,
      maxLength: [50, 'Company Name can not be more than 50 characters'],
    },
    interested: {
      type: String,
      required: true,
      maxLength: [1000, 'Interested text can not be more than 1000 characters'],
    },
    markAsRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const QuoteModel: Model<QuoteModel> = model<QuoteModel>('Quote', AdminSchema);

export default QuoteModel;
