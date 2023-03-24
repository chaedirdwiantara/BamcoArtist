export interface DiveInType {
  id: number;
  title: string;
  imageUrl: {
    image: string;
    presetName: string;
  }[];
  description: string;
}

export const ListDiveIn: DiveInType[] = [
  {
    id: 1,
    title: 'My Artists',
    description: 'Get the latest updates',
    imageUrl: [
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/684817-thumbnail.png',
        presetName: 'thumbnail',
      },
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/684817-small.png',
        presetName: 'small',
      },
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/684817-medium.png',
        presetName: 'medium',
      },
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/684817-large.png',
        presetName: 'large',
      },
    ],
  },
  {
    id: 2,
    title: 'Similar Artists',
    description: 'Find similar artist',
    imageUrl: [
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/044129-thumbnail.png',
        presetName: 'thumbnail',
      },
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/044129-small.png',
        presetName: 'small',
      },
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/044129-medium.png',
        presetName: 'medium',
      },
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/044129-large.png',
        presetName: 'large',
      },
    ],
  },
  {
    id: 3,
    title: 'Trending',
    description: 'Jump in into the trend',
    imageUrl: [
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/074044-thumbnail.png',
        presetName: 'thumbnail',
      },
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/074044-small.png',
        presetName: 'small',
      },
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/074044-medium.png',
        presetName: 'medium',
      },
      {
        image:
          'https://storage.googleapis.com/media-storage-81b162d8/074044-large.png',
        presetName: 'large',
      },
    ],
  },
];
