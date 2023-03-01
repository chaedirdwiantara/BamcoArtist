import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage, widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function Gift2Icon({
  width = widthResponsive(20),
  height = widthResponsive(20),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
        <Path
          stroke="#fff"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="1.25"
          d="M10 4.063V6.25m0-2.188a2.187 2.187 0 112.188 2.188H10m0-2.188A2.187 2.187 0 107.812 6.25H10"></Path>
        <Path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          d="M16.25 6.25H3.75c-.69 0-1.25.56-1.25 1.25v1.875c0 .69.56 1.25 1.25 1.25h12.5c.69 0 1.25-.56 1.25-1.25V7.5c0-.69-.56-1.25-1.25-1.25z"></Path>
        <Path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
          d="M16.25 10.625v5.625a1.875 1.875 0 01-1.875 1.875h-8.75A1.875 1.875 0 013.75 16.25v-5.625M10 6.25v11.875"></Path>
      </Svg>
    </View>
  );
}

export default Gift2Icon;
