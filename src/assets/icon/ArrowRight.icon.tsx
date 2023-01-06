import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function ArrowRightIcon({
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
          d="M7.425 17.225a.618.618 0 01-.442-.183.629.629 0 010-.884l5.433-5.433c.4-.4.4-1.05 0-1.45L6.983 3.842a.629.629 0 010-.884.629.629 0 01.883 0L13.3 8.392c.425.425.666 1 .666 1.608 0 .608-.233 1.183-.666 1.608l-5.434 5.434a.655.655 0 01-.441.183z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default ArrowRightIcon;
