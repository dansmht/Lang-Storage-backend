import { Module } from '@nestjs/common';

import { ExamplesService } from './examples.service';

@Module({
  providers: [ExamplesService],
})
export class ExamplesModule {}
