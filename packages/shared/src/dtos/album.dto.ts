import { AlbumId, UserId } from '../types';

export interface AlbumResponseDto {
  userId: UserId;
  id: AlbumId;
  title: string;
}

export interface PaginationDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface AlbumsResponseDto {
  albums: AlbumResponseDto[];
  pagination: PaginationDto;
}
