import { InfiniteAlbumList } from '@/shared/components/InfiniteAlbumList';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to Mubit project</h1>
      </header>
      <InfiniteAlbumList />
    </div>
  );
}
