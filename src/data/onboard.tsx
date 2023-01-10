import {ImageSourcePropType} from 'react-native';

export interface DataOnboardType {
  title: string;
  uri?: ImageSourcePropType;
  subtitle?: string;
}

export const dataOnboard: DataOnboardType[] = [
  {
    uri: require('../assets/background/onboard-1.png'),
    title: "Let's the fans grow with their musician",
    subtitle:
      "Welcome to the our music player! We're excited to have you join our community of musicians and fans.",
  },
  {
    uri: require('../assets/background/onboard-2.png'),
    title: "Let's the fans grow with their musician",
    subtitle:
      'Our platform is designed to support the growth and success of musicians by providing tools and resources to help them share and promote their music.',
  },
  {
    uri: require('../assets/background/onboard-3.png'),
    title: "Let's the fans grow with their musician",
    subtitle:
      "We're committed to supporting fans and musician growth together, and we look forward to seeing you thrive on our platform.",
  },
];
