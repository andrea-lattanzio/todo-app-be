import { IsNotEmpty, IsString, Matches, IsOptional, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10, {
    message:
      'Name must be a single word with a maximum length of 10 characters.',
  })
  @Matches(/^\w+$/, { message: 'Name must be a single word without spaces.' })
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, {message: "description can be 50 character long"})
  description?: string;
}

export class Category {
  name: string;
  description: string;
}
