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
  @Matches(/^#[0-9A-Fa-f]{6}$/, {
    message:
      'Color must be a valid hex color code with a # prefix (e.g., #FF5733).',
  })
  color: string;
}

export class Tag {
  name: string;
  color: string;
}
