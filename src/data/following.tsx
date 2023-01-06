export interface DataFavouritesType {
  title: string;
  favorites: string[];
}

export const dataFavourites: DataFavouritesType[] = [
  {
    title: 'Select Your Favorite Genres',
    favorites: [
      'African',
      'Alternative',
      'Arabic',
      'Asian',
      'Blues',
      'Brazilian',
      'Children Music',
      'Christian & Gospel',
      'Classical',
      'Country',
      'Dance',
      'Easy Listening',
      'Electronic',
      'Folk',
      'Hip Hop/Rap',
      'Indian',
      'Jazz',
      'Latin',
      'Metal',
      'Pop',
      'R&B/Soul',
      'Reggae',
      'Relaxation',
      'Rock',
      'Various',
      'World Music / Regional Folklore',
    ],
  },
  {
    title: "What's Fit Your Moods",
    favorites: [
      'Chill',
      'Calm',
      'Focus',
      'Game',
      'Sleep',
      'Sad',
      'Study',
      'Night',
      'Sport',
      'Happy',
      'Romance',
      'Groovy',
      'Sentimental',
      'Nostalgic',
    ],
  },
  {
    title: "I'm here to",
    favorites: [
      'Support The Artist',
      'Free Music',
      'Find New Song',
      'Explore New Artist',
      'Recognize Artist',
      'Find New Ban',
      'Chill',
      'Contribute to Artist',
      'Support Indie Community',
    ],
  },
  {
    title: 'Who to Follow',
    favorites: [
      'Support The Artist',
      'Free Music',
      'Find New Song',
      'Explore New Artist',
      'Recognize Artist',
      'Find New Ban',
      'Chill',
      'Contribute to Artist',
      'Support Indie Community',
    ],
  },
];

export interface dataRecommendedArtistType {
  uuid: string;
  fullname: string;
  followers: number;
  imageProfileUrl: string;
  isFollowed: boolean;
}

export const dataRecommendedArtist: dataRecommendedArtistType[] = [
  {
    uuid: '1',
    fullname: 'Sagittarius',
    followers: 10,
    isFollowed: true,
    imageProfileUrl:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
  },
  {
    uuid: '2',
    fullname: 'Scorpio',
    followers: 2,
    isFollowed: true,
    imageProfileUrl:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
  },
  {
    uuid: '3',
    fullname: 'Gemini',
    followers: 3,
    isFollowed: true,
    imageProfileUrl:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
  },
  {
    uuid: '4',
    fullname: 'Cancer',
    followers: 4,
    isFollowed: true,
    imageProfileUrl:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
  },
  {
    uuid: '5',
    fullname: 'Taurus',
    followers: 5,
    isFollowed: true,
    imageProfileUrl:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
  },
];
