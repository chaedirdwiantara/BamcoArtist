import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const UserIcon = ({
  width = widthPercentage(14),
  height = widthPercentage(16),
  fill = 'none',
  stroke = '#8794AD',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 14 16'}>
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.333 3.833a3.333 3.333 0 11-6.667 0 3.333 3.333 0 016.667 0zM7 9.667A5.833 5.833 0 001.165 15.5h11.667a5.833 5.833 0 00-5.834-5.833z"></Path>
    </Svg>
  </View>
);

export default UserIcon;
