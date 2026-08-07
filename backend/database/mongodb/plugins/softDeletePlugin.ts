import { Schema } from 'mongoose';

export interface ISoftDelete {
  isDeleted: boolean;
  deletedAt?: Date | null;
  softDelete(): Promise<void>;
  restore(): Promise<void>;
}

export function softDeletePlugin(schema: Schema) {
  schema.add({
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
  });

  const typesArray = ['find', 'findOne', 'findOneAndUpdate', 'countDocuments'];
  typesArray.forEach((type) => {
    schema.pre(type as any, function (this: any, next) {
      if (this.getFilter().includeDeleted !== true) {
        this.where({ isDeleted: false });
      }
      delete this.getFilter().includeDeleted;
      next();
    });
  });

  schema.methods.softDelete = async function () {
    this.isDeleted = true;
    this.deletedAt = new Date();
    return this.save();
  };

  schema.methods.restore = async function () {
    this.isDeleted = false;
    this.deletedAt = null;
    return this.save();
  };
}
