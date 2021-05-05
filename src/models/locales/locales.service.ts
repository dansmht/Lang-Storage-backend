import { Injectable } from '@nestjs/common';
import { CreateLocaleDto } from './dto/create-locale.dto';
import { UpdateLocaleDto } from './dto/update-locale.dto';

@Injectable()
export class LocalesService {
  create(createLocaleDto: CreateLocaleDto) {
    return 'This action adds a new locale';
  }

  findAll() {
    return `This action returns all locales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} locale`;
  }

  update(id: number, updateLocaleDto: UpdateLocaleDto) {
    return `This action updates a #${id} locale`;
  }

  remove(id: number) {
    return `This action removes a #${id} locale`;
  }
}
