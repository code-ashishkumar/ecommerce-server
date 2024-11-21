// src/cart/cart.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private readonly cartModel: Model<Cart>) {}

  // Add products to the cart
  async addToCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ user: userId });
    if (cart) {
      cart.products.push(productId as any);
      return cart.save();
    } else {
      const newCart = new this.cartModel({ user: userId, products: [productId] });
      return newCart.save();
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
