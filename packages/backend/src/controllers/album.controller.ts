import { Request, Response } from 'express';
import { isGetAlbumsQuery, isGetAlbumParams } from '../guards';
import { albumService } from '../services';
import { ValidationError } from '../errors';

export class AlbumController {
  async getAlbums(req: Request, res: Response) {
    if (!isGetAlbumsQuery(req.query)) {
      throw new ValidationError('Invalid query parameters');
    }

    const { page, limit } = req.query;
    const result = await albumService.getAlbums(page, limit);

    res.status(200).json(result);
  }

  async getAlbumById(req: Request, res: Response) {
    if (!isGetAlbumParams(req.params)) {
      throw new ValidationError('Invalid route parameters');
    }

    const { id } = req.params;
    const album = await albumService.getAlbumById(id);

    res.status(200).json(album);
  }
}

export const albumController = new AlbumController();
