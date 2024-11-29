import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePaymentStatusDto {
  @ApiProperty({ description: 'New payment status (e.g., Completed, Failed)', type: String })
  @IsNotEmpty()
  @IsString()
  readonly status: string;
}
