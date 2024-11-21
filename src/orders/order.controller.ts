// src/orders/orders.controller.ts
import { Controller, Post, Get, Param, Body, Put } from '@nestjs/common';
import { OrdersService } from './order.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  async createOrder(@Body() createOrderDto: { userId: string; productIds: string[]; totalAmount: number }) {
    return this.ordersService.createOrder(createOrderDto.userId, createOrderDto.productIds, createOrderDto.totalAmount);
  }

  @Get('user/:userId')
  async getOrdersByUser(@Param('userId') userId: string) {
    return this.ordersService.getOrdersByUser(userId);
  }

  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: string) {
    return this.ordersService.getOrderById(orderId);
  }

  @Put('update/:orderId')
  async updateOrderStatus(@Param('orderId') orderId: string, @Body() status: { status: string }) {
    return this.ordersService.updateOrderStatus(orderId, status.status);
  }
}
