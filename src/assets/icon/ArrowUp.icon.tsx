import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function ArrowUpIcon({
  width = widthPercentage(20),
  height = widthPercentage(20),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
        <Path
          fill={stroke}
          d="M15.058 8.6a.618.618 0 01-.442-.183L10 3.8 5.383 8.417a.629.629 0 01-.883 0 .629.629 0 010-.884l5.058-5.058a.629.629 0 01.883 0L15.5 7.533a.629.629 0 010 .884.605.605 0 01-.442.183z"></Path>
        <Path
          fill={stroke}
          d="M10 17.708a.63.63 0 01-.625-.625V3.058A.63.63 0 0110 2.433a.63.63 0 01.625.625v14.025a.63.63 0 01-.625.625z"></Path>
      </Svg>
    </View>
  );
}

export default ArrowUpIcon;
