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
];

export interface DataDropDownType {
  label: string;
  value: string;
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
  {label: 'Home.Tab.TopSong.Queue', value: '1'},
  {label: 'General.Share.Album', value: '2'},
  // {label: 'Music.Label.AddToMyPlaylist', value: '3'},
];

export const dropDownHeaderSongDetails: DataDropDownType[] = [
  {label: 'Home.Tab.TopSong.Playlist', value: '1'},
  {label: 'Home.Tab.TopSong.Queue', value: '2'},
  {label: 'Home.Tab.TopSong.Share', value: '3'},
  {label: 'Home.Tab.TopSong.Details', value: '4'},
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
  {label: 'Post.Label.EditPost', value: '1'},
  {label: 'Post.Label.DeletePost', value: '2'},
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
];

export const dataAlreadyReportPost: DataDropDownType[] = [
  {label: 'Post.Dropdown.Visit', value: '11', disabled: false},
  {label: 'Post.Dropdown.ReportSent', value: '22', disabled: true},
];

export const dataReportPostProfile: DataDropDownType[] = [
  {label: 'Post.Dropdown.Report', value: '22'},
];

export const dataReportAlreadyPostProfile: DataDropDownType[] = [
  {label: 'Post.Dropdown.ReportSent', value: '22', disabled: true},
];
