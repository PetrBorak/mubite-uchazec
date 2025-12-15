'use client';

export default function OfflinePage() {
  const handleTryAgain = () => {
    const lastUrl = typeof window !== 'undefined' ? sessionStorage.getItem('lastUrl') : null;
    const targetUrl = lastUrl && lastUrl !== '/offline' ? lastUrl : '/';

    if (navigator.onLine) {
      window.location.href = targetUrl;
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-700">📱</h1>
          <h2 className="text-3xl font-semibold text-white mt-4 mb-2">You&apos;re Offline</h2>
          <p className="text-gray-400 text-lg">
            It looks like you don&apos;t have an internet connection. Check your connection and try
            again.
          </p>
        </div>

        <button
          onClick={handleTryAgain}
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
