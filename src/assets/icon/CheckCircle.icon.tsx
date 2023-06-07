import * as React from 'react';
import {View} from 'react-native';
import {widthPercentage} from '../../utils';
import Svg, {Circle, Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';

function CheckCircleIcon({
  width = widthPercentage(16),
  height = widthPercentage(16),
  fill = 'none',
  style,
  bg1 = '#38A772',
  bg2 = '#67CD84',
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
        <Circle cx={8} cy={8} r={8} fill="url(#paint0_linear_1701_87929)" />
        <Path
          d="M4.77 8.063l2.185 2.253a.32.32 0 00.483-.026l3.784-4.87"
          stroke="#fff"
          strokeWidth={1.28}
          strokeLinecap="round"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_1701_87929"
            x1={-1.1408e-7}
            y1={0.880001}
            x2={17.7862}
            y2={3.14772}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor={bg1} />
            <Stop offset={1} stopColor={bg2} />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default CheckCircleIcon;
