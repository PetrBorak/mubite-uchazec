'use client';

import { AlbumGridItem } from './AlbumGridItem';
import type { AlbumResponseDto } from '../types/album';
import { Loader } from './Loader';

interface AlbumGridRowProps {
  index: number;
  style: React.CSSProperties;
  albums: AlbumResponseDto[];
  columns: number;
  itemWidth: number;
  isItemLoaded: (index: number) => boolean;
}

export function AlbumGridRow({
  index,
  style,
  albums,
  columns,
  itemWidth,
  isItemLoaded,
}: AlbumGridRowProps) {
  const startIdx = index * columns;
  const items: (AlbumResponseDto | null)[] = [];

  for (let i = 0; i < columns; i++) {
    const itemIndex = startIdx + i;
    if (itemIndex < albums.length) {
      const album = albums[itemIndex];
      if (album) {
        items.push(album);
      }
    } else if (!isItemLoaded(itemIndex)) {
      items.push(null);
    }
  }

  const isFirstRow = index === 0;
  const paddingTop = isFirstRow ? 'pt-12' : '';

  return (
    <div style={style} className={`flex gap-6 px-6 h-full pb-6 ${paddingTop}`}>
      {items.map((album, i) => {
        if (!album) {
          return (
            <div
              key={`loading-${startIdx + i}`}
              style={{ width: `${itemWidth}px` }}
              className="flex items-center justify-center h-full"
            >
              <Loader size="medium" />
            </div>
          );
        }

        return <AlbumGridItem key={album.id} album={album} width={itemWidth} />;
      })}
    </div>
  );
}
