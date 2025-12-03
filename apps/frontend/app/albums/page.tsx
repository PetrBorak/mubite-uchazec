import {Suspense} from "react";
import AlbumsList from "./components/AlbumsList";

export default function AlbumsPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-semibold mb-6">Albums</h1>

            <Suspense fallback={<AlbumsSkeleton/>}>
                <AlbumsList/>
            </Suspense>
        </div>
    );
}

function AlbumsSkeleton() {
    return (
        <div className="space-y-3 animate-pulse">
            {Array.from({length: 10}).map((_, i) => (
                <div
                    key={i}
                    className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"
                />
            ))}
        </div>
    );
}