"use client";

type ErrorAlbumsProps = {
    error: Error;
    reset: () => void;
}

export default function ErrorAlbums({error, reset}: ErrorAlbumsProps) {
    return (
        <div className="p-6 bg-red-50 border border-red-200 rounded">
            <h2 className="text-red-600 text-xl font-semibold mb-2">
                Something went wrong
            </h2>

            <p className="text-gray-700 mb-4">{error?.message ?? "Unknown error"}</p>

            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
                Try again
            </button>
        </div>
    );
}