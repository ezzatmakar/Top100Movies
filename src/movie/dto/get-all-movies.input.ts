import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { GetAllDto } from '../../common/inputs/get-all.input';

export class GetAllMovieInput extends GetAllDto {
  @ApiPropertyOptional({ description: 'This is the adult option' })
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  adult?: boolean;
}
