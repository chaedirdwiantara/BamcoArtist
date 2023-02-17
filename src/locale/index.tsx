import enMessages from './en.json';
import zhMessages from './zh.json';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

export const optionDetection = {
  lookupLocalStorage: 'i18nextLng',
};

const resources = {
  en: {translation: enMessages},
  zh: {translation: zhMessages},
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  detection: optionDetection,
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
