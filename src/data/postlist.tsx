export interface PostPictureType {
  id: number;
  postUri: string;
}

export interface PostProps {
  postTitle?: string;
  postPicture: PostPictureType[];
}

export interface PostListType {
  id: string;
  musicianName: string;
  musicianId: string;
  imgUri: string;
  postDate: string;
  post: PostProps;
  likeCount: number;
  commentCount: number;
  category: string;
}
export const PostlistData: PostListType[] = [
  {
    id: '1',
    musicianName: 'Frank Lampardo',
    musicianId: '@franky',
    imgUri:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
    postDate: '2022-11-15',
    post: {
      postTitle:
        'hey guys its me goku hey guys its me goku goku hey guys its me goku',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
        // {
        //   id: 1,
        //   postUri:
        //     'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        // },
        // {
        //   id: 2,
        //   postUri:
        //     'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        // },
      ],
    },
    category: 'Coming Up',
    likeCount: 120,
    commentCount: 80,
  },
  {
    id: '2',
    musicianName: 'Dwayne Johnson',
    musicianId: '@theRocky',
    imgUri:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
    postDate: '2022-11-17',
    post: {
      postTitle: 'hey guys its me goku',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
        {
          id: 1,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
      ],
    },
    category: 'Tour',
    likeCount: 120,
    commentCount: 180,
  },
  {
    id: '3',
    musicianName: 'Putin',
    musicianId: '@phutinyKawaiii',
    imgUri:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
    postDate: '2022-10-29',
    post: {
      postTitle: 'hey guys its me goku',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
        {
          id: 1,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
        {
          id: 3,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
        {
          id: 4,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
      ],
    },
    category: 'Daily Life',
    likeCount: 120,
    commentCount: 80,
  },
  {
    id: '4',
    musicianName: 'Lee Min Nyong',
    musicianId: '@arassooo',
    imgUri:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
    postDate: '2022-07-14',
    post: {
      postTitle: 'hey guys its me goku',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
        {
          id: 1,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
      ],
    },
    category: 'Backstage',
    likeCount: 120,
    commentCount: 90,
  },
  {
    id: '5',
    musicianName: 'Mikasa',
    musicianId: '@ereeee',
    imgUri:
      'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
    postDate: '2022-07-14',
    post: {
      postTitle: 'ereeeeeeehhhh....',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://dafunda.com/wp-content/uploads/2022/02/Inilah-Alasan-Kuat-Kenapa-Eren-Yeager-Menjadi-Jahat-di-Attack-on-Titan.jpg',
        },
        {
          id: 1,
          postUri:
            'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
        },
        {
          id: 0,
          postUri:
            'https://dafunda.com/wp-content/uploads/2022/02/Inilah-Alasan-Kuat-Kenapa-Eren-Yeager-Menjadi-Jahat-di-Attack-on-Titan.jpg',
        },
      ],
    },
    category: 'Coming Up',
    likeCount: 120,
    commentCount: 101,
  },
];

export const PostlistDataExclusive: PostListType[] = [
  {
    id: '1',
    musicianName: 'Yang katanya SuperEro',
    musicianId: '@women',
    imgUri:
      'https://static.wikia.nocookie.net/disney/images/1/10/Profile_-_Lightning_McQueen.png/revision/latest?cb=20221003093816',
    postDate: '2022-11-15',
    post: {
      postTitle:
        'i am Batman, remember my motto With great power comes great responsibility',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://img.tek.id/crop/600x400/content/2019/02/07/12729/deadpool-dipastikan-akan-tetap-memiliki-rating-dewasa-3XDDhxxCIc.jpeg',
        },
        {
          id: 1,
          postUri:
            'https://resizing.flixster.com/H9Y85icbV3O1T6f2wp81GjMK3SA=/740x380/v2/https://statcdn.fandango.com/MPX/image/NBCU_Fandango/766/611/AntMan_Trailer1.jpg',
        },
      ],
    },
    category: 'Coming Up',
    likeCount: 120,
    commentCount: 60,
  },
  {
    id: '2',
    musicianName: 'Cepmek',
    musicianId: '@Rawr',
    imgUri:
      'https://cdn1-production-images-kly.akamaized.net/mm32wIeS1DHrS2j83Uo3V8Bmb98=/640x853/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/4201593/original/087977400_1666591841-6_mikey22287.jpg',
    postDate: '2022-11-13',
    post: {
      postTitle: 'Kamu nanya!!!',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://cdn1-production-images-kly.akamaized.net/mm32wIeS1DHrS2j83Uo3V8Bmb98=/640x853/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/4201593/original/087977400_1666591841-6_mikey22287.jpg',
        },
        {
          id: 1,
          postUri:
            'https://img.harianjogja.com/posts/2022/11/10/1117219/alif-cepmek.jpg',
        },
        {
          id: 0,
          postUri:
            'https://cdn1-production-images-kly.akamaized.net/mm32wIeS1DHrS2j83Uo3V8Bmb98=/640x853/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/4201593/original/087977400_1666591841-6_mikey22287.jpg',
        },
      ],
    },
    category: 'Tour',
    likeCount: 120,
    commentCount: 9,
  },
  {
    id: '3',
    musicianName: 'Putin',
    musicianId: '@phutinyKawaiii',
    imgUri:
      'https://upload.wikimedia.org/wikipedia/commons/3/34/Vladimir_Putin_-_2012.jpg',
    postDate: '2022-10-29',
    post: {
      postTitle: '当你想在裤子里大便时',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2015/03/16/150316181427_7.jpg',
        },
        {
          id: 1,
          postUri:
            'https://awsimages.detik.net.id/visual/2022/11/10/presiden-putin-diperkirakan-akan-melewatkan-ktt-pemimpin-g20-dan-ktt-apec-november-ini-4_169.jpeg?w=360&q=90',
        },
        {
          id: 3,
          postUri:
            'https://awsimages.detik.net.id/visual/2022/07/01/presiden-rusia-vladimir-putin-berbicara-selama-pembicaraannya-dengan-presiden-indonesia-joko-widodo-di-kremlin-pada-30-juni-20_169.jpeg?w=650',
        },
        {
          id: 4,
          postUri:
            'https://storage.googleapis.com/afs-prod/media/c3168f8d7a1a4f1cb8e990a75000f048/3000.jpeg',
        },
      ],
    },
    category: 'Daily Life',
    likeCount: 120,
    commentCount: 6,
  },
  {
    id: '4',
    musicianName: 'Lee Min Nyong',
    musicianId: '@arassooo',
    imgUri:
      'https://media.suara.com/pictures/970x544/2022/08/02/48786-potret-pesulap-merah-instagramatinsta-julid.jpg',
    postDate: '2022-07-14',
    post: {
      postTitle: 'hanyongaseoo piye kabaressooo',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://imgx.sonora.id/crop/0x0:0x0/700x465/photo/2022/08/31/gus-samsudin-mengucapkan-hooh-te-20220831121836.jpg',
        },
        {
          id: 1,
          postUri:
            'https://statics.indozone.news/content/2022/09/02/mnsdDj1/habib-jindan-jadi-rapper-netizen-sebut-pesulap-merah-sukses-bikin-dukun-ganti-profesi16_700.jpg',
        },
      ],
    },
    category: 'Backstage',
    likeCount: 120,
    commentCount: 31,
  },
  {
    id: '5',
    musicianName: 'Mikasa',
    musicianId: '@ereeee',
    imgUri: 'https://i.kym-cdn.com/photos/images/facebook/000/588/174/0fb.jpg',
    postDate: '2022-07-14',
    post: {
      postTitle: 'ereeeeeeehhhh....',
      postPicture: [
        {
          id: 0,
          postUri:
            'https://i.pinimg.com/originals/87/ea/9e/87ea9e9809189e7a76b0458fc4c4ec25.jpg',
        },
        {
          id: 1,
          postUri:
            'https://cdn.idntimes.com/content-images/community/2021/02/4g7n94d4y6c31-3d3b1161b8bdd83d3f3f0f53e36cc88a-42380997548d81f969faa10cfd940436.jpg',
        },
      ],
    },
    category: 'Coming Up',
    likeCount: 120,
    commentCount: 1,
  },
];
