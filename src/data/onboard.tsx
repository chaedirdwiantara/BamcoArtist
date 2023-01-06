import {ImageSourcePropType} from 'react-native';

export interface DataOnboardType {
  title: string;
  uri?: ImageSourcePropType;
  subtitle?: string;
}

export const dataOnboard: DataOnboardType[] = [
  {
    uri: require('../assets/background/onboard-1.png'),
    title: "Let's the fans",
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adispicing elit. Vestibulum porta ipsum Lorem ipsum dolor sit amet.',
  },
  {
    uri: require('../assets/background/onboard-2.png'),
    title: 'with their musician',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adispicing elit. Vestibulum porta ipsum Lorem ipsum dolor sit amet.',
  },
  {
    uri: require('../assets/background/onboard-3.png'),
    title: "Let's Let's Let's",
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adispicing elit. Vestibulum porta ipsum Lorem ipsum dolor sit amet.',
  },
];
