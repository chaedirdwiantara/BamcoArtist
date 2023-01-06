import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function AddCircleIcon({
  width = widthPercentage(20),
  height = widthPercentage(20),
  fill = 'none',
  stroke = '#8794AD',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
        <Path
          d="M10.001 18.959c-4.941 0-8.958-4.017-8.958-8.959 0-4.941 4.017-8.958 8.958-8.958 4.942 0 8.959 4.017 8.959 8.958 0 4.942-4.017 8.959-8.959 8.959zm0-16.667c-4.25 0-7.708 3.458-7.708 7.708s3.458 7.709 7.708 7.709S17.71 14.25 17.71 10 14.25 2.292 10 2.292z"
          fill={stroke}
        />
        <Path
          d="M13.335 10.625H6.668A.63.63 0 016.043 10a.63.63 0 01.625-.625h6.667a.63.63 0 01.625.625.63.63 0 01-.625.625z"
          fill={stroke}
        />
        <Path
          d="M10 13.959a.63.63 0 01-.625-.625V6.667A.63.63 0 0110 6.042a.63.63 0 01.625.625v6.667a.63.63 0 01-.625.625z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default AddCircleIcon;
