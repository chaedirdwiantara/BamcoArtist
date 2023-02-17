import i18n from '../locale';

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
  {label: i18n.t('Home.Tab.TopPost.Category.All'), value: ''},
  {label: i18n.t('Home.Tab.TopPost.Category.ComingUp'), value: 'coming_up'},
  {label: i18n.t('Home.Tab.TopPost.Category.Tour'), value: 'otr'},
  {label: i18n.t('Home.Tab.TopPost.Category.DailyLife'), value: 'day_in_life'},
  {
    label: i18n.t('Home.Tab.TopPost.Category.BTS'),
    value: 'behind_the_scene',
  },
  {label: i18n.t('Home.Tab.TopPost.Category.Highlight'), value: 'highlight'},
  {label: i18n.t('Home.Tab.TopPost.Category.Backstage'), value: 'backstage'},
];

export const dropdownCategoryMusician: DataDropDownType[] = [
  {label: i18n.t('Home.Tab.TopPost.Category.ComingUp'), value: 'coming_up'},
  {label: i18n.t('Home.Tab.TopPost.Category.Tour'), value: 'otr'},
  {label: i18n.t('Home.Tab.TopPost.Category.DailyLife'), value: 'day_in_life'},
  {
    label: i18n.t('Home.Tab.TopPost.Category.BTS'),
    value: 'behind_the_scene',
  },
  {label: i18n.t('Home.Tab.TopPost.Category.Highlight'), value: 'highlight'},
  {label: i18n.t('Home.Tab.TopPost.Category.Backstage'), value: 'backstage'},
];

export interface DropDownFilterType {
  label: string;
  value: string;
}

export const dropDownDataFilter: DropDownFilterType[] = [
  {label: i18n.t('Home.Tab.TopPost.Filter.Today'), value: '1'},
  {label: i18n.t('Home.Tab.TopPost.Filter.LastWeek'), value: '7'},
  {label: i18n.t('Home.Tab.TopPost.Filter.ThisMonth'), value: '30'},
];

export interface DropDownSortType {
  label: string;
  value: string;
}

export const dropDownDataSort: DropDownSortType[] = [
  {label: i18n.t('Feed.Sort.Latest'), value: '1'},
  {label: i18n.t('Feed.Sort.Popular'), value: '2'},
];

export const dropDownDataSubscription: DataDropDownType[] = [
  {label: i18n.t('Setting.Tips.Filter.All'), value: '1'},
  {label: i18n.t('Setting.Tips.Filter.OneTime'), value: '2'},
  {label: i18n.t('Setting.Tips.Filter.Weekly'), value: '3'},
  {label: i18n.t('Setting.Tips.Filter.Monthly'), value: '4'},
  {label: i18n.t('Setting.Tips.Filter.Yearly'), value: '5'},
];

export const dropDownHeaderAlbum: DataDropDownType[] = [
  {label: 'Add to Queue', value: '1'},
  {label: 'Share Album', value: '2'},
  {label: 'Add to My Playlist', value: '3'},
];

export const dropDownHeaderSongDetails: DataDropDownType[] = [
  {label: 'Add to Playlist', value: '1'},
  {label: 'Add to Queue', value: '2'},
  {label: 'Share Music', value: '3'},
  {label: 'Show Credits', value: '4'},
];

export const dropDownSubscription: DataDropDownType[] = [
  {label: i18n.t('Setting.Tips.Menu.Subs.GoToMusician'), value: '1'},
  {label: i18n.t('Setting.Tips.Menu.Subs.Unsubs'), value: '2'},
];

export const dropDownSetAudience: DataDropDownType[] = [
  {label: i18n.t('Feed.Public'), value: '1'},
  {label: i18n.t('Feed.Exclusive'), value: '2'},
];

export const dataUpdateComment: DataDropDownType[] = [
  {label: 'Edit Reply', value: '1'},
  {label: 'Delete Reply', value: '2'},
];

export const dataUpdatePost: DataDropDownType[] = [
  {label: 'Edit Post', value: '1'},
  {label: 'Delete Post', value: '2'},
];
