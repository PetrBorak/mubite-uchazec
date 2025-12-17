import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { AlbumController } from '../album.controller';
import * as albumServiceModule from '../../services/album.service';
import { AlbumId, UserId } from '@mubit-app/shared';

vi.mock('../../services/album.service', () => ({
  albumService: {
    getAlbums: vi.fn(),
    getAlbumById: vi.fn(),
  },
}));

describe('AlbumController', () => {
  let albumController: AlbumController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const mockAlbumService = vi.mocked(albumServiceModule.albumService);

  beforeEach(() => {
    albumController = new AlbumController();
    mockRequest = {};
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    vi.clearAllMocks();
  });

  describe('getAlbums', () => {
    it('should return paginated albums successfully', async () => {
      const mockAlbumsResponse = {
        albums: [
          { userId: 1 as UserId, id: 1 as AlbumId, title: 'Album 1' },
          { userId: 1 as UserId, id: 2 as AlbumId, title: 'Album 2' },
        ],
        pagination: {
          page: 1,
          limit: 12,
          total: 100,
          totalPages: 9,
          hasMore: true,
        },
      };

      mockRequest.query = { page: '1', limit: '12' };
      mockAlbumService.getAlbums.mockResolvedValueOnce(mockAlbumsResponse);

      await albumController.getAlbums(mockRequest as Request, mockResponse as Response);

      expect(mockAlbumService.getAlbums).toHaveBeenCalledWith(1, 12);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAlbumsResponse);
    });

    it('should throw ValidationError when query parameters are invalid type', async () => {
      mockRequest.query = { page: 'invalid', limit: 'abc' };

      await expect(
        albumController.getAlbums(mockRequest as Request, mockResponse as Response)
      ).rejects.toThrow('Invalid query parameters');

      expect(mockAlbumService.getAlbums).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when query parameters are missing', async () => {
      mockRequest.query = {};

      await expect(
        albumController.getAlbums(mockRequest as Request, mockResponse as Response)
      ).rejects.toThrow('Invalid query parameters');

      expect(mockAlbumService.getAlbums).not.toHaveBeenCalled();
    });
  });

  describe('getAlbumById', () => {
    it('should return a single album successfully', async () => {
      const mockAlbum = { userId: 1 as UserId, id: 5 as AlbumId, title: 'Album 5' };

      mockRequest.params = { id: '5' };
      mockAlbumService.getAlbumById.mockResolvedValueOnce(mockAlbum);

      await albumController.getAlbumById(mockRequest as Request, mockResponse as Response);

      expect(mockAlbumService.getAlbumById).toHaveBeenCalledWith(5);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockAlbum);
    });

    it('should throw ValidationError when id parameter is invalid type', async () => {
      mockRequest.params = { id: 'invalid' };

      await expect(
        albumController.getAlbumById(mockRequest as Request, mockResponse as Response)
      ).rejects.toThrow('Invalid route parameters');

      expect(mockAlbumService.getAlbumById).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when id parameter is missing', async () => {
      mockRequest.params = {};

      await expect(
        albumController.getAlbumById(mockRequest as Request, mockResponse as Response)
      ).rejects.toThrow('Invalid route parameters');

      expect(mockAlbumService.getAlbumById).not.toHaveBeenCalled();
    });
  });
});
