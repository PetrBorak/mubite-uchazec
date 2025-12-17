import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';
import * as fetchUtils from '../utils/fetch';
import type { Application } from 'express';

vi.mock('../utils/fetch', () => ({
  fetchWithRetry: vi.fn(),
}));

describe('API Routes Integration Tests', () => {
  let app: Application;
  const mockFetchWithRetry = vi.mocked(fetchUtils.fetchWithRetry);

  beforeAll(() => {
    app = createApp();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/v1/albums', () => {
    it('should return paginated albums with valid query parameters', async () => {
      const mockAlbums = [
        { userId: 1, id: 1, title: 'Album 1' },
        { userId: 1, id: 2, title: 'Album 2' },
      ];

      mockFetchWithRetry.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAlbums,
      } as Response);

      const response = await request(app).get('/api/v1/albums?page=1&limit=12');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('albums');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.albums)).toBe(true);
    });

    it('should return 422 for invalid page parameter', async () => {
      const response = await request(app).get('/api/v1/albums?page=invalid&limit=12');

      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty('message');
    });

    it('should return 422 for invalid limit parameter', async () => {
      const response = await request(app).get('/api/v1/albums?page=1&limit=abc');

      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty('message');
    });

    it('should handle missing query parameters with defaults', async () => {
      const mockAlbums = [{ userId: 1, id: 1, title: 'Album 1' }];

      mockFetchWithRetry.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAlbums,
      } as Response);

      const response = await request(app).get('/api/v1/albums?page=1&limit=12');

      expect(response.status).toBe(200);
    });
  });

  describe('GET /api/v1/albums/:id', () => {
    it('should return a single album with valid id', async () => {
      const mockAlbum = { userId: 1, id: 5, title: 'Album 5' };

      mockFetchWithRetry.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockAlbum,
      } as Response);

      const response = await request(app).get('/api/v1/albums/5');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('userId');
      expect(response.body).toHaveProperty('title');
    });

    it('should return 404 for non-existent album', async () => {
      mockFetchWithRetry.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      const response = await request(app).get('/api/v1/albums/999');

      expect([404, 502]).toContain(response.status);
      expect(response.body).toHaveProperty('message');
    });

    it('should return 422 for invalid album id', async () => {
      const response = await request(app).get('/api/v1/albums/invalid');

      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('GET /api/albums (backward compatibility)', () => {
    it('should redirect to /api/v1/albums', async () => {
      const response = await request(app).get('/api/albums?page=1&limit=12').redirects(0);

      expect(response.status).toBe(308);
      expect(response.headers.location).toContain('/api/v1/albums');
    });
  });

  describe('404 handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/api/v1/nonexistent');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
});
