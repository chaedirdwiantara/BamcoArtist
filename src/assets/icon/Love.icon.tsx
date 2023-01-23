import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const LoveIcon = ({
  width = 18,
  height = 16,
  fill = 'none',
  stroke = '#292D32',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 18 16'}>
      <Path
        d="M8.498 2.816l.5.669.5-.669a4 4 0 013.2-1.608c2.21 0 4.009 1.8 4.009 4.034 0 .923-.148 1.775-.403 2.566l-.002.004c-.613 1.941-1.873 3.514-3.243 4.691-1.373 1.18-2.82 1.932-3.745 2.247h0l-.007.002c-.054.02-.166.04-.309.04-.142 0-.254-.02-.308-.04h0l-.007-.002c-.925-.315-2.372-1.067-3.745-2.247-1.37-1.177-2.63-2.75-3.244-4.691h0l-.001-.004a8.274 8.274 0 01-.403-2.566c0-2.233 1.798-4.034 4.008-4.034 1.303 0 2.47.633 3.2 1.608z"
        stroke={stroke}
        fill={fill}
      />
    </Svg>
  </View>
);

export default LoveIcon;
