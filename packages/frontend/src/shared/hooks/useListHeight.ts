import { useEffect, useState } from 'react';

const DEFAULT_LIST_HEIGHT = 480;
const DEFAULT_LIST_OFFSET = 200;

export const useListHeight = () => {
  const [listHeight, setListHeight] = useState(DEFAULT_LIST_HEIGHT);

  useEffect(() => {
    const updateHeight = () => {
      setListHeight(Math.max(window.innerHeight - DEFAULT_LIST_OFFSET, DEFAULT_LIST_HEIGHT));
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return { listHeight, setListHeight };
};
