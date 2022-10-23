import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { GetAllDto } from '../../common/inputs/get-all.input';

export class GetTop100MoviesInput extends GetAllDto {
  @ApiPropertyOptional({ default: 'rank' })
  @IsOptional()
  @IsString()
  sortBy?: string = 'rank';
}
