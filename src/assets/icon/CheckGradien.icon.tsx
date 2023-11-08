import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Defs, LinearGradient, Path, Stop} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const CheckGradientIcon = ({
  width = widthPercentage(65),
  height = widthPercentage(64),
  fill = 'none',
  stroke = '#292D32',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 65 64'}>
      <Circle
        cx="32.5"
        cy="32"
        r="32"
        fill="url(#paint0_linear_3166_163497)"></Circle>
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth="4"
        d="M19.598 32.252l8.162 8.418a2 2 0 003.015-.165l14.63-18.827"></Path>
      <Defs>
        <LinearGradient
          id="paint0_linear_3166_163497"
          x1="0.5"
          x2="71.645"
          y1="3.52"
          y2="12.591"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#00D778"></Stop>
          <Stop offset="1" stopColor="#00D778"></Stop>
        </LinearGradient>
      </Defs>
    </Svg>
  </View>
);

export default CheckGradientIcon;
