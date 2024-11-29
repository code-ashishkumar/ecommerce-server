import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Payment } from './schemas/payment.schema';
import { Order } from '../orders/schemas/order.schema';
import { Product } from '../product/schemas/product.schema';
import { CreatePaymentDto } from './dto/payment.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  // Create a new payment
  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { orderId, paymentMethod, status, productIds } = createPaymentDto;

    // Verify order exists
    const order = await this.orderModel.findById(orderId).exec();
    if (!order)
      throw new NotFoundException(`Order with ID: ${orderId} not found`);

    // Verify products exist
    const products = await this.productModel
      .find({ _id: { $in: productIds } })
      .exec();
    if (products.length !== productIds.length) {
      throw new NotFoundException(`Some products in the list were not found`);
    }

    // Create payment
    const payment = new this.paymentModel({
      order: new Types.ObjectId(orderId),
      products: productIds.map((id) => new Types.ObjectId(id)),
      paymentMethod,
      status,
    });

    return payment.save();
  }

  // Get payments by order ID
  async getPaymentsByOrder(orderId: string): Promise<Payment[]> {
    const payments = await this.paymentModel
      .find({ order: orderId })
      .populate('products') // Populate product details
      .exec();

    if (!payments || payments.length === 0) {
      throw new NotFoundException(`No payments found for order ID: ${orderId}`);
    }

    return payments;
  }

  // Update payment status
  async updatePaymentStatus(
    paymentId: string,
    updatePaymentStatusDto: UpdatePaymentStatusDto,
  ): Promise<Payment> {
    const { status } = updatePaymentStatusDto;
    const updatedPayment = await this.paymentModel
      .findByIdAndUpdate(paymentId, { status }, { new: true })
      .exec();

    if (!updatedPayment) {
      throw new NotFoundException(`Payment with ID: ${paymentId} not found`);
    }

    return updatedPayment;
  }
}
