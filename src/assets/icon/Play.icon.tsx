import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function PlayIcon({
  width = widthPercentage(40),
  height = widthPercentage(40),
  fill = 'none',
  stroke = '#00D778',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 40 40'}>
        <Path
          d="M32 18.268c1.333.77 1.333 2.694 0 3.464l-16.5 9.526c-1.333.77-3-.192-3-1.732V10.474c0-1.54 1.667-2.502 3-1.732L32 18.268z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default PlayIcon;
