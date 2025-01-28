import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsUUID,
  IsArray,
  ArrayMaxSize,
} from 'class-validator';

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority = Priority.MEDIUM;

  @IsEnum(Status)
  @IsOptional()
  status?: Status = Status.PENDING;

  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;

  @IsUUID()
  @IsOptional()
  userId: string;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  @ArrayMaxSize(3, { message: 'a Task cannot have more than three categories related to it'})
  categories: string[];

  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  tags: string[];
}

export class Task {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  status: string;
  priority: string;
  createdAt?: Date;
  updatedAt?: Date;
}
