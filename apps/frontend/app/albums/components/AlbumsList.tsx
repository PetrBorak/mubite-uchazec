import "server-only";
import type {Album} from "@mubite/types";
import ErrorAlbums from "../components/ErrorAlbums";

export default async function AlbumsList() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';

    const res = await fetch(
        `${backendUrl}/api/albums`,
        {cache: "no-store"}
    );

    if (!res.ok) {
        return <ErrorAlbums error={new Error("Failed to fetch albums")} reset={() => window.location.reload()} />
    }


    const albums: Array<Album> = await res.json();

    return (
        <>
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
        </>
    );
}