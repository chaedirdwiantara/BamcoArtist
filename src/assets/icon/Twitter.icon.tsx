import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';
import {ms} from 'react-native-size-matters';

const TwitterIcon = ({
  width = ms(20),
  height = ms(20),
  fill = '#E0E0E0',
  stroke = '#292D32',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
      <Path
        fill={fill}
        d="M6.655 18c6.793 0 10.509-5.772 10.509-10.77 0-.161 0-.325-.007-.486a7.632 7.632 0 001.844-1.964 7.345 7.345 0 01-2.125.598 3.793 3.793 0 001.628-2.097c-.726.441-1.52.75-2.348.915A3.67 3.67 0 0014.06 3.05a3.617 3.617 0 00-2.343.398 3.754 3.754 0 00-1.623 1.779A3.88 3.88 0 009.86 7.65a10.286 10.286 0 01-4.216-1.149 10.545 10.545 0 01-3.397-2.808 3.88 3.88 0 00-.402 2.76c.213.94.766 1.76 1.548 2.296a3.667 3.667 0 01-1.672-.47v.051c.001.874.296 1.721.836 2.398a3.684 3.684 0 002.125 1.315c-.317.09-.644.134-.973.133-.232 0-.463-.021-.69-.066.235.752.695 1.41 1.313 1.881a3.634 3.634 0 002.136.746 7.294 7.294 0 01-5.467 1.572A10.321 10.321 0 006.655 18z"></Path>
    </Svg>
  </View>
);

export default TwitterIcon;
