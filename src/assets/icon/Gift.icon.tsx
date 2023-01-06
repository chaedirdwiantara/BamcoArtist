import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function GiftIcon({
  width = widthPercentage(16),
  height = widthPercentage(16),
  fill = 'none',
  stroke = '#8794AD',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
        <Path
          d="M8 4.667V15.5M8 4.667V3a1.667 1.667 0 111.667 1.667H8zm0 0V2.583a2.083 2.083 0 10-2.083 2.084H8zM2.167 8h11.666M2.167 8a1.667 1.667 0 110-3.333h11.666a1.667 1.667 0 110 3.333M2.167 8v5.833c0 .92.746 1.667 1.666 1.667h8.334c.92 0 1.666-.746 1.666-1.667V8"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export default GiftIcon;
