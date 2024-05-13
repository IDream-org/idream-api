import { IsBoolean, IsString, MinLength } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  @MinLength(4)
  title: string;

  @IsString()
  image: string;

  @IsBoolean()
  private = true;
}
