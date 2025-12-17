import {
  AlbumResponseDto,
  AlbumsResponseDto,
  PaginationDto,
  toAlbumId,
  toUserId,
} from '@mubit-app/shared';
import { AppError, ExternalServiceError, NotFoundError } from '../errors';
import { fetchWithRetry } from '../utils/fetch';
import { AlbumRequest } from '../types';
import { isAlbumRequest } from '../guards';

const EXTERNAL_API_BASE = process.env.EXTERNAL_API_BASE || 'https://jsonplaceholder.typicode.com';

export class AlbumService {
  private async fetchAllAlbums(): Promise<AlbumRequest[]> {
    try {
      const response = await fetchWithRetry(`${EXTERNAL_API_BASE}/albums`, {
        retries: 2,
        timeout: 10000,
      });

      if (!response.ok) {
        throw new ExternalServiceError(
          `Failed to fetch albums: ${response.statusText}`,
          'JSONPlaceholder'
        );
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        throw new ExternalServiceError(
          'Invalid response format: expected array',
          'JSONPlaceholder'
        );
      }

      const albums: AlbumRequest[] = [];
      for (const item of data) {
        if (!isAlbumRequest(item)) {
          throw new ExternalServiceError(
            'Invalid response format: invalid album structure',
            'JSONPlaceholder'
          );
        }
        albums.push(item);
      }

      return albums;
    } catch (error) {
      if (error instanceof ExternalServiceError) {
        throw error;
      }
      throw new ExternalServiceError(
        `Network error while fetching albums: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'JSONPlaceholder'
      );
    }
  }

  private async fetchAlbumById(id: number): Promise<AlbumRequest> {
    try {
      const response = await fetchWithRetry(`${EXTERNAL_API_BASE}/albums/${id}`, {
        retries: 2,
        timeout: 10000,
        skipRetryOn: (error) => error.message.includes('404'),
      });

      if (response.status === 404) {
        throw new NotFoundError(`Album with ID ${id} not found`);
      }

      if (!response.ok) {
        throw new ExternalServiceError(
          `Failed to fetch album: ${response.statusText}`,
          'JSONPlaceholder'
        );
      }

      const data: unknown = await response.json();

      if (!isAlbumRequest(data)) {
        throw new ExternalServiceError(
          'Invalid response format: invalid album structure',
          'JSONPlaceholder'
        );
      }

      return data;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new ExternalServiceError(
        `Network error while fetching album: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'JSONPlaceholder'
      );
    }
  }

  private toAlbumDto(album: AlbumRequest): AlbumResponseDto {
    return {
      userId: toUserId(album.userId),
      id: toAlbumId(album.id),
      title: album.title,
    };
  }

  async getAlbums(page: number, limit: number): Promise<AlbumsResponseDto> {
    const allAlbums = await this.fetchAllAlbums();

    const total = allAlbums.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedAlbums = allAlbums.slice(startIndex, endIndex);

    const pagination: PaginationDto = {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    };

    const albumDtos = paginatedAlbums.map((album) => this.toAlbumDto(album));

    return {
      albums: albumDtos,
      pagination,
    };
  }

  async getAlbumById(id: number): Promise<AlbumResponseDto> {
    const album = await this.fetchAlbumById(id);
    return this.toAlbumDto(album);
  }
}

export const albumService = new AlbumService();
