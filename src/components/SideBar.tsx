import { useEffect, useState } from 'react';

import { GenreResponseProps } from '../interfaces/commons.interfaces';

import { api } from '../services/api';

import { Button } from '../components/Button';

import '../styles/sidebar.scss';

interface SideBarProps {
  selectedGenre: number;
  handleClickGenre: (id:number) => void;
}

export function SideBar({ selectedGenre, handleClickGenre }:SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickGenre(genre.id)}
            selected={selectedGenre === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}