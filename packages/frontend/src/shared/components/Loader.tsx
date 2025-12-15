interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
}

export function Loader({ size = 'medium' }: LoaderProps) {
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-8 w-8 border-2',
    large: 'h-12 w-12 border-4',
  };

  return (
    <div
      className={`animate-spin rounded-full border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent ${sizeClasses[size]}`}
    ></div>
  );
}
