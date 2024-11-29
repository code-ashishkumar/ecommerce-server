import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger'; // For Swagger integration

@Schema({ timestamps: true }) // Automatically adds `createdAt` and `updatedAt` fields
export class User extends Document {
  @ApiProperty({
    description: 'Unique email address of the user',
    example: 'user@example.com',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'Password for the user account (hashed)',
    example: 'hashed_password_here',
  })
  @Prop({ required: true })
  password: string; // Hash passwords using middleware before saving

  @ApiProperty({
    description: 'Role of the user, such as user or admin',
    example: 'user',
  })
  @Prop({ required: true, enum: ['user', 'admin'], default: 'user' })
  role: string; // Restrict roles to valid values using an enum

  @ApiProperty({
    description: 'Timestamp of account creation',
    example: '2023-10-15T09:30:00Z',
  })
  @Prop({ default: Date.now })
  createdAt?: Date; // Automatically managed with `timestamps: true`

  @ApiProperty({
    description: 'Timestamp of the last update',
    example: '2023-11-20T12:00:00Z',
  })
  updatedAt?: Date; // Automatically managed with `timestamps: true`
}

export const UserSchema = SchemaFactory.createForClass(User);
