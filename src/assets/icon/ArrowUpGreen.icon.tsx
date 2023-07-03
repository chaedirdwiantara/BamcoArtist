import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function ArrowUpGreenIcon({
  width = widthPercentage(16),
  height = widthPercentage(17),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 17'}>
        <Path
          stroke="#5EBD94"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.333"
          d="M8.5 3.833v9.334m0-9.333l4 4m-4-4l-4 4"></Path>
      </Svg>
    </View>
  );
}

export default ArrowUpGreenIcon;
