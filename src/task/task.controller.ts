import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() pyload: CreateTaskDto, @Req() req: Request) {
    const userId = req.user?.id || ' ';
    return this.taskService.create(pyload, userId);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return this.taskService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    try {
      return await this.taskService.findOne(id, req.user.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Unexpected error');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request,
  ) {
    try {
      const userId = req.user?.id;
      return await this.taskService.update(id, updateTaskDto, userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Unexpected error');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    try {
      return await this.taskService.remove(id, req.user.id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error('Unexpected error');
    }
  }
}
