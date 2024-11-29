import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';

export class UploadFilesDto {
  @ApiProperty({
    description: 'Array of image files to upload',
    type: [Object],
    isArray: true,
  })
  @IsArray()
  @IsNotEmpty()
  @Type(() => Object)
  files: Express.Multer.File[];

  @ApiProperty({
    description: 'Optional description for the product',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
