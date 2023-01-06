import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function PublicIcon({
  width = widthPercentage(14),
  height = widthPercentage(14),
  fill = 'none',
  stroke = '#8794AD',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 14 14'}>
        <Path
          d="M6.999.333A6.67 6.67 0 00.332 7a6.67 6.67 0 006.667 6.666A6.67 6.67 0 0013.665 7 6.67 6.67 0 007 .333zm-.667 11.953A5.326 5.326 0 011.665 7c0-.414.054-.807.14-1.194L5 9v.666c0 .734.6 1.334 1.333 1.334v1.286zm4.6-1.693a1.323 1.323 0 00-1.267-.927H9v-2c0-.366-.3-.666-.667-.666h-4V5.666h1.333c.367 0 .667-.3.667-.666V3.666h1.333C8.4 3.666 9 3.066 9 2.333V2.06A5.336 5.336 0 0112.332 7a5.305 5.305 0 01-1.4 3.593z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default PublicIcon;
