import {ImageSourcePropType} from 'react-native';
import {BannerList} from '../interface/banner.interface';

export const defaultBanner: BannerList[] = [
  {
    id: 1,
    imageUrls: require('../assets/image/default_banner.png'),
    title: '',
    description: '',
    linkUrl: 'https://www.thebeam.co/',
    isDefault: true,
  },
];

export interface OverviewCardType {
  id: number;
  amount: number;
  title: string;
  path: ImageSourcePropType;
}

export const listOverviewCard: OverviewCardType[] = [
  {
    id: 1,
    amount: 1780,
    title: 'Home.OverviewCard.SixthCard',
    path: require('../assets/image/my_income.png'),
  },
  {
    id: 2,
    amount: 35200,
    title: 'Home.OverviewCard.FirstCard',
    path: require('../assets/image/my_fans.png'),
  },
  {
    id: 3,
    amount: 1200,
    title: 'Home.OverviewCard.SecondCard',
    path: require('../assets/image/my_public_post.png'),
  },
  {
    id: 4,
    amount: 1500,
    title: 'Home.OverviewCard.ThirdCard',
    path: require('../assets/image/my_exclusive_post.png'),
  },
  {
    id: 5,
    amount: 78,
    title: 'Home.OverviewCard.FourthCard',
    path: require('../assets/image/my_album.png'),
  },
  {
    id: 6,
    amount: 12,
    title: 'Home.OverviewCard.FifthCard',
    path: require('../assets/image/my_songs.png'),
  },
];

export const listRequiredAccount: string[] = [
  'Setting.Preference.Label.Genre',
  'Setting.Account.Label.TypeOfMusician',
  'Setting.Account.Label.Active',
  'Setting.Account.Label.Location',
];

export const listRequiredProfile: string[] = [
  'Profile.Edit.Photos',
  'Profile.Edit.AddBio',
  'Profile.Edit.AddWebsite',
];
