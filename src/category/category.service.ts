import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateCategoryDto) {
    return await this.prisma.category.create({ data: payload });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  async update(id: string, payload: UpdateCategoryDto) {
    await this.findOne(id);
    return await this.prisma.category.update({
      where: { id },
      data: payload,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.category.delete({ where: { id } });
  }
}
