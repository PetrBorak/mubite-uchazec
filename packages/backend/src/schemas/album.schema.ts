import { z } from 'zod';

export const GetAlbumsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
});

export type GetAlbumsQuery = z.infer<typeof GetAlbumsQuerySchema>;

export const GetAlbumParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type GetAlbumParams = z.infer<typeof GetAlbumParamsSchema>;
