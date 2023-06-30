import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function MusicPinkIcon({
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
          d="M13.313 23.167A3.17 3.17 0 0110.146 20a3.17 3.17 0 013.167-3.166A3.17 3.17 0 0116.48 20a3.17 3.17 0 01-3.167 3.167zm0-5.334A2.17 2.17 0 0011.146 20a2.17 2.17 0 002.167 2.167 2.167 2.167 0 100-4.333z"></Path>
        <Path
          fill={fill}
          d="M15.98 20.5a.504.504 0 01-.5-.5v-9.334c0-.273.226-.5.5-.5.273 0 .5.227.5.5V20a.5.5 0 01-.5.5z"></Path>
        <Path
          fill={fill}
          d="M20.754 14.82c-.22 0-.454-.04-.68-.114l-2.947-.98c-.92-.306-1.64-1.306-1.64-2.273v-.787c0-.646.267-1.206.72-1.54.46-.333 1.073-.4 1.687-.2l2.946.98c.92.307 1.64 1.307 1.64 2.274v.78c0 .646-.266 1.206-.72 1.54-.286.22-.64.32-1.006.32zm-3.54-5.007c-.16 0-.307.04-.42.127-.2.14-.307.4-.307.726v.78c0 .534.447 1.154.953 1.327l2.947.98c.307.107.593.08.787-.06.2-.14.306-.4.306-.726v-.78c0-.534-.446-1.154-.953-1.327l-2.947-.98a1.07 1.07 0 00-.366-.067z"></Path>
      </Svg>
    </View>
  );
}

export default MusicPinkIcon;
