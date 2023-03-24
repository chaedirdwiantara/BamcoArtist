import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function PlayVideoIcon({
  width = widthPercentage(40),
  height = widthPercentage(40),
  fill = 'none',
  stroke = '#00D778',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 40 40'}>
        <Circle cx="20" cy="20" r="20" fill="#EBEBEB"></Circle>
        <Path
          d="M26.235 18.981a1.177 1.177 0 010 2.038l-8.47 4.89A1.176 1.176 0 0116 24.891V15.11c0-.906.98-1.472 1.765-1.02l8.47 4.891z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default PlayVideoIcon;
