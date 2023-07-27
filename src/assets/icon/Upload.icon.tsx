import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, G, Path, Defs, ClipPath} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const UploadIcon = ({
  width = widthPercentage(24),
  height = widthPercentage(24),
  fill = 'none',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
      <Circle cx={12} cy={12} r={12} fill="#FF69D2" />
      <G clipPath="url(#clip0_4490_1776)">
        <Path
          d="M14.375 14l-2-2m0 0l-2 2m2-2v4.5m4.195-1.305a2.5 2.5 0 00-1.195-4.695h-.63a4 4 0 10-6.87 3.65"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4490_1776">
          <Path fill="#fff" transform="translate(6.375 6)" d="M0 0H12V12H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  </View>
);

export default UploadIcon;
