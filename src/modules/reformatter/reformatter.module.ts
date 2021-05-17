import { Global, Module } from '@nestjs/common';

import { ReformatterService } from './reformatter.service';

@Global()
@Module({
  providers: [ReformatterService],
  exports: [ReformatterService],
})
export class ReformatterModule {}
