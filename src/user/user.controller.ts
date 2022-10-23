import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from '../common/constants/swagger.constants';
import { GetTop100MoviesInput } from './dto/get-top-movies-movies.input';
import { RankMovieInput } from './dto/rank-movie.input';
import { UserService } from './user.service';

@ApiTags(SWAGGER_TAGS.user)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':userId/movies/:movieId/rank')
  @ApiResponse({
    description: 'This for ranking movie',
    status: 201,
  })
  @HttpCode(201)
  rankMovie(
    @Param('userId') userId: string,
    @Param('movieId') movieId: string,
    @Body() rankMovieInput: RankMovieInput,
  ) {
    return this.userService.rankMovie(userId, movieId, rankMovieInput);
  }

  @Get(':id/movies')
  @ApiResponse({
    description: 'This for getting the top 100 movies of the user',
    status: 200,
  })
  @HttpCode(200)
  findTop100Movies(
    @Param('id') id: string,
    @Query() query: GetTop100MoviesInput,
  ) {
    return this.userService.findTop100Movies(id, query);
  }
}
