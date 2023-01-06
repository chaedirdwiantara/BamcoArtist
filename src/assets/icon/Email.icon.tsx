import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function EmailIcon({
  width = widthPercentage(16),
  height = widthPercentage(14),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 14'}>
        <Path
          d="M0.5 3.66602L7.0755 8.04968C7.63533 8.4229 8.36467 8.4229 8.9245 8.04968L15.5 3.66602M2.16667 12.8327H13.8333C14.7538 12.8327 15.5 12.0865 15.5 11.166V2.83268C15.5 1.91221 14.7538 1.16602 13.8333 1.16602H2.16667C1.24619 1.16602 0.5 1.91221 0.5 2.83268V11.166C0.5 12.0865 1.24619 12.8327 2.16667 12.8327Z"
          stroke="#8794AD"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
}

export default EmailIcon;
