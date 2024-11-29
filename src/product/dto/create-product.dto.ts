import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Smartphone',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'A high-quality smartphone with excellent features.',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiPropertyOptional({
    description: 'The stock quantity of the product',
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  readonly stock: number;

  @ApiPropertyOptional({
    description: 'An array of image URLs associated with the product',
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
  })
  @IsArray()
  @IsOptional()
  readonly images: string[];

  @ApiPropertyOptional({
    description: 'The ID of the category to which the product belongs',
    example: '64cb3b752cb5b2e64e5a9a7f',
    type: String, // Use type: String for ObjectId in Swagger
  })
  @IsOptional()
  readonly categoryId: Types.ObjectId;
}
