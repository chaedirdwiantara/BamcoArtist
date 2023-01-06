import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function PauseIcon2({
  width = widthPercentage(24),
  height = widthPercentage(32),
  fill = 'none',
  stroke = '#00D778',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 32'}>
        <Path
          d="M3.929 31.714c2.16 0 3.928-2.02 3.928-4.49V4.776c0-2.47-1.768-4.49-3.928-4.49C1.768.286 0 2.306 0 4.776v22.448c0 2.47 1.768 4.49 3.929 4.49zM15.714 4.776v22.448c0 2.47 1.768 4.49 3.929 4.49 2.16 0 3.928-2.02 3.928-4.49V4.776c0-2.47-1.767-4.49-3.928-4.49-2.16 0-3.929 2.02-3.929 4.49z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default PauseIcon2;
