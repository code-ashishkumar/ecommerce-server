// payments.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Payment, PaymentSchema } from './schemas/payment.schema';
import { OrdersModule } from '../orders/orders.module'; // Import OrdersModule
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';
import { ProductsModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    ProductsModule, // Import ProductsModule for ProductModel
    OrdersModule, // Importing the module that provides OrderModel
  ],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
