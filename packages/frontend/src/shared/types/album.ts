export interface AlbumResponseDto {
  userId: number;
  id: number;
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
