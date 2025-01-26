import { IsNotEmpty, IsString, IsOptional, IsEnum, IsDateString, IsUUID, IsArray } from 'class-validator';

enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

enum Status {
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

  @IsArray()
  @IsUUID('all', { each: true }) 
  @IsOptional()
  users?: string[];

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @IsUUID()
  tagId: string;
}
