import { AlbumRequest } from '../types';

export const isAlbumRequest = (data: unknown): data is AlbumRequest => {
  return !!(
    data &&
    typeof data === 'object' &&
    'userId' in data &&
    'id' in data &&
    'title' in data &&
    typeof (data as AlbumRequest).userId === 'number' &&
    typeof (data as AlbumRequest).id === 'number' &&
    typeof (data as AlbumRequest).title === 'string'
  );
};
