// src/cart/cart.controller.ts
import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/cart.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // @Post('add/:userId/:productId')
  // async addToCart(@Param('userId') userId: string, @Param('productId') productId: string) {
  //   return this.cartService.addToCart(userId, productId);
  // }

  @Post('add/')
  async addToCart(@Body() createCartDto: AddToCartDto) {
    return this.cartService.addToCart(createCartDto);
  }

  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Delete('remove/:userId/:productId')
  async removeFromCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeFromCart(userId, productId);
  }

  @Delete('clear/:userId')
  async clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }
}
