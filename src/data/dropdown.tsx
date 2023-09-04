export interface DataCountryType {
  value: string;
  label: string;
  image: string;
  code: string;
}
export const countryData: DataCountryType[] = [
  {
    value: '1',
    label: 'US',
    image: require('../assets/flags/US.png'),
    code: '+1',
  },
  {
    value: '2',
    label: 'ID',
    image: require('../assets/flags/ID.png'),
    code: '+62',
  },
  {
    value: '3',
    label: 'JP',
    image: require('../assets/flags/JP.png'),
    code: '+81',
  },
  {
    value: '4',
    label: 'IN',
    image: require('../assets/flags/IND.png'),
    code: '+91',
  },
  {
    value: '5',
    label: 'UK',
    image: require('../assets/flags/UK.png'),
    code: '+44',
  },
  {
    value: '6',
    label: 'HK',
    image: require('../assets/flags/HK.png'),
    code: '+852',
  },
  {
    value: '7',
    label: 'MO',
    image: require('../assets/flags/MO.png'),
    code: '+853',
  },
  {
    value: '8',
    label: 'TW',
    image: require('../assets/flags/TW.png'),
    code: '+886',
  },
  {
    value: '9',
    label: 'CN',
    image: require('../assets/flags/CN.png'),
    code: '+86',
  },
  {
    value: '10',
    label: 'MY',
    image: require('../assets/flags/MY.png'),
    code: '+60',
  },
  {
    value: '11',
    label: 'AU',
    image: require('../assets/flags/AU.png'),
    code: '+61',
  },
  {
    value: '12',
    label: 'PH',
    image: require('../assets/flags/PH.png'),
    code: '+63',
  },
  {
    value: '13',
    label: 'SG',
    image: require('../assets/flags/SG.png'),
    code: '+65',
  },
  {
    value: '15',
    label: 'KR',
    image: require('../assets/flags/KR.png'),
    code: '+82',
  },
  {
    value: '16',
    label: 'CA',
    image: require('../assets/flags/CA.png'),
    code: '+1',
  },
];

export interface DataDropDownType {
  label: string;
  value: string;
  disabled?: boolean;
}
export interface DataDropDownNumberType {
  label: string;
  value: number;
  disabled?: boolean;
}

export const dropDownDataCategory: DataDropDownType[] = [
  {label: 'Home.Tab.TopPost.Category.All', value: ''},
  {label: 'Home.Tab.TopPost.Category.ComingUp', value: 'coming_up'},
  {label: 'Home.Tab.TopPost.Category.Tour', value: 'otr'},
  {label: 'Home.Tab.TopPost.Category.DailyLife', value: 'day_in_life'},
  {
    label: 'Home.Tab.TopPost.Category.BTS',
    value: 'behind_the_scene',
  },
  {label: 'Home.Tab.TopPost.Category.Highlight', value: 'highlight'},
  {label: 'Home.Tab.TopPost.Category.Backstage', value: 'backstage'},
];

export const dropdownCategoryMusician: DataDropDownType[] = [
  {label: 'Home.Tab.TopPost.Category.ComingUp', value: 'coming_up'},
  {label: 'Home.Tab.TopPost.Category.Tour', value: 'otr'},
  {label: 'Home.Tab.TopPost.Category.DailyLife', value: 'day_in_life'},
  {
    label: 'Home.Tab.TopPost.Category.BTS',
    value: 'behind_the_scene',
  },
  {label: 'Home.Tab.TopPost.Category.Highlight', value: 'highlight'},
  {label: 'Home.Tab.TopPost.Category.Backstage', value: 'backstage'},
];

export interface DropDownFilterType {
  label: string;
  value: string;
}

export const dropDownDataFilter: DropDownFilterType[] = [
  {label: 'Home.Tab.TopPost.Filter.Today', value: '1'},
  {label: 'Home.Tab.TopPost.Filter.LastWeek', value: '7'},
  {label: 'Home.Tab.TopPost.Filter.ThisMonth', value: '30'},
];

export interface DropDownSortType {
  label: string;
  value: string;
}

export const dropDownDataSort: DropDownSortType[] = [
  {label: 'Feed.Sort.Latest', value: '1'},
  {label: 'Feed.Sort.Popular', value: '2'},
];

export const dropDownDataSubscription: DataDropDownType[] = [
  {label: 'Setting.Tips.Filter.All', value: ''},
  {label: 'Setting.Tips.Filter.Weekly', value: 'weekly'},
  {label: 'Setting.Tips.Filter.Monthly', value: 'monthly'},
  {label: 'Setting.Tips.Filter.Yearly', value: 'yearly'},
];

export const dropDownDataDonation: DataDropDownType[] = [
  {label: 'Setting.Tips.Filter.All', value: ''},
  {label: 'Setting.Tips.Filter.OneTime', value: 'onetime'},
  {label: 'Setting.Tips.Filter.Weekly', value: 'weekly'},
  {label: 'Setting.Tips.Filter.Monthly', value: 'monthly'},
  {label: 'Setting.Tips.Filter.Yearly', value: 'yearly'},
];

export const dropDownHeaderAlbum: DataDropDownType[] = [
  {label: 'Home.Tab.TopSong.Queue', value: '1', disabled: false},
  {label: 'General.Share.Album', value: '2', disabled: false},
  // {label: 'Music.Label.AddToMyPlaylist', value: '3', disabled: false},
];

export const albumReport: DataDropDownType[] = [
  {label: 'Home.Tab.TopSong.Queue', value: '1', disabled: false},
  {label: 'General.Share.Album', value: '2', disabled: false},
  // {label: 'Music.Label.AddToMyPlaylist', value: '3', disabled: false},
  {label: 'Post.Dropdown.Report', value: '22', disabled: false},
];

export const albumReportSent: DataDropDownType[] = [
  {label: 'Home.Tab.TopSong.Queue', value: '1', disabled: false},
  {label: 'General.Share.Album', value: '2', disabled: false},
  // {label: 'Music.Label.AddToMyPlaylist', value: '3', disabled: false},
  {label: 'Post.Dropdown.ReportSent', value: '22', disabled: true},
];

export const dropDownHeaderSongDetails: DataDropDownType[] = [
  {label: 'Home.Tab.TopSong.Playlist', value: '1'},
  {label: 'Home.Tab.TopSong.Queue', value: '2'},
  {label: 'Home.Tab.TopSong.Share', value: '3'},
  {label: 'Home.Tab.TopSong.Credits', value: '4'},
];

export const dropDownSubscription: DataDropDownType[] = [
  {label: 'Setting.Tips.Menu.Subs.GoToMusician', value: '1'},
  {label: 'Setting.Tips.Menu.Subs.Unsubs', value: '2'},
];

export const dropDownTipping: DataDropDownType[] = [
  {label: 'Setting.Tips.Menu.Subs.GoToMusician', value: '1'},
  {label: 'Setting.Tips.Menu.Donation.Stop', value: '2'},
];

export const dropDownSetAudience: DataDropDownType[] = [
  {label: 'Feed.Public', value: 'createPublicContent'},
  {label: 'Feed.Exclusive', value: 'createExclusiveContent'},
];

export const dataUpdateComment: DataDropDownType[] = [
  {label: 'Post.Label.EditReply', value: '1'},
  {label: 'Post.Label.DeleteReply', value: '2'},
];

export const dataUpdatePost: DataDropDownType[] = [
  {label: 'Post.Label.EditPost', value: '1', disabled: false},
  {label: 'Post.Label.DeletePost', value: '2', disabled: false},
];

export const dataUpdatePostDisable: DataDropDownType[] = [
  {label: 'Post.Label.EditPost', value: '1', disabled: true},
  {label: 'Post.Label.DeletePost', value: '2', disabled: false},
];

export const dataStatusPost: DataDropDownType[] = [
  {label: 'Public', value: 'createPublicContent'},
  {label: 'Exclusive', value: 'createExclusiveContent'},
];

export const dropDownActionCategory: DataDropDownType[] = [
  {label: 'Event.Dropdown.Category.Fashion', value: '1'},
  {label: 'Event.Dropdown.Category.Collection', value: '2'},
];

export const dropDownActionSort: DataDropDownType[] = [
  {label: 'Event.Dropdown.Sort.HighestPrice', value: '1'},
  {label: 'Event.Dropdown.Sort.LowestPrice', value: '2'},
  {label: 'Event.Dropdown.Sort.MostSold', value: '3'},
];

export const dropDownIncomeType: DataDropDownType[] = [
  {label: 'Home.Tab.Analytic.Income.Filter.Type.All', value: '1'},
  {label: 'Home.Tab.Analytic.Income.Filter.Type.Tip', value: '2'},
  {label: 'Home.Tab.Analytic.Income.Filter.Type.Subs', value: '3'},
];

export const dropDownIncomeRange: DataDropDownType[] = [
  {label: 'Home.Tab.Analytic.Income.Filter.Range.Monthly', value: '1'},
  {label: 'Home.Tab.Analytic.Income.Filter.Range.Weekly', value: '2'},
  {label: 'Home.Tab.Analytic.Income.Filter.Range.Daily', value: '3'},
];

export const dropDownFansGrowth: DataDropDownType[] = [
  {label: 'Home.Tab.Analytic.Fans.Filter.Range.Monthly', value: '1'},
  {label: 'Home.Tab.Analytic.Fans.Filter.Range.Weekly', value: '2'},
  {label: 'Home.Tab.Analytic.Fans.Filter.Range.Daily', value: '3'},
];

export const dropDownAlbumRange: DataDropDownType[] = [
  {label: 'Home.Tab.Analytic.Album.Filter.Range.Alltime', value: '1'},
  {label: 'Home.Tab.Analytic.Album.Filter.Range.Monthly', value: '2'},
  {label: 'Home.Tab.Analytic.Album.Filter.Range.Weekly', value: '3'},
  {label: 'Home.Tab.Analytic.Album.Filter.Range.Daily', value: '4'},
];

export const dataReportPost: DataDropDownType[] = [
  {label: 'Post.Dropdown.Visit', value: '11'},
  {label: 'Post.Dropdown.Report', value: '22'},
  {label: 'Post.Dropdown.Block', value: '33'},
];

export const dataAlreadyReportPost: DataDropDownType[] = [
  {label: 'Post.Dropdown.Visit', value: '11', disabled: false},
  {label: 'Post.Dropdown.ReportSent', value: '22', disabled: true},
  {label: 'Post.Dropdown.Block', value: '33', disabled: false},
];

export const dataReportPostProfile: DataDropDownType[] = [
  {label: 'Post.Dropdown.Report', value: '22'},
];

export const dataReportAlreadyPostProfile: DataDropDownType[] = [
  {label: 'Post.Dropdown.ReportSent', value: '22', disabled: true},
];

export const dataListSongMoreMyAlbum: DataDropDownType[] = [
  {label: 'Home.Tab.TopSong.Playlist', value: '1', disabled: false},
  {label: 'Home.Tab.TopSong.Queue', value: '3', disabled: false},
  {label: 'Home.Tab.TopSong.Share', value: '4', disabled: false},
  {label: 'Home.Tab.TopSong.Details', value: '5', disabled: false},
];

export const dataListSongAlbum: DataDropDownType[] = [
  {label: 'Home.Tab.TopSong.Playlist', value: '1', disabled: false},
  {label: 'Home.Tab.TopSong.Tip', value: '2', disabled: false},
  {label: 'Home.Tab.TopSong.Queue', value: '3', disabled: false},
  {label: 'Home.Tab.TopSong.Share', value: '4', disabled: false},
  {label: 'Home.Tab.TopSong.Details', value: '5', disabled: false},
  {label: 'Post.Dropdown.Report', value: '22', disabled: false},
];

export const dataListSongAlbumReportSent: DataDropDownType[] = [
  {label: 'Home.Tab.TopSong.Playlist', value: '1', disabled: false},
  {label: 'Home.Tab.TopSong.Tip', value: '2', disabled: false},
  {label: 'Home.Tab.TopSong.Queue', value: '3', disabled: false},
  {label: 'Home.Tab.TopSong.Share', value: '4', disabled: false},
  {label: 'Home.Tab.TopSong.Details', value: '5', disabled: false},
  {label: 'Post.Dropdown.ReportSent', value: '22', disabled: true},
];

export const dropDownTransactionCategory: DataDropDownType[] = [
  {label: 'Transaction.Dropdown.Category.All', value: '1'},
  {label: 'Transaction.Dropdown.Category.Merchandise', value: '2'},
  {label: 'Transaction.Dropdown.Category.Ticket', value: '2'},
];

export const dropDownTransactionSort: DataDropDownType[] = [
  {label: 'Transaction.Dropdown.Sort.Newest', value: '1'},
  {label: 'Transaction.Dropdown.Sort.Oldest', value: '2'},
];

export const dataDurationVote: DataDropDownNumberType[] = [
  {label: 'Vote.Dropdown.OptionA', value: 1},
  {label: 'Vote.Dropdown.OptionB', value: 3},
  {label: 'Vote.Dropdown.OptionC', value: 7},
  {label: 'Vote.Dropdown.OptionD', value: 30},
];

export const dataProfileDropdown: DataDropDownType[] = [
  {label: 'Dropdown.Profile.qr', value: '1', disabled: false},
  {label: 'Dropdown.Profile.share', value: '2', disabled: false},
  {label: 'Dropdown.Profile.block', value: '3', disabled: false},
];

export const dataProfileDropdownBlocked: DataDropDownType[] = [
  {label: 'Dropdown.Profile.qr', value: '1', disabled: false},
  {label: 'Dropdown.Profile.share', value: '2', disabled: false},
  {label: 'Dropdown.Profile.unblock', value: '4', disabled: false},
];
