import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const CheckCircle2Icon = ({
  width = widthPercentage(20),
  height = widthPercentage(20),
  fill = 'none',
  stroke = '#292D32',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
      <Path
        fill={'#fff'}
        d="M10 18.958c-4.942 0-8.958-4.016-8.958-8.958S5.058 1.042 10 1.042c4.941 0 8.958 4.016 8.958 8.958S14.942 18.958 10 18.958zm0-16.666C5.75 2.292 2.292 5.75 2.292 10S5.75 17.708 10 17.708 17.708 14.25 17.708 10 14.25 2.292 10 2.292z"></Path>
      <Path
        fill={'#fff'}
        d="M8.817 12.983a.625.625 0 01-.442-.183l-2.358-2.358a.629.629 0 010-.884.629.629 0 01.883 0l1.917 1.917L13.1 7.192a.629.629 0 01.883 0 .629.629 0 010 .883L9.258 12.8a.625.625 0 01-.441.183z"></Path>
    </Svg>
  </View>
);

export default CheckCircle2Icon;
