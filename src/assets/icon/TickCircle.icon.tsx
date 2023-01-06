import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function TickCircleIcon({
  width = widthPercentage(48),
  height = widthPercentage(48),
  fill = 'none',
  stroke = '#00D778',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 48 48'}>
        <Path
          d="M24 45.5C12.14 45.5 2.5 35.86 2.5 24S12.14 2.5 24 2.5 45.5 12.14 45.5 24 35.86 45.5 24 45.5zm0-40C13.8 5.5 5.5 13.8 5.5 24S13.8 42.5 24 42.5 42.5 34.2 42.5 24 34.2 5.5 24 5.5z"
          fill={stroke}
        />
        <Path
          d="M21.16 31.16c-.4 0-.78-.16-1.06-.44l-5.66-5.66c-.58-.58-.58-1.54 0-2.12.58-.58 1.54-.58 2.12 0l4.6 4.6 10.28-10.28c.58-.58 1.54-.58 2.12 0 .58.58.58 1.54 0 2.12L22.22 30.72c-.28.28-.66.44-1.06.44z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default TickCircleIcon;
