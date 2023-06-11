import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function ChevronUp({
  width = widthPercentage(20),
  height = widthPercentage(20),
  fill = 'none',
  stroke = '#657694',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 17'}>
        <Path
          d="M2.72 10.533l4.346-4.346a1.324 1.324 0 011.867 0l4.346 4.346"
          stroke={stroke}
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export default ChevronUp;
