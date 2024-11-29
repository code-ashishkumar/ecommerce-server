import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payment/payment.module';
import { ProductsModule } from './product/product.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',
    ),
    CartModule,
    OrdersModule,
    ProductsModule,
    PaymentsModule,
    UsersModule,
    CategoryModule,
    CloudinaryModule,
  ],
})
export class AppModule {}
