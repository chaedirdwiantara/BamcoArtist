import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function BlitzIcon({
  width = widthPercentage(32),
  height = widthPercentage(32),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 32 32'}>
        <Circle cx="16" cy="16" r="16" fill="#FF69D2"></Circle>
        <Path
          fill="#fff"
          d="M14.66 23.166a.827.827 0 01-.32-.06c-.267-.1-.72-.426-.72-1.46v-4.3h-1.56c-.893 0-1.213-.42-1.327-.666-.113-.254-.213-.767.374-1.44l5.046-5.734c.68-.773 1.234-.72 1.5-.62.267.1.72.427.72 1.46v4.3h1.56c.894 0 1.214.42 1.327.667.113.253.213.767-.373 1.44l-5.047 5.733c-.473.54-.887.68-1.18.68zm2.627-13.34c-.02.027-.16.094-.38.347l-5.047 5.733c-.187.214-.213.347-.213.374.013.006.133.073.413.073h2.06c.273 0 .5.227.5.5v4.8c0 .333.06.48.087.52.02-.027.16-.093.38-.347l5.046-5.733c.187-.213.214-.347.214-.373-.014-.007-.134-.074-.414-.074h-2.06a.504.504 0 01-.5-.5v-4.8c.007-.333-.06-.473-.086-.52z"
        />
      </Svg>
    </View>
  );
}

export default BlitzIcon;
