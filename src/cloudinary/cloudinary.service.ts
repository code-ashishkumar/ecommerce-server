import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    const uploadResults = await Promise.all(
      files.map((file) => {
        return new Promise<UploadApiResponse | UploadApiErrorResponse>(
          (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              },
            );
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
          },
        );
      }),
    );
    // Return only the URLs
    return uploadResults.map((result) => {
      if ('url' in result) {
        return result.url;
      }
      throw new Error('Failed to upload an image.');
    });
  }
}
