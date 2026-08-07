import { BaseRepository } from './baseRepository';
import { ModelProfileModel, IModelProfile } from '../database/mongodb/models/ModelProfile';

export class ModelRepository extends BaseRepository<IModelProfile> {
  constructor() {
    super(ModelProfileModel);
  }

  async searchModels(filters: {
    gender?: string;
    city?: string;
    category?: string;
    isFeatured?: boolean;
    query?: string;
    page?: number;
    limit?: number;
  }) {
    const queryFilter: any = { isApproved: true };

    if (filters.gender) queryFilter.gender = filters.gender;
    if (filters.city) queryFilter.city = new RegExp(filters.city, 'i');
    if (filters.category) queryFilter.categories = filters.category;
    if (filters.isFeatured !== undefined) queryFilter.isFeatured = filters.isFeatured;
    if (filters.query) {
      queryFilter.$text = { $search: filters.query };
    }

    return this.find(queryFilter, {
      page: filters.page,
      limit: filters.limit,
      populate: ['categories', 'user'],
    });
  }
}
