// src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>) {}

  // Create a new order
  async createOrder(userId: string, productIds: string[], totalAmount: number): Promise<Order> {
    const order = new this.orderModel({
      user: userId,
      products: productIds,
      totalAmount,
      status: 'pending',
    });
    return order.save();
  }

  // Get orders by user ID
  async getOrdersByUser(userId: string): Promise<Order[]> {
    return this.orderModel.find({ user: userId }).populate('products').exec();
  }

  // Update order status
  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(orderId, { status }, { new: true }).exec();
  }

  // Get order by ID
  async getOrderById(orderId: string): Promise<Order> {
    return this.orderModel.findById(orderId).populate('products').exec();
  }
}
