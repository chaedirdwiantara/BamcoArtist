import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function EqualizerIcon({
  width = widthPercentage(32),
  height = widthPercentage(32),
  fill = '#fff',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 32 32'}>
        <Circle cx="16" cy="16" r="16" fill="#FF69D2"></Circle>
        <Path
          fill={fill}
          d="M10 19a.504.504 0 01-.5-.5v-5c0-.273.227-.5.5-.5s.5.227.5.5v5c0 .273-.227.5-.5.5zM13 20.667a.504.504 0 01-.5-.5v-8.334c0-.273.227-.5.5-.5s.5.227.5.5v8.334c0 .273-.227.5-.5.5zM16 22.333a.504.504 0 01-.5-.5V10.167c0-.274.227-.5.5-.5s.5.226.5.5v11.666c0 .274-.227.5-.5.5zM19 20.667a.504.504 0 01-.5-.5v-8.334c0-.273.227-.5.5-.5s.5.227.5.5v8.334c0 .273-.227.5-.5.5zM22 19a.504.504 0 01-.5-.5v-5c0-.273.227-.5.5-.5s.5.227.5.5v5c0 .273-.227.5-.5.5z"></Path>
      </Svg>
    </View>
  );
}

export default EqualizerIcon;
