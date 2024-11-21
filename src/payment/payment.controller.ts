// src/payments/payments.controller.ts
import { Controller, Post, Get, Param, Put, Body } from '@nestjs/common';
import { PaymentsService } from './payment.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create')
  async createPayment(@Body() createPaymentDto: { orderId: string; paymentMethod: string; status: string }) {
    return this.paymentsService.createPayment(createPaymentDto.orderId, createPaymentDto.paymentMethod, createPaymentDto.status);
  }

  @Get('order/:orderId')
  async getPaymentsByOrder(@Param('orderId') orderId: string) {
    return this.paymentsService.getPaymentsByOrder(orderId);
  }

  @Put('update/:paymentId')
  async updatePaymentStatus(@Param('paymentId') paymentId: string, @Body() status: { status: string }) {
    return this.paymentsService.updatePaymentStatus(paymentId, status.status);
  }
}
