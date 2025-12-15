'use client';

import { useMemo } from 'react';

interface GridLayoutConfig {
  columns: number;
  itemWidth: number;
  itemHeight: number;
}

export function useGridLayout(containerWidth: number, itemHeight: number = 200): GridLayoutConfig {
  return useMemo(() => {
    const getColumns = () => {
      if (containerWidth < 768) return 1;
      if (containerWidth < 1024) return 2;
      return 3;
    };

    const columns = getColumns();
    const gapSize = 24;
    const horizontalPadding = 48;
    const availableWidth = containerWidth - horizontalPadding - gapSize * (columns - 1);
    const itemWidth = availableWidth / columns;
    const rowHeight = itemHeight + gapSize;

    return { columns, itemWidth, itemHeight: rowHeight };
  }, [containerWidth, itemHeight]);
}
