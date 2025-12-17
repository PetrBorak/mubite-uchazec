import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AlbumService } from '../album.service';
import * as fetchUtils from '../../utils/fetch';

vi.mock('../../utils/fetch', () => ({
  fetchWithRetry: vi.fn(),
}));

describe('AlbumService', () => {
  let albumService: AlbumService;
  const mockFetchWithRetry = vi.mocked(fetchUtils.fetchWithRetry);

  beforeEach(() => {
    albumService = new AlbumService();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getAlbums', () => {
    it('should return paginated albums with correct structure', async () => {
      const mockAlbums = [
        { userId: 1, id: 1, title: 'Album 1' },
        { userId: 1, id: 2, title: 'Album 2' },
        { userId: 1, id: 3, title: 'Album 3' },
        { userId: 2, id: 4, title: 'Album 4' },
        { userId: 2, id: 5, title: 'Album 5' },
      ];

      mockFetchWithRetry.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAlbums,
      } as Response);

      const result = await albumService.getAlbums(1, 2);

      expect(result).toHaveProperty('albums');
      expect(result).toHaveProperty('pagination');
      expect(result.albums).toHaveLength(2);
      expect(result.albums[0]?.title).toBe('Album 1');
      expect(result.albums[1]?.title).toBe('Album 2');
      expect(result.pagination).toEqual({
        page: 1,
        limit: 2,
        total: 5,
        totalPages: 3,
        hasMore: true,
      });
    });

    it('should return correct pagination for last page', async () => {
      const mockAlbums = [
        { userId: 1, id: 1, title: 'Album 1' },
        { userId: 1, id: 2, title: 'Album 2' },
        { userId: 1, id: 3, title: 'Album 3' },
      ];

      mockFetchWithRetry.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAlbums,
      } as Response);

      const result = await albumService.getAlbums(2, 2);

      expect(result.albums).toHaveLength(1);
      expect(result.albums[0]?.title).toBe('Album 3');
      expect(result.pagination.hasMore).toBe(false);
      expect(result.pagination.page).toBe(2);
      expect(result.pagination.totalPages).toBe(2);
    });

    it('should handle empty results', async () => {
      mockFetchWithRetry.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response);

      const result = await albumService.getAlbums(1, 10);

      expect(result.albums).toHaveLength(0);
      expect(result.pagination.total).toBe(0);
      expect(result.pagination.hasMore).toBe(false);
    });

    it('should throw error when API returns non-ok response', async () => {
      mockFetchWithRetry.mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      } as Response);

      await expect(albumService.getAlbums(1, 10)).rejects.toThrow('Failed to fetch albums');
    });

    it('should throw error when API returns invalid data format', async () => {
      mockFetchWithRetry.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ invalid: 'data' }),
      } as Response);

      await expect(albumService.getAlbums(1, 10)).rejects.toThrow('expected array');
    });

    it('should throw error on network error', async () => {
      mockFetchWithRetry.mockRejectedValueOnce(new Error('Network failure'));

      await expect(albumService.getAlbums(1, 10)).rejects.toThrow('Network error');
    });
  });

  describe('getAlbumById', () => {
    it('should return a single album by id', async () => {
      const mockAlbum = { userId: 1, id: 5, title: 'Album 5' };

      mockFetchWithRetry.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockAlbum,
      } as Response);

      const result = await albumService.getAlbumById(5);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('userId');
      expect(result).toHaveProperty('title');
      expect(result.title).toBe('Album 5');
    });

    it('should throw error when album does not exist', async () => {
      mockFetchWithRetry.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      await expect(albumService.getAlbumById(999)).rejects.toThrow('Album with ID 999 not found');
    });

    it('should throw error when API returns non-ok response (not 404)', async () => {
      mockFetchWithRetry.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response);

      await expect(albumService.getAlbumById(1)).rejects.toThrow('Failed to fetch album');
    });

    it('should throw error when response has invalid structure', async () => {
      mockFetchWithRetry.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ invalid: 'structure' }),
      } as Response);

      await expect(albumService.getAlbumById(1)).rejects.toThrow('invalid album structure');
    });
  });
});
