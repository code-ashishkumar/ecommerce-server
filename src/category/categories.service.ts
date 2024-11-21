// src/categories/categories.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { CategoryModule } from './category.module';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async createCategory(category: CreateCategoryDto): Promise<any> {
    console.log(category)
    return new this.categoryModel({
      name : category.name,
      description : category.description,
      imageUrl : category.imageUrl,
    }).save();
  }

  // Get all categories
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  // Get a single category by ID
  async findById(categoryId: string): Promise<Category> {
    return this.categoryModel.findById(categoryId).exec();
  }
}
