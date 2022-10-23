import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsDate,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateImageType {
  @ApiProperty({ description: 'This is the image url' })
  @IsNotEmpty()
  @IsUrl({ require_protocol: true, require_valid_protocol: true })
  url: string;

  @ApiPropertyOptional({ description: 'This is the image title' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1)
  title?: string;

  @ApiPropertyOptional({ description: 'This is the image description' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1)
  description?: string;
}

export class CreateMovieInput {
  @ApiProperty({ description: 'This is an adult option' })
  @IsNotEmpty()
  @IsBoolean()
  adult: boolean;

  @ApiProperty({ description: 'This is the overview about movie' })
  @IsNotEmpty()
  @IsString()
  @Length(1)
  overview: string;

  @ApiProperty({ description: 'This is the release date of the movie' })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  releaseDate: Date;

  @ApiProperty({ description: 'This field for the genreIds', type: [Number] })
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(0, { each: true })
  genreIds: number[];

  @ApiProperty({ description: 'This is the original title of movie' })
  @IsNotEmpty()
  @IsString()
  @Length(1)
  originalTitle: string;

  @ApiProperty({ description: 'This is the original language of movie' })
  @IsNotEmpty()
  @IsString()
  @Length(1)
  originalLanguage: string;

  @ApiProperty({ description: 'This is the title of movie' })
  @IsNotEmpty()
  @IsString()
  @Length(1)
  @Transform((object) => object.value.toLowerCase())
  title: string;

  @ApiProperty({ description: 'This is the popularity of movie' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  popularity: number;

  @ApiProperty({ description: 'This is the vote count of movie' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  voteCount: number;

  @ApiProperty({ description: 'This is an video option' })
  @IsNotEmpty()
  @IsBoolean()
  video: boolean;

  @ApiProperty({ description: 'This is the vote average of movie' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  voteAverage: number;

  @ApiProperty({ description: 'this is the poster path' })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateImageType)
  posterPath: CreateImageType;

  @ApiProperty({ description: 'this is the back drop path' })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateImageType)
  backdropPath: CreateImageType;
}
