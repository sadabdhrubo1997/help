import { Schema, model, Document, Model } from 'mongoose';

interface IAdminModel extends Document {
  email: string;
  password: string;
  updatedAt: Date;
  createdAt: Date;
  resetPasswordCode: string;
}

const AdminSchema = new Schema<IAdminModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: [50, 'Email can not be more than 50 characters'],
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    resetPasswordCode: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const AdminModel: Model<IAdminModel> = model<IAdminModel>(
  'Admin',
  AdminSchema
);

export default AdminModel;
