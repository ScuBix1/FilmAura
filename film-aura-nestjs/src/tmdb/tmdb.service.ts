import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TmdbService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly bearerToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const token = this.configService.get<string>('BEARER_TOKEN');
    if (!token) {
      throw new Error('BEARER_TOKEN is not defined in the configuration');
    }
    this.bearerToken = token;
  }

  private async fetchFromTmdb(endpoint: string, params: any = {}) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}${endpoint}`, {
          headers: {
            Authorization: this.bearerToken,
          },
          params: {
            language: 'fr-FR',
            ...params,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Erreur API TMDB',
        error.response?.status || 500,
      );
    }
  }

  async getMovies(page = 1) {
    return this.fetchFromTmdb('/discover/movie', { page });
  }

  async searchMovies(query: string) {
    return this.fetchFromTmdb('/search/movie', { query });
  }

  async getMovieById(id: string) {
    return this.fetchFromTmdb(`/movie/${id}`);
  }

  async getMoviesByGenre(genreId: string, page = 1) {
    return this.fetchFromTmdb('/discover/movie', {
      with_genres: genreId,
      page,
    });
  }
}
