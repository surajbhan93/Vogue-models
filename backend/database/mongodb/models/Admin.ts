import { Schema, model, Document } from 'mongoose';
import { softDeletePlugin, ISoftDelete } from '../plugins/softDeletePlugin';

export interface IAdmin extends Document, ISoftDelete {
  user: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  department?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

const adminSchema = new Schema<IAdmin>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    department: { type: String, default: 'General Management' },
    avatar: { type: String },
  },
  { timestamps: true }
);

adminSchema.plugin(softDeletePlugin);

adminSchema.virtual('fullName').get(function (this: IAdmin) {
  return `${this.firstName} ${this.lastName}`;
});

export const AdminModel = model<IAdmin>('Admin', adminSchema);
