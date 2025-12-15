import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AlbumCard } from '../AlbumCard';
import type { AlbumResponseDto } from '../../types/album';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('AlbumCard', () => {
  const mockAlbum: AlbumResponseDto = {
    userId: 1,
    id: 5,
    title: 'Test Album Title',
  };

  it('should render album information correctly', () => {
    render(<AlbumCard album={mockAlbum} />);

    expect(screen.getByText('Test Album Title')).toBeInTheDocument();
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render link with correct href', () => {
    render(<AlbumCard album={mockAlbum} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/albums/5');
  });

  it('should display album id in the avatar circle', () => {
    render(<AlbumCard album={mockAlbum} />);

    const idElement = screen.getByText('5');
    expect(idElement).toBeInTheDocument();
  });

  it('should render with different album data', () => {
    const differentAlbum: AlbumResponseDto = {
      userId: 3,
      id: 42,
      title: 'Another Album',
    };

    render(<AlbumCard album={differentAlbum} />);

    expect(screen.getByText('Another Album')).toBeInTheDocument();
    expect(screen.getByText('User 3')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
