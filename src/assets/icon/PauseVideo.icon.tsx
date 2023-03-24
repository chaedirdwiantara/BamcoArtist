import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function PauseVideoIcon({
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
          d="M17.354 25.292c.809 0 1.47-.756 1.47-1.68v-8.404c0-.924-.661-1.68-1.47-1.68-.809 0-1.47.756-1.47 1.68v8.403c0 .925.661 1.681 1.47 1.681zm4.412-10.084v8.403c0 .925.661 1.681 1.47 1.681.81 0 1.47-.756 1.47-1.68v-8.404c0-.924-.66-1.68-1.47-1.68-.809 0-1.47.756-1.47 1.68z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default PauseVideoIcon;
