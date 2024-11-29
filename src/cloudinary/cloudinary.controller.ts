import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { CloudinaryService } from './cloudinary.service';
import { UploadResponseSchema } from './schemas/upload-response.schema';

@ApiTags('cloudinary') // Swagger grouping
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post('upload')
  @ApiOperation({ summary: 'Upload files to Cloudinary' })
  @ApiConsumes('multipart/form-data') // Important: Indicates this endpoint accepts form-data
  @ApiBody({
    description: 'Upload multiple files',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' }, // Specify file input
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    type: [UploadResponseSchema],
    description: 'Files uploaded successfully',
  })
  @UseInterceptors(FilesInterceptor('files')) // Multer handles file parsing
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const uploadedImages = await this.cloudinaryService.uploadImages(files);
    return uploadedImages; // Automatically serialized for Swagger response
  }
}
