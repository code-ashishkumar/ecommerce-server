// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: any): Promise<Product> {
    // Create the new product with the uploaded image URL
    const newProduct = new this.productModel({
      ...createProductDto,
    });
    return newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: any): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    return this.productModel.find({ categoryId }).exec();
  }

  async findNewArrivals(limit = 10): Promise<Product[]> {
    return this.productModel.find().sort({ createdAt: -1 }).limit(limit).exec();
  }
}
