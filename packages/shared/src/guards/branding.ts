import { AlbumId, UserId } from '../types';

export const isAlbumId = (id: unknown): id is AlbumId => {
  return typeof id === 'number' && Number.isInteger(id) && id > 0;
};

export const isUserId = (id: unknown): id is UserId => {
  return typeof id === 'number' && Number.isInteger(id) && id > 0;
};

export const toAlbumId = (id: number): AlbumId => {
  if (!isAlbumId(id)) {
    throw new Error(`Invalid AlbumId: ${id}`);
  }
  return id as AlbumId;
};

export const toUserId = (id: number): UserId => {
  if (!isUserId(id)) {
    throw new Error(`Invalid UserId: ${id}`);
  }
  return id as UserId;
};
