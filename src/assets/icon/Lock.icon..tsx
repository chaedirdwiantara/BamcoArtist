import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function LockIcon({
  width = widthPercentage(16),
  height = widthPercentage(16),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width="16" height="16" viewBox="0 0 16 16" fill={fill}>
        <Path
          d="M8.00065 10.5V12.1667M3.00065 15.5H13.0006C13.9211 15.5 14.6673 14.7538 14.6673 13.8333V8.83333C14.6673 7.91286 13.9211 7.16667 13.0006 7.16667H3.00065C2.08018 7.16667 1.33398 7.91286 1.33398 8.83333V13.8333C1.33398 14.7538 2.08018 15.5 3.00065 15.5ZM11.334 7.16667V3.83333C11.334 1.99238 9.8416 0.5 8.00065 0.5C6.1597 0.5 4.66732 1.99238 4.66732 3.83333V7.16667H11.334Z"
          stroke="#8794AD"
          stroke-linecap="round"
        />
      </Svg>
    </View>
  );
}

export default LockIcon;
