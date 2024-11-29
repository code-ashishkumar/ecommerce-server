import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryController } from './cloudinary.controller'; // Add CloudinaryController
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([]), // Add models here if required for Cloudinary-related persistence
  ],
  controllers: [CloudinaryController], // Correct controller reference
  providers: [CloudinaryService],
  exports: [CloudinaryService], // Export for use in other modules
})
export class CloudinaryModule {}
