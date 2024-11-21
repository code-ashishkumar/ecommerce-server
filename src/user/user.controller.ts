import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Register a new user
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  // Login and return a JWT token
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }
  
  // Get user by email (can be used for profile)
  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
