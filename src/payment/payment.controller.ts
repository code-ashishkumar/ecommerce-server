import { Controller, Post, Get, Param, Put, Body } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { CreatePaymentDto } from './dto/payment.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment.dto';


@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Get('order/:orderId')
  async getPaymentsByOrder(@Param('orderId') orderId: string) {
    return this.paymentsService.getPaymentsByOrder(orderId);
  }

  @Put('update/:paymentId')
  async updatePaymentStatus(
    @Param('paymentId') paymentId: string,
    @Body() updatePaymentStatusDto: UpdatePaymentStatusDto
  ) {
    return this.paymentsService.updatePaymentStatus(paymentId, updatePaymentStatusDto);
  }
}
