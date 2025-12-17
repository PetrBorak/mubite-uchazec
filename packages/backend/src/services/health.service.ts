import { HealthResponseDto } from '@mubit-app/shared';

export class HealthService {
  getHealthStatus(): HealthResponseDto {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}

export const healthService = new HealthService();
