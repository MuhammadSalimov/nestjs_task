import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/Register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: LoginDto) {
    const data = await this.authService.login(payload);
    return data;
  }

  @Post('register')
  async register(@Body() payload: RegisterDto) {
    const data = await this.authService.register(payload);
    return data;
  }
}
