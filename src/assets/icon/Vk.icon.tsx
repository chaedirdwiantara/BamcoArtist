import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';
import {ms} from 'react-native-size-matters';

const VkIcon = ({
  width = ms(26),
  height = ms(26),
  fill = '#E0E0E0',
  stroke = '#292D32',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 26 26'}>
      <Path
        fill={fill}
        d="M14.097 20.292c-7.902 0-12.38-5.425-12.556-14.584h3.952c.087 6.67 3.073 9.515 5.356 10.049V5.708h3.687v5.78c2.283-.266 4.654-2.845 5.444-5.78h3.688c-.615 3.557-3.249 6.225-5.093 7.292 1.844.89 4.83 3.201 5.883 7.292h-4.127c-.878-2.757-3.073-4.891-5.97-5.247v5.247h-.264z"></Path>
    </Svg>
  </View>
);

export default VkIcon;
