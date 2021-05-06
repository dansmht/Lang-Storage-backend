import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Locale } from './entities/locale.entity';
import { LocaleDto } from './dto/locale.dto';

@Injectable()
export class LocalesService {
  constructor(
    @InjectRepository(Locale) private localesRepository: Repository<Locale>,
  ) {}

  create(localeDto: LocaleDto) {
    const locale = this.localesRepository.create(localeDto);
    return this.localesRepository.save(locale);
  }

  findAll() {
    return this.localesRepository.find();
  }

  findOne(id: number) {
    return this.localesRepository.findOne(id);
  }

  findOneByName(name: string) {
    return this.localesRepository.findOne({ name });
  }

  async update(id: number, localeDto: LocaleDto) {
    const locale = await this.localesRepository.findOne(id);
    locale.name = localeDto.name;
    return await this.localesRepository.save(locale);
  }

  async remove(id: number) {
    const locale = await this.localesRepository.findOne(id);
    return await this.localesRepository.remove(locale);
  }
}
