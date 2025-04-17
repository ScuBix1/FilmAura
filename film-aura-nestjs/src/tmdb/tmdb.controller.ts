import { Controller, Get, Param, Query } from '@nestjs/common';
import { TmdbService } from './tmdb.service';

@Controller('tmdb')
export class TmdbController {
  constructor(private readonly tmdbService: TmdbService) { }

  @Get()
  getAllMovies(@Query('page') page?: number) {
    return this.tmdbService.getMovies(page);
  }

  @Get('search')
  async search(@Query('query') query: string) {
    return this.tmdbService.searchMovies(query);
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    return this.tmdbService.getMovieById(id);
  }

  @Get('genre/:id')
  getByGenre(@Param('id') id: string, @Query('page') page?: number) {
    return this.tmdbService.getMoviesByGenre(id, page);
  }
}
