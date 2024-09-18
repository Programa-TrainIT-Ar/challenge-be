import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillLevelDto } from './create-skilllevel.dto';

export class UpdateSkillLevelDto extends PartialType(CreateSkillLevelDto) {}
