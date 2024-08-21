import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/Login.dto';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { RegisterDto } from './dto/Register.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly Jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async login(payload: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!user) throw new UnauthorizedException();
    const isMatch = await compare(payload.password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    const token = this.Jwt.sign({
      id: user.id,
    });
    return { token };
  }

  async register(payload: RegisterDto) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (findUser)
      throw new HttpException('email already exist', HttpStatus.CONFLICT);
    const hashPass = await hash(payload.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        email: payload.email,
        password: hashPass,
      },
    });
    const token = this.Jwt.sign({
      id: newUser.id,
    });
    return { newUser, token };
  }
}
