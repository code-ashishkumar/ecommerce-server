import { IsNotEmpty, IsNumber, IsOptional, IsString, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsNumber()
  readonly stock: number;

  @IsArray()
  @IsOptional()
  readonly images: string[];

  @IsOptional()
  readonly categoryId: Types.ObjectId;
}
