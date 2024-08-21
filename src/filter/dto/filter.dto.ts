import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Priority, Status } from '@prisma/client';

export class FilterDto {
  @ApiProperty({
    enum: Status,
    description: 'Filter tasks by status',
    required: false,
    enumName: 'Status',
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({
    enum: Priority,
    required: false,
  })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;
}

export class byCategory {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  categoryId: string;
}
