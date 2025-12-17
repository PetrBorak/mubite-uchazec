import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAlbums, getAlbum } from '../api';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('API functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getAlbums', () => {
    it('should fetch albums with default parameters', async () => {
      const mockResponse = {
        albums: [
          { userId: 1, id: 1, title: 'Album 1' },
          { userId: 1, id: 2, title: 'Album 2' },
        ],
        pagination: {
          page: 1,
          limit: 12,
          total: 100,
          totalPages: 9,
          hasMore: true,
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const [data, error] = await getAlbums();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/albums?page=1&limit=12')
      );
      expect(data).toEqual(mockResponse);
      expect(error).toBeNull();
    });

    it('should fetch albums with custom parameters', async () => {
      const mockResponse = {
        albums: [],
        pagination: {
          page: 2,
          limit: 24,
          total: 100,
          totalPages: 5,
          hasMore: true,
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const [data, error] = await getAlbums(2, 24);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/albums?page=2&limit=24')
      );
      expect(data).toEqual(mockResponse);
      expect(error).toBeNull();
    });

    it('should return error when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const [data, error] = await getAlbums();

      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
      expect(error?.message).toBe('Failed to fetch albums');
    });
  });

  describe('getAlbum', () => {
    it('should fetch a single album by id', async () => {
      const mockAlbum = { userId: 1, id: 5, title: 'Album 5' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAlbum,
      });

      const [data, error] = await getAlbum(5);

      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/v1/albums/5'));
      expect(data).toEqual(mockAlbum);
      expect(error).toBeNull();
    });

    it('should return error when album not found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const [data, error] = await getAlbum(999);

      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
      expect(error?.message).toBe('Failed to fetch album');
    });
  });
});
