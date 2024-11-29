// src/orders/schemas/order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/user/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';  // Import ApiProperty

@Schema()
export class Order extends Document {
  @ApiProperty({ type: User, description: 'The user who placed the order' })
  @Prop({ type: User })
  user: User;

  @ApiProperty({ type: [Product], description: 'List of products in the order' })
  @Prop({ type: [Product] })
  products: Product[];

  @ApiProperty({ type: Number, description: 'Total amount of the order' })
  @Prop()
  totalAmount: number;

  @ApiProperty({ type: String, default: 'pending', description: 'Current status of the order' })
  @Prop({ default: 'pending' })
  status: string;

  @ApiProperty({ type: String, description: 'Timestamp when the order was created' })
  @Prop({ default: Date.now })
  createdAt: Date;

  @ApiProperty({ type: String, description: 'Timestamp when the order was last updated', required: false })
  @Prop()
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
