export interface MusicianListType {
  uuid: string;
  musicNum: number;
  fullname: string;
  imageProfileUrl: string;
  point?: string;
}
export const MusicianListData: MusicianListType[] = [
  {
    uuid: '1',
    musicNum: 1,
    fullname: 'Imagine Dragons',
    point: '2000',
    imageProfileUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73H7Vd8Bbc03cJsPtMGCWXWH9ZoDwGWm3ig&usqp=CAU',
  },
  {
    uuid: '2',
    musicNum: 2,
    fullname: 'Rex Orange County',
    point: '1900',
    imageProfileUrl:
      'https://www.lazone.id/storage/news/November%202021/15%20November/2.%20Rex%20Orange%20County,%20Calon%20Dokter%20Gigi%20Salah%20Alamat/rex%20orange%20county-cover.jpg',
  },
  {
    uuid: '3',
    musicNum: 3,
    fullname: 'Lauv',
    point: '1800',
    imageProfileUrl:
      'https://www.mainmain.id/uploads/post/2020/03/18/Lauv-New.jpg',
  },
  {
    uuid: '4',
    musicNum: 4,
    fullname: 'Ariana Grande',
    point: '1700',
    imageProfileUrl:
      'https://awsimages.detik.net.id/community/media/visual/2020/01/27/9d1c6f6f-1795-4ff2-aacb-f81d67657e41_43.jpeg?w=700&q=90',
  },
  {
    uuid: '5',
    musicNum: 5,
    fullname: 'Justin Bieber',
    point: '1600',
    imageProfileUrl:
      'https://cdn0-production-images-kly.akamaized.net/4944OcJClfjSM_tsLgBN3Ug6SkQ=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2268428/original/073913300_1530691064-Justin_Bieber.jpg',
  },
  {
    uuid: '6',
    musicNum: 6,
    fullname: 'Keshi',
    point: '1500',
    imageProfileUrl:
      'https://yt3.ggpht.com/5PWVj9wPhRvJvY0RgLPnrMavM_RgS2jLSCgC4fUTsv8EAMzzQIYekw7FOdlA3RToXFEihTabYw=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    uuid: '7',
    musicNum: 7,
    fullname: 'The Overtunes',
    point: '1400',
    imageProfileUrl:
      'https://www.mldspot.com/storage/generated/June2021/band_the_overtunes.jpg',
  },
];
