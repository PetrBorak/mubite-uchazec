export const PWA_CONFIG = {
  cacheName: 'mubit-v1',
  offlineUrl: '/offline.html',
  precacheAssets: ['/', '/offline.html'],
  navigationTimeout: 5000,
  enableInDevelopment: false,
} as const;

export type PWAConfig = typeof PWA_CONFIG;
