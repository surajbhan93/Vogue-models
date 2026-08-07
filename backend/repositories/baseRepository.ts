import { Model, Document, FilterQuery, UpdateQuery, QueryOptions, ClientSession } from 'mongoose';

export class BaseRepository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>, session?: ClientSession): Promise<T> {
    const docs = await this.model.create([data], { session });
    return docs[0];
  }

  async findById(id: string, populate?: string | any): Promise<T | null> {
    const query = this.model.findById(id);
    if (populate) query.populate(populate);
    return query.exec();
  }

  async findOne(filter: FilterQuery<T>, populate?: string | any): Promise<T | null> {
    const query = this.model.findOne(filter);
    if (populate) query.populate(populate);
    return query.exec();
  }

  async find(
    filter: FilterQuery<T> = {},
    options: {
      page?: number;
      limit?: number;
      sort?: any;
      populate?: string | any;
    } = {}
  ): Promise<{ data: T[]; total: number; page: number; totalPages: number }> {
    const page = Math.max(1, options.page || 1);
    const limit = Math.max(1, options.limit || 10);
    const skip = (page - 1) * limit;

    const query = this.model.find(filter).sort(options.sort || { createdAt: -1 }).skip(skip).limit(limit);
    if (options.populate) query.populate(options.populate);

    const [data, total] = await Promise.all([
      query.exec(),
      this.model.countDocuments(filter),
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateById(
    id: string,
    update: UpdateQuery<T>,
    options: QueryOptions = { new: true },
    session?: ClientSession
  ): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { ...options, session }).exec();
  }

  async softDelete(id: string): Promise<boolean> {
    const doc: any = await this.model.findById(id);
    if (!doc || typeof doc.softDelete !== 'function') return false;
    await doc.softDelete();
    return true;
  }
}
