import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const ThreeDotsHorizonIcon = ({
  width = widthPercentage(20),
  height = widthPercentage(20),
  fill = '#8794AD',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
      <Path
        fill={fill}
        d="M13.75 10a1.25 1.25 0 102.5 0 1.25 1.25 0 00-2.5 0zM8.75 10a1.25 1.25 0 102.5 0 1.25 1.25 0 00-2.5 0zM3.75 10a1.25 1.25 0 102.5 0 1.25 1.25 0 00-2.5 0z"
      />
    </Svg>
  </View>
);

export default ThreeDotsHorizonIcon;
