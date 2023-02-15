import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function InfoCircleIcon({
  width = widthPercentage(20),
  height = widthPercentage(20),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
        <Path
          d="M10 18.958c-4.941 0-8.958-4.016-8.958-8.958S5.059 1.042 10 1.042c4.942 0 8.959 4.016 8.959 8.958S14.942 18.958 10 18.958zm0-16.666C5.75 2.292 2.292 5.75 2.292 10S5.75 17.708 10 17.708 17.71 14.25 17.71 10 14.25 2.292 10 2.292z"
          fill="#fff"
        />
        <Path
          d="M10 11.458a.63.63 0 01-.625-.625V6.667A.63.63 0 0110 6.042a.63.63 0 01.625.625v4.166a.63.63 0 01-.625.625zM10 14.167a.829.829 0 01-.316-.067.963.963 0 01-.275-.175.86.86 0 01-.175-.275.83.83 0 01-.067-.317.83.83 0 01.067-.316c.041-.1.1-.192.175-.275a.96.96 0 01.275-.175.833.833 0 01.633 0c.1.041.192.1.275.175a.963.963 0 01.175.275c.042.1.067.208.067.316a.829.829 0 01-.067.317.86.86 0 01-.175.275.963.963 0 01-.275.175.829.829 0 01-.317.067z"
          fill="#fff"
        />
      </Svg>
    </View>
  );
}

export default InfoCircleIcon;
