import { Injectable } from '@nestjs/common';
import { byCategory, FilterDto } from './dto/filter.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilterService {
  constructor(private readonly prisma: PrismaService) {}
  async statusBy(pyload: FilterDto) {
    const filtered = await this.prisma.task.findMany({
      where: {
        ...pyload,
      },
    });
    return filtered;
  }

  async byCategory(pyload: byCategory) {
    const filtered = await this.prisma.task.findMany({
      where: {
        categoryId: pyload.categoryId,
      },
    });
    return filtered;
  }
}
