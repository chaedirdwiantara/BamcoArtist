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
  {label: 'Setting.Tips.Filter.All', value: '1'},
  {label: 'Setting.Tips.Filter.OneTime', value: '2'},
  {label: 'Setting.Tips.Filter.Weekly', value: '3'},
  {label: 'Setting.Tips.Filter.Monthly', value: '4'},
  {label: 'Setting.Tips.Filter.Yearly', value: '5'},
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
