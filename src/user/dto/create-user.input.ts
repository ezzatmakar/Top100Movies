import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInput {
  @ApiProperty({ description: 'This is the user firstName' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'This is the user lastName' })
  @IsNotEmpty()
  @IsString()
  lastName: string;
}
