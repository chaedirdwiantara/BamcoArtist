export const menuSetting: {text: string; value: string}[] = [
  {
    text: 'Setting.Account.Title',
    value: 'Account',
  },
  {
    text: 'Setting.QrCode.Title',
    value: 'QrCode',
  },
  {
    text: 'Setting.Transaction.Title',
    value: 'Transaction',
  },
  {
    text: 'Setting.Exclusive.Title',
    value: 'Exclusive Content Setting',
  },
  {
    text: 'Setting.Security.Title',
    value: 'Security',
  },
  {
    text: 'Setting.Shipping.Title',
    value: 'Shipping Information',
  },
  // {
  //   text: 'Setting.Revenue.Title',
  //   value: 'Revenue',
  // },
  {
    text: 'Setting.Tips.Title',
    value: 'DonationAndSubscription',
  },
  {
    text: 'Setting.Language.Title',
    value: 'Language',
  },
  {
    text: 'Setting.Notification.Title',
    value: 'Push Notification',
  },
  {
    text: 'Setting.Helps.Title',
    value: 'Helps',
  },
  {
    text: 'Setting.TnC&PP.Title',
    value: 'TnCAndPP',
  },
];

export const menuTnCAndPP: {text: string; value: string}[] = [
  {
    text: 'Setting.TnC.Title',
    value: 'Terms and Conditions',
  },
  {
    text: 'Setting.Privacy.Title',
    value: 'Privacy Policy',
  },
];

export const menuAccount: {text: string; value: string}[] = [
  {
    text: 'Setting.Account.AccountInformation',
    value: 'AccountInformation',
  },
  {
    text: 'Setting.BlockedUser.Title',
    value: 'BlockedUser',
  },
];

export const menuQrCode: {text: string; value: string}[] = [
  {
    text: 'Setting.QrCode.Device.Title',
    value: 'Device',
  },
  {
    text: 'Setting.Referral.Title',
    value: 'Referral Code',
  },
];

export const dummyViolations = {
  isAnyViolation: true,
  postReported: [
    {
      reportedViolationId: 5,
      postId: 'tCa1hK3Vg',
      caption: 'Siapa yang nyuri nama lu woy!',
      likesCount: 130,
      commentsCount: 58,
      viewsCount: 178,
      shareCount: 50,
      timeAgo: '1 weeks',
      category: '\u0002',
      images: [],
      musician: {
        uuid: 'abf9eeec-08fd-4984-8ac1-6bdcaa963ffc',
        username: 'lockiBamz',
        fullname: 'New Bams',
        email: null,
        imageProfileUrls: [],
        followers: 1234,
      },
    },
  ],
  commentReported: [
    {
      reportedViolationId: 1,
      commentId: 'yS7WS0r4g',
      caption: 'Ko namanya sama sih woy!!!',
      likesCount: 20,
      commentsCount: 15,
      createdAt: '2023-08-17T08:45:15Z',
      timeAgo: '17 August 2023',
      commentOwner: {
        UUID: '129830912830',
        fullname: 'Bambang Ramadhan',
        username: 'lockiBamz',
        image: '',
        isMusician: false,
      },
      repliedTo: 'Seko Bams',
    },
    {
      reportedViolationId: 2,
      commentId: 'z89713njk',
      caption: 'Lah ini siapa yang report gw woy!',
      likesCount: 6,
      commentsCount: 10,
      createdAt: '2023-08-19T08:45:15Z',
      timeAgo: '19 August 2023',
      commentOwner: {
        UUID: '129830912830',
        fullname: 'Bambang Ramadhan',
        username: 'lockiBamz',
        image: '',
        isMusician: false,
      },
      repliedTo: 'Seko Bams',
    },
  ],
  songReported: [],
  albumReported: [],
};
