import * as React from 'react';
import {View} from 'react-native';
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function HeartIcon({
  width = widthPercentage(16),
  height = widthPercentage(16),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
        <G clipPath="url(#clip0_331_44502)">
          <Path
            d="M11.666 1.278A4.267 4.267 0 008 3.478a4.267 4.267 0 00-3.667-2.2A4.533 4.533 0 000 5.978c0 3.031 3.19 6.342 5.866 8.587a3.316 3.316 0 004.267 0C12.81 12.32 16 9.009 16 5.978a4.533 4.533 0 00-4.334-4.7z"
            fill="url(#paint0_linear_331_44502)"
          />
        </G>
        <Defs>
          <LinearGradient
            id="paint0_linear_331_44502"
            x1={0.877671}
            y1={3.03608}
            x2={16.9879}
            y2={4.49937}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FF9DCC" />
            <Stop offset={1} stopColor="#FF69D2" />
          </LinearGradient>
          <ClipPath id="clip0_331_44502">
            <Path fill="#fff" d="M0 0H16V16H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}

export default HeartIcon;
