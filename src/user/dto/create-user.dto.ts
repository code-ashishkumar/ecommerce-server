import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Define roles as an enum for better type safety
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

export class CreateUserDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'securePassword123!',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The role of the user (admin, user, moderator)',
    enum: UserRole,
    example: UserRole.USER,
  })
  @IsNotEmpty()
  @IsEnum(UserRole, {
    message: `Role must be one of the following: ${Object.values(UserRole).join(', ')}`,
  })
  role: UserRole;
}
