import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from '../common/constants/swagger.constants';
import { CreateMovieInput } from './dto/create-movie.input';
import { GetAllMovieInput } from './dto/get-all-movies.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { MovieService } from './movie.service';

@Controller('movies')
@ApiTags(SWAGGER_TAGS.movie)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiResponse({ description: 'This for creating movie', status: 201 })
  @HttpCode(201)
  create(@Body() createMovieInput: CreateMovieInput) {
    return this.movieService.create(createMovieInput);
  }

  @Get()
  findAll(@Query() query: GetAllMovieInput) {
    return this.movieService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ description: 'This for getting one movie', status: 200 })
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ description: 'This for updating movie', status: 203 })
  @HttpCode(203)
  updateMovie(@Param('id') id: string, @Body() updateMovie: UpdateMovieInput) {
    return this.movieService.update(id, updateMovie);
  }

  @Delete(':id')
  @ApiResponse({ description: 'This for deleting movie', status: 200 })
  @HttpCode(200)
  removeMovie(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
