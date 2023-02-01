import {ViewStyle} from 'react-native';

export interface CheckBoxProps {
  handleOnPress: () => void;
  active: boolean;
  containerStyles?: ViewStyle;
  checkBoxStyles?: ViewStyle;
  errorMsg?: string;
}
