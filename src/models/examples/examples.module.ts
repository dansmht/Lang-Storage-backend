import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExamplesService } from './examples.service';
import { Example } from './entities/example.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Example])],
  providers: [ExamplesService],
  exports: [ExamplesService],
})
export class ExamplesModule {}
