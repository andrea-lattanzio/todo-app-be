import { Type } from 'class-transformer';
import { Priority, Status } from './create-task.dto';
import {
  IsArray,
  IsDateString,
  IsEnum,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class UpdateTaskRelationsDto {
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  addTags?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  removeTags?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  addCategories?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  removeCategories?: string[];
}

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority = Priority.MEDIUM;

  @IsEnum(Status)
  @IsOptional()
  status?: Status = Status.PENDING;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateTaskRelationsDto)
  updateRelations?: UpdateTaskRelationsDto;
}
