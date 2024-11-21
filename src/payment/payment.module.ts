// src/payments/payments.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';
import { Payment, PaymentSchema } from './schemas/payment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }])],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
