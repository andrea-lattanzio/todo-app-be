import { IsHexColor, IsString, Matches, MaxLength } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @MaxLength(10, {
    message:
      'Name must be a single word with a maximum length of 10 characters.',
  })
  @Matches(/^\S+$/, { message: 'Name must be a single word with no spaces.' })
  name: string;
  @IsString()
  @IsHexColor({ message: 'Color must be a valid hex color code.' })
  color: string;
}

export class Tag {
  name: string;
  color: string;
}
