import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function FullScreenIcon({
  width = widthPercentage(16),
  height = widthPercentage(16),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
        <Path
          d="M.5.5v5.625h1.25V1.75h4.375V.5H.5zm9.375 0v1.25h4.375v4.375h1.25V.5H9.875zM.5 9.875V15.5h5.625v-1.25H1.75V9.875H.5zm13.75 0v4.375H9.875v1.25H15.5V9.875h-1.25z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default FullScreenIcon;
