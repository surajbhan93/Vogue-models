import { Schema, model, Document } from 'mongoose';

export interface IFavouriteModel extends Document {
  client: Schema.Types.ObjectId;
  model: Schema.Types.ObjectId;
  createdAt: Date;
}

const favouriteModelSchema = new Schema<IFavouriteModel>(
  {
    client: { type: Schema.Types.ObjectId, ref: 'ClientProfile', required: true, index: true },
    model: { type: Schema.Types.ObjectId, ref: 'ModelProfile', required: true, index: true },
  },
  { timestamps: true }
);

favouriteModelSchema.index({ client: 1, model: 1 }, { unique: true });

export const FavouriteModel = model<IFavouriteModel>('FavouriteModel', favouriteModelSchema);

export interface IRecentlyViewedModel extends Document {
  client: Schema.Types.ObjectId;
  model: Schema.Types.ObjectId;
  viewedAt: Date;
}

const recentlyViewedModelSchema = new Schema<IRecentlyViewedModel>(
  {
    client: { type: Schema.Types.ObjectId, ref: 'ClientProfile', required: true, index: true },
    model: { type: Schema.Types.ObjectId, ref: 'ModelProfile', required: true, index: true },
    viewedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

recentlyViewedModelSchema.index({ client: 1, model: 1 });

export const RecentlyViewedModel = model<IRecentlyViewedModel>(
  'RecentlyViewedModel',
  recentlyViewedModelSchema
);

export interface IAnalyticsEvent extends Document {
  eventName: string;
  user?: Schema.Types.ObjectId;
  pageUrl?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  createdAt: Date;
}

const analyticsEventSchema = new Schema<IAnalyticsEvent>(
  {
    eventName: { type: String, required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    pageUrl: { type: String },
    metadata: { type: Object, default: {} },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

export const AnalyticsEventModel = model<IAnalyticsEvent>('AnalyticsEvent', analyticsEventSchema);
