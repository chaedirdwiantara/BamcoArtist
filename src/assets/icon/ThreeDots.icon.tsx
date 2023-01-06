import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const ThreeDotsIcon = ({
  width = widthPercentage(24),
  height = widthPercentage(24),
  fill = 'none',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
      <Path
        fill={fill}
        d="M11 12c0-.56.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.44-1-1zM11 16c0-.56.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.44-1-1zM11 8c0-.56.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.44-1-1z"
      />
    </Svg>
  </View>
);

export default ThreeDotsIcon;
