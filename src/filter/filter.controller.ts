import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FilterService } from './filter.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { byCategory, FilterDto } from './dto/filter.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('filter')
@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get('bystatus')
  async statusBy(@Query() pyload: FilterDto) {
    return await this.filterService.statusBy(pyload);
  }

  @Get('bycategory')
  async byCategory(@Query() pyload: byCategory) {
    return await this.filterService.byCategory(pyload);
  }
}
