import * as React from 'react';
import {View} from 'react-native';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';
import {widthPercentage} from '../../utils';

const TooltipIcon = ({
  width = widthPercentage(14),
  height = widthPercentage(14),
  fill = 'none',
  stroke = '#98A2B3',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox="0 0 12 12">
      <G clipPath="url(#clip0_3019_222057)">
        <Path
          d="M4.545 4.5A1.5 1.5 0 017.46 5c0 1-1.5 1.5-1.5 1.5m.04 2h.005M11 6A5 5 0 111 6a5 5 0 0110 0z"
          stroke={stroke}
          strokeWidth={1.33333}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3019_222057">
          <Path fill="#fff" d="M0 0H12V12H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  </View>
);

export default TooltipIcon;
