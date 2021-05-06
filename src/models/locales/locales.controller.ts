import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { LocalesService } from './locales.service';
import { LocaleDto } from './dto/locale.dto';

@Controller('locales')
export class LocalesController {
  constructor(private readonly localesService: LocalesService) {}

  @Post()
  create(@Body() localeDto: LocaleDto) {
    return this.localesService.create(localeDto);
  }

  @Get()
  findAll() {
    return this.localesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() localeDto: LocaleDto) {
    return this.localesService.update(+id, localeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localesService.remove(+id);
  }
}
