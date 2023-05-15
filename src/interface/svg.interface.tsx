import {ViewStyle} from 'react-native';
export interface SvgProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  stroke?: string;
  active?: boolean;
  style?: ViewStyle;
  color?: string;
  noRadius?: boolean;
}
