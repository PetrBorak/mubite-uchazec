'use client';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getAlbums, getAlbum } from '../lib/api';
import type { AlbumsResponseDto, AlbumResponseDto } from '../types/album';

export function useInfiniteAlbums(limit: number = 12) {
  const { data, error, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<AlbumsResponseDto, Error>({
      queryKey: ['albums-infinite', limit],
      queryFn: async ({ pageParam = 1 }) => {
        const [data, error] = await getAlbums(pageParam as number, limit);
        if (error || !data) {
          throw error || new Error('Failed to fetch albums');
        }
        return data;
      },
      getNextPageParam: (lastPage) => {
        return lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const albums = data?.pages.flatMap((page) => page.albums) ?? [];
  const pagination = data?.pages[data.pages.length - 1]?.pagination;

  return [
    { albums, pagination },
    isError ? error : null,
    {
      isLoading,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },
  ] as const;
}

export function useAlbum(id: number) {
  const { data, error, isLoading, isError } = useQuery<AlbumResponseDto, Error>({
    queryKey: ['album', id],
    queryFn: async () => {
      const [data, error] = await getAlbum(id);
      if (error || !data) {
        throw error || new Error('Failed to fetch album');
      }
      return data;
    },
    enabled: !!id,
  });

  return [data, isError ? error : null, { isLoading }] as const;
}
