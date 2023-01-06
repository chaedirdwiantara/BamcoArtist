export interface CommentLvl3Type {
  imgUri: string;
  userName: string;
  userId: string;
  postDate: string;
  commentedToId: string;
  commentCaption: string;
  likeCount: number;
  commentCount: number;
}
export interface CommentLvl2Type {
  imgUri: string;
  userName: string;
  userId: string;
  postDate: string;
  commentedToId: string;
  commentCaption: string;
  likeCount: number;
  commentCount: number;
  reply?: CommentLvl3Type[];
}
export interface CommentType {
  imgUri: string;
  userName: string;
  userId: string;
  postDate: string;
  artistPostId: string;
  commentCaption: string;
  likeCount: number;
  commentCount: number;
  reply?: CommentLvl2Type[];
}
export const commentData: CommentType[] = [
  {
    imgUri:
      'https://www.allkpop.com/upload/2022/08/content/041728/web_data/allkpop_1659648882_untitled-1.jpg',
    userName: 'Irene',
    userId: '@redVelvetIren',
    postDate: '1 hours',
    artistPostId: '@lampardo',
    commentCaption:
      'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
    likeCount: 120,
    commentCount: 120,
    reply: [
      {
        imgUri:
          'https://bacapaja.com/wp-content/uploads/2020/11/Nancy-Momoland-1.jpg',
        userName: 'Nancy',
        userId: '@momolando',
        postDate: '30 minutes',
        commentedToId: '@redVelvetIren',
        commentCaption:
          'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
        likeCount: 120,
        commentCount: 120,
        reply: [
          {
            imgUri:
              'https://akcdn.detik.net.id/community/media/visual/2022/09/01/rose-blackpink-jadi-global-ambassador-sulwhasoo_43.jpeg?w=250&q=',
            userName: 'Rose',
            userId: '@pink',
            postDate: '20 minutes',
            commentedToId: '@momolando',
            commentCaption:
              'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
            likeCount: 120,
            commentCount: 120,
          },
          {
            imgUri:
              'https://qph.cf2.quoracdn.net/main-qimg-3f0d18800ceb44091884c845648b0b8e-lq',
            userName: 'Yerin',
            userId: '@gfriend',
            postDate: '5 minutes',
            commentedToId: '@pink',
            commentCaption: 'saya juga dong denger lagu ini enak bingits',
            likeCount: 120,
            commentCount: 120,
          },
          {
            imgUri:
              'https://akcdn.detik.net.id/community/media/visual/2022/09/01/rose-blackpink-jadi-global-ambassador-sulwhasoo_43.jpeg?w=250&q=',
            userName: 'Rose',
            userId: '@pink',
            postDate: '1 minutes',
            commentedToId: '@griend',
            commentCaption: 'iya jeng keren banget yah si dia',
            likeCount: 120,
            commentCount: 120,
          },
        ],
      },
      {
        imgUri:
          'https://cdn.antaranews.com/cache/800x533/2019/07/24/Screenshot_2019-07-24-08-50-42-89-01.jpeg',
        userName: 'Song Hye Kyo',
        userId: '@thedescentdant',
        postDate: '30 minutes',
        commentedToId: '@redVelvetIren',
        commentCaption:
          'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
        likeCount: 120,
        commentCount: 120,
      },
    ],
  },
  {
    imgUri:
      'https://en.kepoper.com/wp-content/uploads/2020/10/Bae-Suzy-Pinterest.jpg',
    userName: 'SuzyBae',
    userId: '@sujybae',
    postDate: '1 weeks',
    artistPostId: '@lampardo',
    commentCaption:
      'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
    likeCount: 120,
    commentCount: 120,
    reply: [
      {
        imgUri:
          'https://bacapaja.com/wp-content/uploads/2020/11/Nancy-Momoland-1.jpg',
        userName: 'Nancy',
        userId: '@Nancy',
        postDate: '30 minutes',
        commentedToId: '@sujybae',
        commentCaption:
          'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
        likeCount: 120,
        commentCount: 120,
        reply: [
          {
            imgUri:
              'https://bacapaja.com/wp-content/uploads/2020/11/Nancy-Momoland-1.jpg',
            userName: 'Nancy',
            userId: '@Nancy',
            postDate: '30 minutes',
            commentedToId: '@redVelvetIren',
            commentCaption:
              'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
            likeCount: 120,
            commentCount: 120,
          },
        ],
      },
    ],
  },
  {
    imgUri: 'https://cdn.myanimelist.net/images/voiceactors/3/63662.jpg',
    userName: 'Lilas Ikuta',
    userId: '@Yoasobi',
    postDate: '1 months',
    artistPostId: '@lampardo',
    commentCaption:
      'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
    likeCount: 120,
    commentCount: 120,
    reply: [
      {
        imgUri:
          'https://bacapaja.com/wp-content/uploads/2020/11/Nancy-Momoland-1.jpg',
        userName: 'Nancy',
        userId: '@Nancy',
        postDate: '30 minutes',
        commentedToId: '@Yoasobi',
        commentCaption:
          'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
        likeCount: 120,
        commentCount: 120,
        reply: [],
      },
    ],
  },
  {
    imgUri: 'https://cdn.myanimelist.net/images/voiceactors/3/66042.jpg',
    userName: 'Aimer',
    userId: '@afterrain',
    postDate: '1 years',
    artistPostId: '@lampardo',
    commentCaption:
      'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
    likeCount: 120,
    commentCount: 120,
    reply: [
      {
        imgUri:
          'https://bacapaja.com/wp-content/uploads/2020/11/Nancy-Momoland-1.jpg',
        userName: 'Nancy',
        userId: '@Nancy',
        postDate: '30 minutes',
        commentedToId: '@fterrain',
        commentCaption:
          'wow sangat keren, mau dong dengerin lagu ini sampai kapanpun',
        likeCount: 120,
        commentCount: 120,
        reply: [],
      },
    ],
  },
];
