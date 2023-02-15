import * as React from 'react';
import {View} from 'react-native';
import Svg, {G, Path, Defs} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function MinusCircleIcon({
  width = widthPercentage(24),
  height = widthPercentage(24),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
        <G filter="url(#filter0_d_5995_86678)" fill="#00D778">
          <Path d="M13.935 18.959c-4.933 0-8.958-4.017-8.958-8.959 0-4.941 4.025-8.958 8.958-8.958S22.893 5.059 22.893 10c0 4.942-4.016 8.959-8.958 8.959zm0-16.667c-4.25 0-7.708 3.458-7.708 7.708s3.458 7.709 7.708 7.709S21.643 14.25 21.643 10s-3.458-7.708-7.708-7.708z" />
          <Path d="M17.268 10.625h-6.666A.63.63 0 019.977 10a.63.63 0 01.625-.625h6.666a.624.624 0 110 1.25z" />
        </G>
        <Defs></Defs>
      </Svg>
    </View>
  );
}

export default MinusCircleIcon;
