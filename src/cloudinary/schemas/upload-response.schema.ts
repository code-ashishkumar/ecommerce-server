import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseSchema {
  @ApiProperty({ type: 'string', description: 'Public URL of the uploaded file' })
  url: string;

  @ApiProperty({ type: 'string', description: 'Secure URL of the uploaded file' })
  secure_url: string;

  @ApiProperty({ type: 'string', description: 'Public ID of the file in Cloudinary' })
  public_id: string;

  @ApiProperty({ type: 'string', description: 'Resource type of the uploaded file (e.g., image)' })
  resource_type: string;
}
