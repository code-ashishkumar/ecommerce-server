import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ description: 'Order ID for the payment', type: String })
  @IsNotEmpty()
  @IsString()
  readonly orderId: string;

  @ApiProperty({
    description: 'Payment method (e.g., Credit Card, PayPal)',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly paymentMethod: string;

  @ApiProperty({
    description: 'Payment status (e.g., Pending, Completed)',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @ApiProperty({
    description: 'List of product IDs being paid for',
    type: [String],
  })
  @IsArray()
  @IsNotEmpty()
  readonly productIds: string[];
}
