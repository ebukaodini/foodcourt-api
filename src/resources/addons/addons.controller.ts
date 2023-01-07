import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AddonsService } from './addons.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Role } from '../../auth/enums/role.enum';
import RolesGuard from '../../auth/guards/roles.guard';

@Controller('brands/:brandId/addons')
@UseGuards(RolesGuard([Role.Admin]))
@UseGuards(JwtAuthGuard)
export class AddonsController {
  constructor(private readonly addonsService: AddonsService) {}

  @Post()
  create(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body() createAddonDto: CreateAddonDto,
  ) {
    return this.addonsService.create(brandId, createAddonDto);
  }

  @Get()
  findAll(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.addonsService.findAll(brandId);
  }

  @Get(':addonId')
  findOne(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Param('addonId', ParseIntPipe) addonId: number,
  ) {
    return this.addonsService.findOne(brandId, addonId);
  }

  @Patch(':addonId')
  update(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Param('addonId', ParseIntPipe) addonId: number,
    @Body() updateAddonDto: UpdateAddonDto,
  ) {
    return this.addonsService.update(brandId, addonId, updateAddonDto);
  }

  @Delete(':addonId')
  remove(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Param('addonId') addonId: number,
  ) {
    return this.addonsService.remove(brandId, addonId);
  }
}
