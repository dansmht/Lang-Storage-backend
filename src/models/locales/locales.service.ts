import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Locale } from './entities/locale.entity';
import { CreateLocaleDto } from './dto/create-locale.dto';
import { UpdateLocaleDto } from './dto/update-locale.dto';

@Injectable()
export class LocalesService {
  constructor(
    @InjectRepository(Locale) private localesRepository: Repository<Locale>,
  ) {}

  create(createLocaleDto: CreateLocaleDto) {
    const locale = this.localesRepository.create(createLocaleDto);
    return this.localesRepository.save(locale);
  }

  findAll() {
    return this.localesRepository.find();
  }

  findOne(id: number) {
    return this.localesRepository.findOne(id);
  }

  async update(id: number, updateLocaleDto: UpdateLocaleDto) {
    const locale = await this.localesRepository.findOne(id);
    locale.name = updateLocaleDto.name;
    return await this.localesRepository.save(locale);
  }

  async remove(id: number) {
    const locale = await this.localesRepository.findOne(id);
    return await this.localesRepository.remove(locale);
  }
}
