import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const CommentIcon = ({
  width = widthPercentage(24),
  height = widthPercentage(24),
  fill = 'none',
  stroke = '#657694',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
      <Path
        d="M2.6967 2.6967C4.10316 1.29024 6.01071 0.50007 7.99974 0.5C9.98824 0.502223 11.8947 1.29314 13.3008 2.69923C14.7069 4.10539 15.4978 6.01193 15.5 8.00054V15.5H8C6.01088 15.5 4.10322 14.7098 2.6967 13.3033C1.29018 11.8968 0.5 9.98912 0.5 8C0.5 6.01088 1.29018 4.10322 2.6967 2.6967Z"
        stroke={stroke}
      />
    </Svg>
  </View>
);

export default CommentIcon;
