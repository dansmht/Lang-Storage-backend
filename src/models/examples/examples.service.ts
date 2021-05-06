import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExampleDto } from './dto/example.dto';
import { Example } from './entities/example.entity';

@Injectable()
export class ExamplesService {
  constructor(
    @InjectRepository(Example)
    private examplesRepository: Repository<Example>,
  ) {}

  create(exampleDto: ExampleDto) {
    return 'This action adds a new example';
  }

  createMany(examples: ExampleDto[]) {
    return this.examplesRepository.create(examples);
  }

  findAll() {
    return `This action returns all examples`;
  }

  findOne(id: number) {
    return `This action returns a #${id} example`;
  }

  update(id: number, exampleDto: ExampleDto) {
    return `This action updates a #${id} example`;
  }

  remove(id: number) {
    return `This action removes a #${id} example`;
  }
}
