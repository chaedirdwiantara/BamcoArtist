export interface SearchListType {
  id: string;
  musicNum: number;
  musicTitle: string;
  singerName: string;
  imgUri: string;
  type: string;
}
export const SearchListData: SearchListType[] = [
  {
    id: '1',
    type: 'Song',
    musicNum: 1,
    musicTitle: 'Belahan Jiwa',
    singerName: 'Frank Lampardo',
    imgUri:
      'https://i.pinimg.com/originals/9f/ca/c1/9fcac149fe0965cdc158888ffbf8350b.jpg',
  },
  {
    id: '2',
    type: 'Album',
    musicNum: 2,
    musicTitle: 'Menanti sebuah jawaban',
    singerName: 'Frank Lampardo',
    imgUri:
      'https://image.winudf.com/v2/image/bW9iaS5hbmRyb2FwcC5tb29uYXBwcy5jMTQyMV9zY3JlZW5fMF8xNTI3NTA2NDYxXzAyMA/screen-0.jpg?fakeurl=1&type=.webp',
  },
  {
    id: '3',
    type: 'Musician',
    musicNum: 3,
    musicTitle: 'Rinei Circulation',
    singerName: 'Frank Lampardo',
    imgUri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJLMb1Xjkj1PeOYNgksmduMCA-eHxuXk-QiA&usqp=CAU',
  },
  {
    id: '4',
    type: 'Playlist',
    musicNum: 4,
    musicTitle: 'Hime Hime Daisuki',
    singerName: 'Frank Lampardo',
    imgUri:
      'https://i.pinimg.com/236x/85/81/a7/8581a756a349db6b9e482509de1e6e27.jpg',
  },
  {
    id: '5',
    type: 'Song',
    musicNum: 5,
    musicTitle: 'Sasageyoo',
    singerName: 'Frank Lampardo',
    imgUri:
      'https://www.shutterstock.com/image-photo/portrait-japan-anime-cosplay-girl-260nw-1992771236.jpg',
  },
  {
    id: '6',
    type: 'Musician',
    musicNum: 6,
    musicTitle: 'Waka Waka E e',
    singerName: 'Frank Lampardo',
    imgUri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA53ZFropIFBeLrCni8Kd0oDHlvKzmaCJW1g&usqp=CAU',
  },
  {
    id: '7',
    type: 'Musician',
    musicNum: 7,
    musicTitle: 'I Believe U cant Fly',
    singerName: 'Frank Lampardo',
    imgUri:
      'https://i.pinimg.com/736x/ee/09/88/ee098882db13b20af72e312abf9e37ee.jpg',
  },
];
