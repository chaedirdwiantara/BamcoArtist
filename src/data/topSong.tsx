export interface TopSongProps {
  id: string;
  musicNum: number;
  title: string;
  musicianName: string;
  imageUrl: string;
  played: boolean;
}
export const TopSongListData: TopSongProps[] = [
  {
    id: '1',
    musicNum: 1,
    title: 'Thunder',
    musicianName: 'Imagine Dragons',
    imageUrl: 'https://i.ytimg.com/vi/GtEvysh1654/maxresdefault.jpg',
    played: false,
  },
  {
    id: '2',
    musicNum: 2,
    title: 'Sunflower',
    musicianName: 'Rex Orange County',
    imageUrl: 'https://i.ytimg.com/vi/awga8fAYOtE/maxresdefault.jpg',
    played: false,
  },
  {
    id: '3',
    musicNum: 3,
    title: 'I Still Love You',
    musicianName: 'The Overtunes',
    imageUrl: 'https://i.ytimg.com/vi/Tw-u1EvLLL0/maxresdefault.jpg',
    played: false,
  },
  {
    id: '4',
    musicNum: 4,
    title: 'I Like Me Better',
    musicianName: 'Lauv',
    imageUrl:
      'https://i.scdn.co/image/ab67616d0000b273fab48816b625e2a77a732400',
    played: false,
  },
  {
    id: '5',
    musicNum: 5,
    title: '7 Rings',
    musicianName: 'Ariana Grande',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BYTQ2MTdmOTQtNzY0NS00MDQ1LWEwOWItNDczNzUxMDdlOTYzXkEyXkFqcGdeQXVyMTI1Mzg0ODA5._V1_.jpg',
    played: false,
  },
  {
    id: '6',
    musicNum: 6,
    title: 'Drunk',
    musicianName: 'Keshi',
    imageUrl: 'https://i.ytimg.com/vi/CyadFi-x3Dk/maxresdefault.jpg',
    played: false,
  },
  {
    id: '7',
    musicNum: 7,
    title: 'Let Me Love You',
    musicianName: 'Justin Bieber',
    imageUrl:
      'https://lastfm.freetls.fastly.net/i/u/ar0/c800779a399447228ab7cc929bb8895a.jpg',
    played: false,
  },
];
