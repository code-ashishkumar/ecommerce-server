// src/orders/schemas/order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/user/schemas/user.schema';


@Schema()
export class Order extends Document {
  @Prop({ type: User })
  user: User;

  @Prop({ type: [Product] })
  products: Product[];

  @Prop()
  totalAmount: number;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
