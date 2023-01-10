import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage, widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function AddPostIcon({
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
          d="M20 36.667c9.166 0 16.666-7.5 16.666-16.667 0-9.167-7.5-16.667-16.666-16.667-9.167 0-16.667 7.5-16.667 16.667 0 9.167 7.5 16.667 16.667 16.667z"></Path>
        <Path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 15h6M13 18v-6"></Path>
        <Path
          fill="#fff"
          d="M15 24.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5-3.5 1.57-3.5 3.5z"></Path>
        <Path
          fill="#fff"
          d="M21.5 25c-.273 0-.5-.241-.5-.532v-9.936c0-.29.227-.532.5-.532s.5.241.5.532v9.936c0 .29-.22.532-.5.532z"></Path>
        <Path
          fill="#fff"
          d="M26.272 19c-.22 0-.454-.04-.681-.113l-2.95-.98c-.92-.306-1.641-1.305-1.641-2.27v-.786c0-.646.267-1.206.72-1.539.461-.333 1.075-.4 1.689-.2l2.95.98c.92.306 1.641 1.305 1.641 2.27v.78c0 .646-.267 1.205-.72 1.538-.288.22-.641.32-1.008.32z"></Path>
      </Svg>
    </View>
  );
}

export default AddPostIcon;
