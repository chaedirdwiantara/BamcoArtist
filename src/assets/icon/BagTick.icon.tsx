import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function BagTick({
  width = widthPercentage(24),
  height = widthPercentage(24),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} viewBox="0 0 24 24" fill={fill}>
        <Path
          d="M9.62012 16L11.1201 17.5L14.3701 14.5"
          stroke={stroke}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M8.81043 2L5.19043 5.63"
          stroke={stroke}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M15.1904 2L18.8104 5.63"
          stroke={stroke}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M2 7.8501C2 6.0001 2.99 5.8501 4.22 5.8501H19.78C21.01 5.8501 22 6.0001 22 7.8501C22 10.0001 21.01 9.8501 19.78 9.8501H4.22C2.99 9.8501 2 10.0001 2 7.8501Z"
          stroke={stroke}
          stroke-width="1.5"
        />
        <Path
          d="M3.5 10L4.91 18.64C5.23 20.58 6 22 8.86 22H14.89C18 22 18.46 20.64 18.82 18.76L20.5 10"
          stroke={stroke}
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </Svg>
    </View>
  );
}

export default BagTick;
