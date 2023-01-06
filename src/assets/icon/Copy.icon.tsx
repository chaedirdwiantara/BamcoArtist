import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function CopyIcon({
  width = widthPercentage(16),
  height = widthPercentage(16),
  fill = 'none',
  stroke = '#8794AD',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
        <Path
          d="M7.399 15.167h-2.8c-2.607 0-3.767-1.16-3.767-3.766V8.6c0-2.607 1.16-3.767 3.767-3.767h2.8c2.606 0 3.766 1.16 3.766 3.767v2.8c0 2.606-1.16 3.766-3.766 3.766zm-2.8-9.333c-2.067 0-2.767.7-2.767 2.767v2.8c0 2.066.7 2.766 2.767 2.766h2.8c2.066 0 2.766-.7 2.766-2.766V8.6c0-2.067-.7-2.767-2.766-2.767h-2.8z"
          fill={stroke}
        />
        <Path
          d="M11.399 11.167h-.734a.504.504 0 01-.5-.5V8.601c0-2.067-.7-2.767-2.766-2.767H5.332a.504.504 0 01-.5-.5v-.733c0-2.607 1.16-3.767 3.767-3.767h2.8c2.606 0 3.766 1.16 3.766 3.767v2.8c0 2.606-1.16 3.766-3.766 3.766zm-.234-1h.234c2.066 0 2.766-.7 2.766-2.766V4.6c0-2.067-.7-2.767-2.766-2.767h-2.8c-2.067 0-2.767.7-2.767 2.767v.233h1.567c2.606 0 3.766 1.16 3.766 3.767v1.566z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default CopyIcon;
