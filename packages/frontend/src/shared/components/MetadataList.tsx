import { ReactNode } from 'react';

export interface MetadataItem {
  label: string;
  value: ReactNode;
}

interface MetadataListProps {
  items: MetadataItem[];
}

export function MetadataList({ items }: MetadataListProps) {
  return (
    <dl className="space-y-4">
      {items.map((item, index) => (
        <div key={index}>
          <dt className="text-sm font-medium text-gray-400 mb-1">{item.label}</dt>
          <dd className="text-lg text-white">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
