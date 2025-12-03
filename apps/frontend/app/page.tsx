import Link from "next/link";

export default function Home() {
    return <main className="p-8">
        <h1 className="text-4xl font-bold mb-6">Welcome</h1>

        <Link
            href="/albums"
            className="text-blue-600 underline hover:opacity-80"
        >
            Go to Albums
        </Link>
    </main>
}
