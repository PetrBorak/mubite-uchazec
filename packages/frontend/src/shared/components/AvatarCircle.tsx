interface AvatarCircleProps {
  id: number;
  size?: 'small' | 'medium' | 'large';
}

const sizeClasses = {
  small: 'w-12 h-12 text-lg',
  medium: 'w-16 h-16 text-2xl',
  large: 'w-24 h-24 text-3xl',
};

export function AvatarCircle({ id, size = 'small' }: AvatarCircleProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg`}
    >
      {id}
    </div>
  );
}
