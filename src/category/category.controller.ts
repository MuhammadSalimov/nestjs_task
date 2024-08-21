import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('category')
@Controller({ version: '1', path: 'category' })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() payload: CreateCategoryDto) {
    const category = await this.categoryService.create(payload);
    return { statusCode: HttpStatus.CREATED, data: category };
  }

  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return { statusCode: HttpStatus.OK, data: categories };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const category = await this.categoryService.findOne(id);
      return { statusCode: HttpStatus.OK, data: category };
    } catch (error) {
      throw new HttpException(
        error.response || 'Category not found',
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const updatedCategory = await this.categoryService.update(
        id,
        updateCategoryDto,
      );
      return { statusCode: HttpStatus.OK, data: updatedCategory };
    } catch (error) {
      throw new HttpException(
        error.response || 'Error updating category',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const removedCategory = await this.categoryService.remove(id);
      return { statusCode: HttpStatus.OK, data: removedCategory };
    } catch (error) {
      throw new HttpException(
        error.response || 'Error deleting category',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
