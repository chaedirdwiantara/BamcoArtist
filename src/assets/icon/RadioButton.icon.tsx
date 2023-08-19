import * as React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const RadioButtonIcon = ({
  width = widthPercentage(19),
  height = widthPercentage(19),
  fill = '#fff',
  stroke = '#FFF',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={'none'} viewBox={'0 0 20 20'}>
      <G clipPath="url(#clip0_1_88289)">
        <Rect
          width={19}
          height={19}
          x={0.5}
          y={0.5}
          stroke="#48546A"
          rx={9.5}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_88289">
          <Path fill={fill} d="M0 0H20V20H0z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  </View>
);

export default RadioButtonIcon;
