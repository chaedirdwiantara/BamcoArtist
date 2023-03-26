import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const HornChatIcon = ({
  width = widthPercentage(8),
  height = widthPercentage(9),
  fill = '#541947',
  stroke = '#FFF',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 8 9'}>
      <Path fill={fill} d="M0 0c5 0 7.429.833 8 1.5V9c0-3.2-3.5-8-8-9z"></Path>
    </Svg>
  </View>
);

export default HornChatIcon;
