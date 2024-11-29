import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({
    description: 'ID of the user',
    type: String,
    example: '64cb3b752cb5b2e64e5a9a7f',
  })
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @ApiProperty({
    description: 'Array of product IDs to add to the cart',
    type: [String],
    example: ['64cb3b752cb5b2e64e5a9a7f', '64cb3b752cb5b2e64e5a9b8f'],
  })
  @IsArray()
  @IsMongoId({ each: true }) // Ensures each item in the array is a valid MongoDB ObjectId
  products: string[];
}
