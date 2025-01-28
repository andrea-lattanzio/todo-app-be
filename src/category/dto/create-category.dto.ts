import { IsNotEmpty, IsString, Matches, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\w+$/, { message: 'Name must be a single word without spaces.' })
  name: string;

  @IsOptional()
  @IsString()
  @Matches(/^(\S+\s*){0,20}$/, {
    message: 'Description must not exceed 20 words.',
  })
  description?: string;
}

export interface Category {
  name: string;
  description: string;
}
