import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function VolumeIcon({
  width = widthPercentage(16),
  height = widthPercentage(16),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
        <Path
          d="M8.367 13.727c-.527 0-1.107-.187-1.687-.554l-1.947-1.22a.863.863 0 00-.44-.126h-.96c-1.613 0-2.5-.887-2.5-2.5V6.66c0-1.613.887-2.5 2.5-2.5h.954a.863.863 0 00.44-.127l1.946-1.22c.974-.606 1.92-.72 2.667-.306.747.413 1.153 1.273 1.153 2.426v6.114c0 1.146-.413 2.013-1.153 2.426a1.895 1.895 0 01-.973.254zm-5.034-8.56c-1.053 0-1.5.446-1.5 1.5v2.666c0 1.054.447 1.5 1.5 1.5h.954c.346 0 .68.094.973.28l1.947 1.22c.646.4 1.246.507 1.653.28.407-.226.64-.793.64-1.546V4.94c0-.76-.233-1.327-.64-1.547-.407-.226-1.013-.126-1.653.28L5.253 4.887c-.286.186-.626.28-.966.28h-.954zM14.667 9.807a.495.495 0 01-.354-.147l-2.64-2.64a.503.503 0 010-.707.503.503 0 01.707 0l2.64 2.64a.503.503 0 010 .707.524.524 0 01-.353.147z"
          fill={stroke}
        />
        <Path
          d="M12 9.833a.495.495 0 01-.353-.146.503.503 0 010-.707l2.64-2.64a.503.503 0 01.706 0 .503.503 0 010 .707l-2.64 2.64c-.1.1-.226.146-.353.146z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default VolumeIcon;
