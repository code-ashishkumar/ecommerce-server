// src/orders/orders.service.ts
import { Body, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { user, products, totalAmount } = createOrderDto;

    // Create the order document
    const order = new this.orderModel({
      user,
      products,
      totalAmount,
      status: 'pending', // default status
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save the order in the database
    return order.save();
  }
  // Get orders by user ID
  async getOrdersByUser(userId: string): Promise<Order[]> {
    return this.orderModel.find({ user: userId }).populate('products').exec();
  }

  // Update order status
  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    return this.orderModel
      .findByIdAndUpdate(orderId, { status }, { new: true })
      .exec();
  }

  // Get order by ID
  async getOrderById(orderId: string): Promise<Order> {
    return this.orderModel.findById(orderId).populate('products').exec();
  }
}
