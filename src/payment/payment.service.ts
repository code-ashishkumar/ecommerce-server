// src/payments/payments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './schemas/payment.schema';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment.name) private readonly paymentModel: Model<Payment>) {}

  // Create a new payment
  async createPayment(orderId: string, paymentMethod: string, status: string): Promise<Payment> {
    const payment = new this.paymentModel({ order: orderId, paymentMethod, status });
    return payment.save();
  }

  // Get payments by order ID
  async getPaymentsByOrder(orderId: string): Promise<Payment[]> {
    return this.paymentModel.find({ order: orderId }).exec();
  }

  // Update payment status
  async updatePaymentStatus(paymentId: string, status: string): Promise<Payment> {
    return this.paymentModel.findByIdAndUpdate(paymentId, { status }, { new: true }).exec();
  }
}
