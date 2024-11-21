import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'yourSecretKey', // Use environment variable for production
      signOptions: { expiresIn: '1h' },
    }),
    
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
