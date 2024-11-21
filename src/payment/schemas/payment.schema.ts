// src/payments/schemas/payment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Order } from '../../orders/schemas/order.schema';

@Schema()
export class Payment extends Document {
  @Prop({ type: Order, required: true })
  order: Order;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
