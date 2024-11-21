// src/cart/schemas/cart.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Cart extends Document {
  @Prop({ type: User, required: true })
  user: User;

  @Prop({ type: [{ type: Product }] })
  products: Product[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
