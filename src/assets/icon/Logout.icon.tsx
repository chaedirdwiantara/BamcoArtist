import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function LogOutIcon({
  width = widthPercentage(20),
  height = widthPercentage(20),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
        <Path
          d="M12.7 18.558h-.11c-3.7 0-5.483-1.458-5.79-4.725a.626.626 0 01.566-.683.637.637 0 01.683.567c.242 2.616 1.475 3.591 4.55 3.591h.108c3.392 0 4.592-1.2 4.592-4.591V7.283c0-3.391-1.2-4.591-4.591-4.591h-.109c-3.092 0-4.325.991-4.55 3.658a.632.632 0 01-.683.567.626.626 0 01-.575-.675c.283-3.317 2.075-4.8 5.8-4.8h.108c4.092 0 5.842 1.75 5.842 5.841v5.434c0 4.091-1.75 5.841-5.842 5.841z"
          fill={stroke}
        />
        <Path
          d="M12.499 10.625H3.016A.63.63 0 012.39 10a.63.63 0 01.625-.625h9.483a.63.63 0 01.625.625.63.63 0 01-.625.625z"
          fill={stroke}
        />
        <Path
          d="M4.876 13.417a.618.618 0 01-.442-.184l-2.792-2.791a.629.629 0 010-.884l2.792-2.791a.629.629 0 01.883 0 .629.629 0 010 .883L2.967 10l2.35 2.35a.629.629 0 010 .883.605.605 0 01-.441.184z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default LogOutIcon;
