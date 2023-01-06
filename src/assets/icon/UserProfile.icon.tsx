import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function UserProfileIcon({
  width = widthPercentage(25),
  height = widthPercentage(24),
  fill = 'none',
  stroke = '#FF69D2',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 25 24'}>
        <Path
          d="M12.5 12a5 5 0 100-10 5 5 0 000 10zM21.09 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export default UserProfileIcon;
