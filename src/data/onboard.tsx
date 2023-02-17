import {ImageSourcePropType} from 'react-native';
import i18n from '../locale';

export interface DataOnboardType {
  title: string;
  uri?: ImageSourcePropType;
  subtitle?: string;
}

export const dataOnboard: DataOnboardType[] = [
  {
    uri: require('../assets/background/onboard-1.png'),
    title: i18n.t('Onboarding.Step1.Title'),
    subtitle: i18n.t('Onboarding.Step1.Description') || '',
  },
  {
    uri: require('../assets/background/onboard-2.png'),
    title: i18n.t('Onboarding.Step2.Title'),
    subtitle: i18n.t('Onboarding.Step2.Description') || '',
  },
  {
    uri: require('../assets/background/onboard-3.png'),
    title: i18n.t('Onboarding.Step3.Title'),
    subtitle: i18n.t('Onboarding.Step3.Description') || '',
  },
];
