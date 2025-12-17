import { Request, Response } from 'express';
import { healthService } from '../services';

export class HealthController {
  async getHealth(_: Request, res: Response) {
    const album = await healthService.getHealthStatus();

    res.status(200).json(album);
  }
}

export const healthController = new HealthController();
