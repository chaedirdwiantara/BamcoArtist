import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function MusicPlaylistIcon({
  width = widthPercentage(24),
  height = widthPercentage(24),
  fill = 'none',
  stroke = '#8794AD',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
        <Path
          d="M17 22H7c-3 0-5-1.5-5-5v-5c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v5c0 3.5-2 5-5 5zM6 4.5h12M9 2h6"
          stroke={stroke}
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.89 19.11a1.37 1.37 0 100-2.74 1.37 1.37 0 000 2.74z"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15.28 16.83v-5.35c0-1.14-.71-1.3-1.44-1.1l-2.74.75c-.5.14-.84.53-.84 1.1v5.51"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.91 18.2a1.37 1.37 0 100-2.74 1.37 1.37 0 000 2.74zM10.26 13.83l5.02-1.37"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export default MusicPlaylistIcon;
