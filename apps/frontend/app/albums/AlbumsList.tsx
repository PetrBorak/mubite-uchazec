import "server-only";
import ErrorAlbums from "@/app/albums/error";
import type {Album} from "@mubite/types";

export default async function AlbumsList() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/albums`,
        {cache: "no-store"}
    );

    if (!res.ok) {
        return <ErrorAlbums/>;
    }

    const albums: Array<Album> = await res.json();
    console.log("albums:", albums);

    return (
        <ul className="space-y-2">
            {albums.map((album) => (
                <li
                    key={album.id}
                    className="p-4 bg-white dark:bg-gray-800 shadow rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                    <span className="font-medium">#{album.id}</span> — {album.title}
                    <span className="ml-2 text-sm text-gray-500">(User ID: {album.userId})</span>
                </li>
            ))}
        </ul>
    );
}