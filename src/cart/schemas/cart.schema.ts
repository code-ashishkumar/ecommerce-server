import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) // Automatically adds `createdAt` and `updatedAt`
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // Reference to User schema
  user: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Product' }], // Array of Product references
    default: [], // Initialize as an empty array
  })
  products: Types.ObjectId[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
