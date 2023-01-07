import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AddonCategoriesService } from './addon-categories.service';
import { CreateAddonCategoryDto } from './dto/create-addon-category.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Role } from '../../auth/enums/role.enum';
import RolesGuard from '../../auth/guards/roles.guard';

@Controller('brands/:brandId/addon-categories')
@UseGuards(RolesGuard([Role.Admin]))
@UseGuards(JwtAuthGuard)
export class AddonCategoriesController {
  constructor(
    private readonly addonsCategoriesService: AddonCategoriesService,
  ) {}

  @Post()
  create(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body() createAddonCategoryDto: CreateAddonCategoryDto,
  ) {
    return this.addonsCategoriesService.create(brandId, createAddonCategoryDto);
  }
}
