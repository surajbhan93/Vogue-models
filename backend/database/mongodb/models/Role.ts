import { Schema, model, Document, Model } from 'mongoose';
import { softDeletePlugin, ISoftDelete } from '../plugins/softDeletePlugin';

export interface IPermission extends Document, ISoftDelete {
  action: string;
  resource: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const permissionSchema = new Schema<IPermission>(
  {
    action: { type: String, required: true },
    resource: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

permissionSchema.index({ action: 1, resource: 1 }, { unique: true });
permissionSchema.plugin(softDeletePlugin);

export const PermissionModel = model<IPermission>('Permission', permissionSchema);

export interface IRole extends Document, ISoftDelete {
  name: 'SUPER_ADMIN' | 'ADMIN' | 'MODEL' | 'CLIENT' | 'GUEST';
  description?: string;
  permissions: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ['SUPER_ADMIN', 'ADMIN', 'MODEL', 'CLIENT', 'GUEST'],
    },
    description: { type: String },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
  },
  { timestamps: true }
);

roleSchema.plugin(softDeletePlugin);

export const RoleModel = model<IRole>('Role', roleSchema);
