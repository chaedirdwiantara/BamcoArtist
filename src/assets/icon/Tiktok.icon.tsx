import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';
import {ms} from 'react-native-size-matters';

const TiktokIcon = ({
  width = ms(20),
  height = ms(20),
  fill = '#E0E0E0',
  stroke = '#292D32',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
      <Path
        fill={fill}
        d="M18.747 8.202a8.205 8.205 0 01-4.795-1.533v6.981a6.35 6.35 0 11-5.478-6.292v3.512a2.915 2.915 0 102.04 2.78V.002h3.438c-.003.29.022.58.072.866a4.773 4.773 0 002.106 3.134 4.743 4.743 0 002.617.787v3.413z"></Path>
    </Svg>
  </View>
);

export default TiktokIcon;
