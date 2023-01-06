import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const KeyIcon = ({
  width = widthPercentage(24),
  height = widthPercentage(24),
  fill = 'none',
  stroke = '#292D32',
  style,
}: SvgProps) => {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
        <Path
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
          d="M19.79 14.93a7.575 7.575 0 01-7.6 1.87l-4.71 4.7c-.34.35-1.01.56-1.49.49l-2.18-.3c-.72-.1-1.39-.78-1.5-1.5l-.3-2.18c-.07-.48.16-1.15.49-1.49l4.7-4.7c-.8-2.6-.18-5.55 1.88-7.6 2.95-2.95 7.74-2.95 10.7 0 2.96 2.95 2.96 7.76.01 10.71zM6.89 17.49l2.3 2.3"
        />
        <Path
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M14.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        />
      </Svg>
    </View>
  );
};

export default KeyIcon;
