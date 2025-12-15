import { AlbumResponseDto } from '../types/album';
import { AlbumCard } from './AlbumCard';

interface AlbumGridProps {
  albums: AlbumResponseDto[];
}

export function AlbumGrid({ albums }: AlbumGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}
