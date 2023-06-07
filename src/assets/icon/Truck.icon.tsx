import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function TruckIcon({
  width = widthPercentage(18),
  height = widthPercentage(18),
  fill = 'none',
  stroke = '#8794AD',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} viewBox="0 0 16 16" fill={fill}>
        <Path
          d="M8 9.3335H8.66667C9.4 9.3335 10 8.7335 10 8.00016V1.3335H4C3 1.3335 2.12667 1.88682 1.67334 2.70015"
          stroke={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M1.33325 11.3335C1.33325 12.4402 2.22659 13.3335 3.33325 13.3335H3.99992C3.99992 12.6002 4.59992 12.0002 5.33325 12.0002C6.06659 12.0002 6.66658 12.6002 6.66658 13.3335H9.33325C9.33325 12.6002 9.93325 12.0002 10.6666 12.0002C11.3999 12.0002 11.9999 12.6002 11.9999 13.3335H12.6666C13.7733 13.3335 14.6666 12.4402 14.6666 11.3335V9.3335H12.6666C12.2999 9.3335 11.9999 9.0335 11.9999 8.66683V6.66683C11.9999 6.30016 12.2999 6.00016 12.6666 6.00016H13.5266L12.3866 4.00684C12.1466 3.5935 11.7066 3.3335 11.2266 3.3335H9.99992V8.00016C9.99992 8.7335 9.39992 9.3335 8.66658 9.3335H7.99992"
          stroke={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M5.33333 14.6667C6.06971 14.6667 6.66667 14.0697 6.66667 13.3333C6.66667 12.597 6.06971 12 5.33333 12C4.59695 12 4 12.597 4 13.3333C4 14.0697 4.59695 14.6667 5.33333 14.6667Z"
          stroke={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10.6666 14.6667C11.403 14.6667 11.9999 14.0697 11.9999 13.3333C11.9999 12.597 11.403 12 10.6666 12C9.93021 12 9.33325 12.597 9.33325 13.3333C9.33325 14.0697 9.93021 14.6667 10.6666 14.6667Z"
          stroke={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M14.6667 8V9.33333H12.6667C12.3 9.33333 12 9.03333 12 8.66667V6.66667C12 6.3 12.3 6 12.6667 6H13.5267L14.6667 8Z"
          stroke={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M1.33325 5.33301H5.33325"
          stroke={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M1.33325 7.3335H3.99992"
          stroke={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M1.33325 9.3335H2.66659"
          stroke={stroke}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
}

export default TruckIcon;
