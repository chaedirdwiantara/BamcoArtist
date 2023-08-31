import {EventMusicianInterface} from '../interface/event.interface';

export const dataEventMusician: EventMusicianInterface[] = [
  {
    id: '1',
    date: 'Live Now',
    item: [
      {
        title: 'The Sound Project 2023',
        date: '2023-08-14T03:59:43Z',
        place: 'Jakarta',
        isLive: true,
      },
    ],
  },
  {
    id: '2',
    date: 'Agustus',
    item: [
      {
        title: 'Cloud Festival 2023',
        date: '2023-08-30T03:59:43Z',
        place: 'Bandung',
        isLive: false,
      },
    ],
  },
  {
    id: '3',
    date: 'December',
    item: [
      {
        title: 'New Year Festivel 2023',
        date: '2023-12-30T03:59:43Z',
        place: 'Bali',
        isLive: false,
      },
    ],
  },
];
