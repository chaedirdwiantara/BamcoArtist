import create from 'zustand';

interface MyIdGenreProps {
  idGenre: number[];
  setIdGenre: (value: number[]) => void;
}

export const myIdGenreStore = create<MyIdGenreProps>(set => ({
  idGenre: [],
  setIdGenre: (value: number[]) => set({idGenre: value}),
}));
