import { PartialType } from '@nestjs/mapped-types';
import { CreateLocaleDto } from './create-locale.dto';

export class UpdateLocaleDto extends PartialType(CreateLocaleDto) {}
