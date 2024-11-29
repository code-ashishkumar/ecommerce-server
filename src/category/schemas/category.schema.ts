// src/categories/schemas/category.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  // Name of the category, required and unique
  @Prop({ required: true, unique: true })
  name: string;

  // Description of the category
  @Prop()
  description: string;

  // Optional image URL for the category
  @Prop()
  imageUrl?: string; // Optional: To display category images
}

// This creates the schema that can be used for operations
export const CategorySchema = SchemaFactory.createForClass(Category);
