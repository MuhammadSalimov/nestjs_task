import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { TaskModule } from './task/task.module';
import { FilterModule } from './filter/filter.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/img'),
    }),
    JwtModule.register({ global: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UploadModule,
    CategoryModule,
    TaskModule,
    FilterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
