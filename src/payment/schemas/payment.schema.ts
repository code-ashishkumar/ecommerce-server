import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../orders/schemas/order.schema';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

@Schema({ timestamps: true }) // Automatically includes `createdAt` and `updatedAt`
export class Payment extends Document {
  @ApiProperty({ type: String, description: 'The ID of the associated order' })
  @Prop({ type: Types.ObjectId, ref: Order.name, required: true })
  order: Types.ObjectId;

  @ApiProperty({
    type: [String],
    description: 'List of product IDs associated with the payment',
  })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], required: true })
  products: Types.ObjectId[];

  @ApiProperty({
    type: String,
    description: 'The method of payment (e.g., Credit Card, PayPal)',
  })
  @Prop({ required: true })
  paymentMethod: string;

  @ApiProperty({
    type: Number,
    description: 'Total amount of the payment',
  })
  @Prop({ required: true })
  totalAmount: number;

  @ApiProperty({
    type: String,
    description: 'Currency of the payment (e.g., USD, EUR)',
  })
  @Prop({ required: true })
  currency: string;

  @ApiProperty({
    type: String,
    enum: PaymentStatus,
    description: 'Status of the payment',
  })
  @Prop({ type: String, enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @ApiProperty({
    type: String,
    description: 'User who created the payment',
    required: false,
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  createdBy: Types.ObjectId;

  @ApiProperty({
    type: String,
    description: 'User who last updated the payment',
    required: false,
  })
  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  updatedBy: Types.ObjectId;

  @ApiProperty({
    type: Object,
    description: 'Additional metadata for the payment (e.g., transaction ID)',
    required: false,
  })
  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
