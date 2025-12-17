import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'interactive';
  className?: string;
}

export function Card({ children, variant = 'default', className = '' }: CardProps) {
  const baseClasses = 'bg-gray-800 rounded-lg shadow-md border border-gray-700';
  const variantClasses = {
    default: 'p-8 shadow-xl',
    interactive: 'p-6 hover:bg-gray-700 hover:shadow-lg transition-all duration-300',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}>
      {children}
    </div>
  );
}
