import {BannerList} from '../interface/banner.interface';

export const defaultBanner: BannerList[] = [
  {
    id: 1,
    imageUrls: require('../assets/image/default_banner.png'),
    title: '',
    description: '',
    linkUrl: 'https://sunnysideup.io',
    isDefault: true,
  },
];
