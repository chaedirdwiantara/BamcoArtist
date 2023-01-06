import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function PlayIcon2({
  width = widthPercentage(31),
  height = widthPercentage(36),
  fill = 'none',
  stroke = '#00D778',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 31 36'}>
        <Path
          d="M30 16.268c1.333.77 1.333 2.694 0 3.464L3 35.321c-1.333.77-3-.193-3-1.732V2.412C0 .872 1.667-.09 3 .679l27 15.589z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default PlayIcon2;
