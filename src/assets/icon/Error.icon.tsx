import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function ErrorIcon({
  width = widthPercentage(16),
  height = widthPercentage(16),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.606 2.48a1.6 1.6 0 012.789 0l4.464 7.936a1.6 1.6 0 01-1.395 2.384H3.536a1.6 1.6 0 01-1.395-2.384L6.606 2.48zM8.8 10.4a.8.8 0 11-1.6 0 .8.8 0 011.6 0zM8 4a.8.8 0 00-.8.8v2.4a.8.8 0 001.6 0V4.8A.8.8 0 008 4z"
          fill={fill}
        />
      </Svg>
    </View>
  );
}

export default ErrorIcon;
