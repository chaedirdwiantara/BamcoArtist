import {color} from '../theme';

export const bgColorTab = (
  tabActive: string | number,
  selectedValue: string | number,
) => {
  return tabActive === selectedValue ? color.Pink[200] : color.Dark[600];
};
