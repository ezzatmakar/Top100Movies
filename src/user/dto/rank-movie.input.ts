import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
} from 'class-validator';

export class RankMovieInput {
  @ApiProperty({
    description: 'rank movie, must in the range from 1 up to 100',
  })
  @IsInt()
  @Min(1)
  @Max(100)
  rank: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUrl({ require_protocol: true, require_valid_protocol: true })
  imageUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1)
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1)
  description?: string;
}
