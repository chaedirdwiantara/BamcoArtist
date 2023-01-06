import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function PauseIcon({
  width = widthPercentage(41),
  height = widthPercentage(40),
  fill = 'none',
  stroke = '#00D778',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 41 40'}>
        <Path
          d="M14.071 34.285c1.965 0 3.572-1.836 3.572-4.081V9.795c0-2.244-1.607-4.081-3.572-4.081-1.964 0-3.571 1.837-3.571 4.082v20.408c0 2.245 1.607 4.081 3.571 4.081zm10.715-24.49v20.409c0 2.245 1.607 4.081 3.571 4.081 1.964 0 3.572-1.836 3.572-4.081V9.795c0-2.244-1.608-4.081-3.572-4.081s-3.571 1.837-3.571 4.082z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default PauseIcon;
