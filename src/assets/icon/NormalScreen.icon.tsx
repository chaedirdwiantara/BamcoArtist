import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function NormalScreenIcon({
  width = widthPercentage(12),
  height = widthPercentage(12),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 12 12'}>
        <Path
          fillRule="evenodd"
          d="M12 3.973a.746.746 0 00-.746-.746h-2.48V.747a.747.747 0 10-1.494 0v3.226c0 .414.333.747.747.747h3.227A.747.747 0 0012 3.973zM8.027 12a.746.746 0 00.746-.746V8.771h2.48a.747.747 0 100-1.493H8.027a.746.746 0 00-.747.747v3.228c0 .412.333.746.747.746zm-4.054 0a.746.746 0 01-.746-.746V8.771H.747a.747.747 0 110-1.493h3.226a.746.746 0 01.747.747v3.228a.747.747 0 01-.747.746zM0 3.973a.747.747 0 01.747-.746h2.48V.747a.747.747 0 111.493 0v3.226a.746.746 0 01-.747.747H.747A.747.747 0 010 3.973z"
          clipRule="evenodd"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default NormalScreenIcon;
