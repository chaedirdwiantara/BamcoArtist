import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function CopyrightFansIcon({
  width = widthPercentage(18),
  height = widthPercentage(18),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
        <Circle cx={5} cy={8} r={4.5} stroke="#fff" />
        <Path
          d="M3.38 10V5.636h2.888v.761H4.302v1.04h1.775v.76H4.302V10h-.923z"
          fill="#fff"
        />
      </Svg>
    </View>
  );
}

export default CopyrightFansIcon;
