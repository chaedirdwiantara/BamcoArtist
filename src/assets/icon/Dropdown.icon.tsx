import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function DropDownIcon({
  width = widthResponsive(24),
  height = widthResponsive(24),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
        <Path
          d="M11.703 16.8a1.5 1.5 0 110 3.001 1.5 1.5 0 010-3zm0-6a1.5 1.5 0 110 3.001 1.5 1.5 0 010-3zm0-6a1.5 1.5 0 110 3.001 1.5 1.5 0 010-3z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default DropDownIcon;
