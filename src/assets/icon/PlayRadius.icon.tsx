import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function PlayIcon3({
  width = widthPercentage(16),
  height = widthPercentage(16),
  fill = '#00D778',
  stroke = '#00D778',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
        <Path
          fill={fill}
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d="M2.667 8V5.626c0-2.946 2.086-4.153 4.64-2.68l2.06 1.187 2.06 1.187c2.553 1.473 2.553 3.886 0 5.36l-2.06 1.186-2.06 1.187c-2.554 1.473-4.64.267-4.64-2.68V8z"></Path>
      </Svg>
    </View>
  );
}

export default PlayIcon3;
