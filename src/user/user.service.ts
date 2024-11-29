import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Register a new user
  async register(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { email, password, role } = createUserDto;

    // Check if the user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    // Return non-sensitive user data
    return {
      id: savedUser._id,
      email: savedUser.email,
      role: savedUser.role,
    };
  }

  // Login a user and return a JWT token
  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;

    // Find the user by email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create and sign the JWT token
    const payload = { email: user.email, role: user.role, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // Get user by email
  async findByEmail(email: string): Promise<Partial<User>> {
    const user = await this.userModel.findOne({ email }).select('-password');
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}
