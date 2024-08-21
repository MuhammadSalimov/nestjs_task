import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Priority, Status } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({ example: 'Implement API endpoint' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Develop the task creation endpoint in the API' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://example.com/photo.jpg' })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({ example: '2024-08-31T00:00:00Z' })
  @IsString()
  dueDate: string;

  @ApiProperty({ enum: Priority, example: Priority.MEDIUM })
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty({ enum: Status, example: Status.TODO })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  categoryId: string;
}
