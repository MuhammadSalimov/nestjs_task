import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'example@gamil.com' })
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
