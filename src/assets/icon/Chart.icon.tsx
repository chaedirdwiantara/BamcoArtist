import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function ChartIcon({
  width = widthPercentage(32),
  height = widthPercentage(32),
  fill = '#fff',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 32 32'}>
        <Circle cx="16" cy="16" r="16" fill="#FF69D2"></Circle>
        <Path
          fill={fill}
          d="M16 23.167c-.447 0-.9-.114-1.3-.347l-3.96-2.287a2.618 2.618 0 01-1.3-2.253v-4.56c0-.927.5-1.787 1.3-2.253L14.7 9.18a2.59 2.59 0 012.6 0l3.96 2.287c.8.466 1.3 1.326 1.3 2.253v4.56c0 .927-.5 1.787-1.3 2.253L17.3 22.82c-.4.233-.853.347-1.3.347zm0-13.334c-.273 0-.553.074-.8.214l-3.96 2.286c-.493.287-.8.814-.8 1.387v4.56c0 .567.307 1.1.8 1.387l3.96 2.286a1.596 1.596 0 001.6 0l3.96-2.286c.493-.287.8-.814.8-1.387v-4.56c0-.567-.306-1.1-.8-1.387l-3.96-2.286a1.635 1.635 0 00-.8-.214z"></Path>
        <Path
          fill={fill}
          d="M15.393 18.447c-.24 0-.466-.06-.673-.174-.46-.266-.727-.806-.727-1.48v-1.6c0-.673.267-1.213.727-1.48.46-.266 1.06-.226 1.64.114l1.387.8c.58.333.92.833.92 1.366 0 .534-.334 1.027-.92 1.367l-1.387.8c-.32.194-.653.287-.966.287zm.007-3.9a.35.35 0 00-.173.04c-.14.08-.227.306-.227.613v1.6c0 .3.087.527.227.613.14.08.38.04.64-.113l1.386-.8c.26-.153.414-.34.414-.5 0-.16-.154-.347-.414-.5l-1.386-.8c-.174-.1-.34-.153-.467-.153z"></Path>
      </Svg>
    </View>
  );
}

export default ChartIcon;
