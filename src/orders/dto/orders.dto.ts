// src/orders/dto/create-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/user/schemas/user.schema';

// Enum for order status
export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export class CreateOrderDto {
  @ApiProperty({ type: User, description: 'The user who placed the order' })
  user: User;

  @ApiProperty({
    type: [Product],
    description: 'List of products in the order',
  })
  @IsArray()
  products: Product[];

  @ApiProperty({ type: Number, description: 'Total amount of the order' })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    enum: OrderStatus,
    description: 'Current status of the order',
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({
    type: String,
    description: 'Timestamp when the order was created',
    default: new Date(),
  })
  @IsDateString()
  createdAt: string;

  @ApiProperty({
    type: String,
    description: 'Timestamp when the order was last updated',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
