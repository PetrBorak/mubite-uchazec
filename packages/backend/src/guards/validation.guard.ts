import { GetAlbumsQuery, GetAlbumParams } from '../schemas';

export const isGetAlbumsQuery = (query: unknown): query is GetAlbumsQuery => {
  return (
    typeof query === 'object' &&
    query !== null &&
    'page' in query &&
    'limit' in query &&
    typeof query.page === 'number' &&
    typeof query.limit === 'number'
  );
};

export const isGetAlbumParams = (params: unknown): params is GetAlbumParams => {
  return (
    typeof params === 'object' && params !== null && 'id' in params && typeof params.id === 'number'
  );
};
