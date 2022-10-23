import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum Order {
  asc = 'asc',
  desc = 'desc',
}

export class GetAllDto {
  @ApiPropertyOptional({ default: 1 })
  @Transform((obj) => +obj.value)
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @Transform((obj) => +obj.value)
  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @ApiPropertyOptional({ default: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ default: 'desc' })
  @IsOptional()
  @IsEnum(Order)
  @IsString()
  order?: any = 'desc';
}
