import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicItemDto } from './create-topic-item.dto';

export class UpdateTopicItemDto extends PartialType(CreateTopicItemDto) {}
