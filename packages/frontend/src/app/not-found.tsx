import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-700">404</h1>
          <h2 className="text-3xl font-semibold text-white mt-4 mb-2">Page Not Found</h2>
          <p className="text-gray-400 text-lg">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
