import * as React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const PressedRadioIcon = ({
  width = widthPercentage(24),
  height = widthPercentage(24),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill="none" viewBox={'0 0 24 24'}>
      <G clipPath="url(#clip0_1_88437)">
        <Rect
          width={19}
          height={19}
          x={2.5}
          y={2.5}
          stroke="#FF69D2"
          rx={9.5}></Rect>
        <Rect width={10} height={10} x={7} y={7} fill="#FF69D2" rx={5}></Rect>
      </G>
      <Rect
        width={22}
        height={22}
        x={1}
        y={1}
        stroke="#D700A8"
        strokeLinejoin="round"
        strokeOpacity={0.15}
        strokeWidth={2}
        rx={11}></Rect>
      <Defs>
        <ClipPath id="clip0_1_88437">
          <Path fill="#fff" d="M0 0H20V20H0z" transform="translate(2 2)"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  </View>
);

export default PressedRadioIcon;
