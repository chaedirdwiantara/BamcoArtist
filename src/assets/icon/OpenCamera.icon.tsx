import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function OpenCameraIcon({
  width = widthPercentage(20),
  height = widthPercentage(20),
  fill = 'none',
  stroke = '#657694',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
        <Path
          fill="#8794AD"
          d="M14.367 18.958H5.633c-2.333 0-3.816-1.391-3.95-3.716L1.25 8.367a3.7 3.7 0 011.008-2.8A3.765 3.765 0 015 4.375a.738.738 0 00.65-.408l.6-1.192c.492-.975 1.725-1.733 2.8-1.733h1.908c1.075 0 2.3.758 2.792 1.725l.6 1.216a.744.744 0 00.65.392c1.033 0 2.033.433 2.742 1.192a3.712 3.712 0 011.008 2.8l-.433 6.883c-.15 2.358-1.592 3.708-3.95 3.708zM9.05 2.292c-.617 0-1.4.483-1.683 1.041l-.6 1.2A1.989 1.989 0 015 5.625c-.7 0-1.35.283-1.833.792A2.46 2.46 0 002.5 8.283l.433 6.884c.1 1.683 1.009 2.541 2.7 2.541h8.734c1.683 0 2.591-.858 2.7-2.541l.433-6.884A2.492 2.492 0 0015 5.625a2.005 2.005 0 01-1.767-1.075l-.608-1.217C12.35 2.783 11.567 2.3 10.95 2.3h-1.9v-.008z"></Path>
        <Path
          fill="#8794AD"
          d="M11.25 7.292h-2.5a.63.63 0 01-.625-.625.63.63 0 01.625-.625h2.5a.63.63 0 01.625.625.63.63 0 01-.625.625zM10 15.625a3.332 3.332 0 110-6.667 3.332 3.332 0 110 6.667zm0-5.417a2.084 2.084 0 10.002 4.168A2.084 2.084 0 0010 10.208z"></Path>
      </Svg>
    </View>
  );
}

export default OpenCameraIcon;
