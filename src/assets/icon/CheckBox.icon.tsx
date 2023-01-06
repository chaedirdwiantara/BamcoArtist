import * as React from 'react';
import {View} from 'react-native';
import {widthPercentage} from '../../utils';
import Svg, {G, Rect, Path, Defs, ClipPath} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';

function CheckBoxIcon({
  width = widthPercentage(24),
  height = widthPercentage(24),
  fill = 'none',
  active = true,
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
        {active ? (
          <G clipPath="url(#clip0_1391_33529)">
            <Rect width={20} height={20} rx={6} fill="#00CE61" />
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              fill="#fff"
            />
          </G>
        ) : (
          <G clipPath="url(#clip0_1391_51517)">
            <Rect
              x={0.5}
              y={0.5}
              width={19}
              height={19}
              rx={5.5}
              fill="#141921"
              stroke="#2B3240"
            />
          </G>
        )}
        <Defs>
          <ClipPath id="clip0_1391_33529">
            <Path fill="#fff" d="M0 0H20V20H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}

export default CheckBoxIcon;
