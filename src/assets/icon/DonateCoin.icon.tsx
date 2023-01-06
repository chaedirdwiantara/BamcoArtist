import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function DonateCoinIcon({
  width = widthPercentage(24),
  height = widthPercentage(24),
  fill = 'none',
  stroke = '#657694',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
        <Path
          d="M10.84 13.54h-1.5c-1.15 0-2.08-.96-2.08-2.15 0-.41.34-.75.75-.75s.75.34.75.75c0 .36.26.65.58.65h1.5c.23 0 .41-.21.41-.47 0-.35-.06-.37-.29-.45l-2.41-.84c-.87-.3-1.3-.91-1.3-1.86 0-1.08.86-1.97 1.91-1.97h1.5c1.15 0 2.08.96 2.08 2.15 0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-.36-.26-.65-.58-.65h-1.5c-.23 0-.41.21-.41.47 0 .35.06.37.29.45l2.41.84c.87.31 1.29.92 1.29 1.86.01 1.09-.85 1.97-1.9 1.97z"
          fill={stroke}
        />
        <Path
          d="M10 14.34c-.41 0-.75-.34-.75-.75v-.74c0-.41.34-.75.75-.75s.75.34.75.75v.74c0 .42-.34.75-.75.75zM10 7.94c-.41 0-.75-.34-.75-.75v-.78c0-.41.34-.75.75-.75s.75.34.75.75v.78c0 .41-.34.75-.75.75z"
          fill={stroke}
        />
        <Path
          d="M9.99 18.72c-4.82 0-8.74-3.92-8.74-8.74s3.92-8.74 8.74-8.74 8.74 3.92 8.74 8.74-3.93 8.74-8.74 8.74zm0-15.97C6 2.75 2.75 6 2.75 9.99S6 17.22 9.99 17.22s7.24-3.25 7.24-7.24-3.25-7.23-7.24-7.23z"
          fill={stroke}
        />
        <Path
          d="M17.021 22.72a5.7 5.7 0 01-4.66-2.42.753.753 0 111.23-.87 4.197 4.197 0 007.63-2.42c0-1.35-.66-2.63-1.76-3.42a.751.751 0 11.88-1.22 5.72 5.72 0 012.38 4.64 5.7 5.7 0 01-5.7 5.71z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default DonateCoinIcon;
