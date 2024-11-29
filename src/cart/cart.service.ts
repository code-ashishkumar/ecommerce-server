// src/cart/cart.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './schemas/cart.schema';
import { AddToCartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
  ) {}

  // Add products to the cart
  async addToCart(createCartDto: AddToCartDto): Promise<Cart> {
    const { userId, products } = createCartDto;

    // Convert product IDs to ObjectId
    const productIds = products.map(
      (productId) => new Types.ObjectId(productId),
    );

    // Check if the cart already exists for the user
    const existingCart = await this.cartModel.findOne({ user: userId });

    if (existingCart) {
      // Add new product IDs, avoiding duplicates
      productIds.forEach((id) => {
        if (!existingCart.products.includes(id)) {
          existingCart.products.push(id);
        }
      });
      await existingCart.save();
      return this.getCart(userId); // Return cart with populated products
    } else {
      // Create a new cart
      const newCart = new this.cartModel({
        user: new Types.ObjectId(userId), // Ensure userId is also an ObjectId
        products: productIds,
      });
      await newCart.save();
      return this.getCart(userId); // Return cart with populated products
    }
  }

  // View cart
  async getCart(userId: string): Promise<Cart> {
    return this.cartModel.findOne({ user: userId }).populate('products').exec();
  }

  // Remove product from the cart
  async removeFromCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ user: userId });
    if (cart) {
      cart.products = cart.products.filter((id) => id.toString() !== productId);
      return cart.save();
    }
    return null;
  }

  // Clear the cart
  async clearCart(userId: string): Promise<void> {
    await this.cartModel.deleteOne({ user: userId }).exec();
  }
}
