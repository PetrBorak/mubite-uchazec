interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = 'Failed to load albums' }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-100">
      <div className="text-center p-8 bg-red-900/20 rounded-lg border border-red-800">
        <h3 className="text-xl font-semibold text-red-400 mb-2">Error</h3>
        <p className="text-red-300">{message}</p>
      </div>
    </div>
  );
}
