export interface SongsProps {
  id: number;
  title: string;
  artist: string;
  artwork: string;
  url: string;
  likes: number;
  stream: number;
}
export const songs2: SongsProps[] = [
  {
    id: 1,
    title: '19th Floor',
    artist: 'Bobby Richards',
    artwork: require('../assets/music/img/img1.jpg'),
    url: 'https://assets.skor.id/crop/0x0:0x0/x/photo/2022/12/02/2408359703.jpeg',
    likes: 10,
    stream: 10,
  },
  {
    id: 2,
    title: 'Awful',
    artist: 'josh pan',
    artwork: require('../assets/music/img/img2.jpg'),
    url: 'https://static.wikia.nocookie.net/mobile-legends/images/3/36/Hero381-portrait.png/revision/latest?cb=20220714134445',
    likes: 20,
    stream: 10,
  },
  {
    id: 3,
    title: 'Something is Going On',
    artist: 'Godmode',
    artwork: require('../assets/music/img/img3.jpg'),
    url: 'https://hthgaming.com/wp-content/uploads/2018/07/hanabi-thumbnail.jpg',
    likes: 10,
    stream: 40,
  },
  {
    id: 4,
    title: 'Book The Rental Wit It',
    artist: 'RAGE',
    artwork: require('../assets/music/img/img4.jpg'),
    url: 'https://i.pinimg.com/originals/64/37/c5/6437c5a1c8e89de6912438f2621ec060.jpg',
    likes: 10,
    stream: 30,
  },
  {
    id: 5,
    title: 'Crimson Fly',
    artist: 'Huma-Huma',
    artwork: require('../assets/music/img/img5.jpg'),
    url: 'https://media.hitekno.com/thumbs/2023/05/28/73785-skin-hero-mobile-legends-nana-slumber-party/730x480-img-73785-skin-hero-mobile-legends-nana-slumber-party.jpg',
    likes: 10,
    stream: 60,
  },
];
