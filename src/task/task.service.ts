import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(pyload: CreateTaskDto, userId: string) {
    const findCategory = await this.prisma.category.findUnique({
      where: { id: pyload.categoryId },
    });
    if (!findCategory) throw new NotFoundException(`CategoryId not found`);
    return await this.prisma.task.create({
      data: {
        ...pyload,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    if (task.userId !== userId)
      throw new HttpException(
        'Bu task sizga tegishli emas',
        HttpStatus.BAD_REQUEST,
      );
    return task;
  }

  async update(id: string, pyload: UpdateTaskDto, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.userId !== userId)
      throw new HttpException(
        "Sizga tegishli bo'lmagan taskni o'zgartira olmaysiz",
        HttpStatus.BAD_REQUEST,
      );
    const findCategory = await this.prisma.category.findUnique({
      where: { id: pyload.categoryId },
    });
    if (!findCategory) throw new NotFoundException(`categoryId not found`);

    return await this.prisma.task.update({
      where: { id },
      data: pyload,
    });
  }

  async remove(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    if (task.userId !== userId)
      throw new HttpException(
        "sizga tegishli bo'lmagan taskni o'chira olmaysiz",
        HttpStatus.BAD_REQUEST,
      );
    return await this.prisma.task.delete({
      where: { id },
    });
  }
}
