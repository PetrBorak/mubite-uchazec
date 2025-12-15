import { AlbumResponseDto, AlbumsResponseDto } from '../types/album';

export function getApiBaseUrl() {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return process.env.DOCKER === 'true' ? 'http://backend:4000' : process.env.NEXT_PUBLIC_API_URL!;
  }

  return process.env.NEXT_PUBLIC_API_URL!;
}

const API_URL = getApiBaseUrl();
const API_VERSION = 'v1';

export async function getAlbums(
  page: number = 1,
  limit: number = 12
): Promise<[AlbumsResponseDto | null, Error | null]> {
  try {
    const response = await fetch(
      `${API_URL}/api/${API_VERSION}/albums?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      const error = new Error('Failed to fetch albums') as Error & { status?: number };
      error.status = response.status;
      return [null, error];
    }

    const data = await response.json();
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function getAlbum(id: number): Promise<[AlbumResponseDto | null, Error | null]> {
  try {
    const response = await fetch(`${API_URL}/api/${API_VERSION}/albums/${id}`);

    if (!response.ok) {
      const error = new Error('Failed to fetch album') as Error & { status?: number };
      error.status = response.status;
      return [null, error];
    }

    const data = await response.json();
    return [data, null];
  } catch (error) {
    return [null, error as Error];
  }
}
