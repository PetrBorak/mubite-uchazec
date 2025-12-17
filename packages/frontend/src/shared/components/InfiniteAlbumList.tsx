'use client';

import { useCallback } from 'react';
import { useInfiniteAlbums, useContainerWidth, useGridLayout } from '../hooks';
import { VirtualizedGrid } from './VirtualizedGrid';
import { ErrorState } from './ErrorState';
import { Loader } from './Loader';
import { useListHeight } from '../hooks/useListHeight';

export function InfiniteAlbumList() {
  const [{ albums }, error, { fetchNextPage, hasNextPage, isLoading }] = useInfiniteAlbums(24);
  const { width: containerWidth, containerRef } = useContainerWidth();
  const { columns, itemWidth, itemHeight } = useGridLayout(containerWidth);
  const { listHeight } = useListHeight();

  const loadMoreItems = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  if (error) {
    return <ErrorState message={error.message} />;
  }

  const isItemLoaded = (index: number) => !hasNextPage || index < albums.length;

  return (
    <div ref={containerRef} className="w-full relative">
      {isLoading && (
        <div className="flex items-center justify-center min-h-100">
          <Loader size="medium" />
        </div>
      )}
      <div className="relative">
        <VirtualizedGrid
          albums={albums}
          columns={columns}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
          listHeight={listHeight}
          hasNextPage={hasNextPage}
          isItemLoaded={isItemLoaded}
          loadMoreItems={loadMoreItems}
        />
      </div>
    </div>
  );
}
