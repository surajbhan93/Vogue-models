import { BaseRepository } from './baseRepository';
import { BookingModel, IBooking } from '../database/mongodb/models/Booking';

export class BookingRepository extends BaseRepository<IBooking> {
  constructor() {
    super(BookingModel);
  }

  async findByClient(clientId: string, page = 1, limit = 10) {
    return this.find({ client: clientId }, { page, limit, populate: ['model', 'client'] });
  }

  async findByModel(modelId: string, page = 1, limit = 10) {
    return this.find({ model: modelId }, { page, limit, populate: ['client', 'model'] });
  }
}
