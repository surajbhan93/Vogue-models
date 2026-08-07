import { BaseRepository } from './baseRepository';
import { PaymentModel, IPayment } from '../database/mongodb/models/Payment';

export class PaymentRepository extends BaseRepository<IPayment> {
  constructor() {
    super(PaymentModel);
  }

  async findByRazorpayOrderId(orderId: string): Promise<IPayment | null> {
    return this.model.findOne({ razorpayOrderId: orderId }).exec();
  }
}
