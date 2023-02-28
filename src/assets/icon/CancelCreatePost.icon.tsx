import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage, widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function CancelCreatePostIcon({
  width = widthResponsive(40),
  height = widthResponsive(40),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 40 40'}>
        <Path
          fill="#00D778"
          stroke="#00D778"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M20 36.667c9.167 0 16.667-7.5 16.667-16.666 0-9.167-7.5-16.667-16.666-16.667-9.167 0-16.667 7.5-16.667 16.667 0 9.166 7.5 16.666 16.667 16.666z"></Path>
        <Path
          fill="#fff"
          d="M20 21.167l-4.083 4.084a.79.79 0 01-.583.229.79.79 0 01-.583-.23.79.79 0 01-.23-.583.79.79 0 01.23-.583l4.083-4.083-4.083-4.084a.79.79 0 01-.23-.583.79.79 0 01.23-.583.79.79 0 01.583-.23.79.79 0 01.583.23l4.084 4.083 4.083-4.083a.79.79 0 01.583-.23.79.79 0 01.584.23.79.79 0 01.229.583.79.79 0 01-.23.583l-4.083 4.084 4.084 4.083a.79.79 0 01.229.583.79.79 0 01-.23.584.79.79 0 01-.583.229.79.79 0 01-.583-.23l-4.083-4.083z"></Path>
      </Svg>
    </View>
  );
}

export default CancelCreatePostIcon;
