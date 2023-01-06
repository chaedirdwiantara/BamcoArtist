import * as React from 'react';
import {View} from 'react-native';
import {ms} from 'react-native-size-matters';
import Svg, {Path} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';

function ErrorCircleIcon({
  width = ms(16),
  height = ms(16),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
        <Path
          d="M8 14.667c3.667 0 6.667-3 6.667-6.667s-3-6.667-6.666-6.667c-3.667 0-6.667 3-6.667 6.667s3 6.667 6.667 6.667Z"
          fill="#F34E4E"
          stroke="#F34E4E"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="m6.113 9.887 3.774-3.774M9.887 9.887 6.113 6.113"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export default ErrorCircleIcon;
