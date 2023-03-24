import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function ArrowRightIcon2({
  width = widthPercentage(16),
  height = widthPercentage(16),
  fill = 'none',
  stroke = '#FF87DB',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
        <Path
          d="M5.941 13.28l4.347-4.346a1.324 1.324 0 000-1.867L5.941 2.721"
          stroke={stroke}
          strokeWidth={1.2}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export default ArrowRightIcon2;
