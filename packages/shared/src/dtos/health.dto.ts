export interface HealthResponseDto {
  status: 'ok' | 'error';
  timestamp: string;
  uptime?: number;
  environment?: string;
}
