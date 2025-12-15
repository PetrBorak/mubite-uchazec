import { getAlbum } from '@/shared/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AvatarCircle } from '@/shared/components/AvatarCircle';
import { Card } from '@/shared/components/Card';
import { MetadataList } from '@/shared/components/MetadataList';

interface AlbumDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AlbumDetailPage({ params }: AlbumDetailPageProps) {
  const { id } = await params;

  const [album, error] = await getAlbum(Number(id));

  if (error || !album) {
    notFound();
  }

  const metadataItems = [
    { label: 'Album ID', value: album.id },
    { label: 'Album Title', value: album.title },
    { label: 'Owner', value: `User ${album.userId}` },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-400 hover:underline mb-8">
        Back to Albums
      </Link>

      <div className="max-w-2xl mx-auto">
        <Card variant="default">
          <div className="flex items-center gap-6 mb-8">
            <div className="shrink-0">
              <AvatarCircle id={album.id} size="large" />
            </div>
            <div className="grow">
              <h1 className="text-3xl font-bold text-white mb-2">{album.title}</h1>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-lg">User {album.userId}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <MetadataList items={metadataItems} />
          </div>
        </Card>
      </div>
    </div>
  );
}
