import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Work',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    example: 'Tasks related to work and office duties',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
