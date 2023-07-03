import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function DollarSign({
  width = widthPercentage(18),
  height = widthPercentage(18),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={width} height={height} viewBox="0 0 16 16" fill={fill}>
        <Path
          d="M8.93319 11.6134H7.25986C6.16653 11.6134 5.27986 10.6934 5.27986 9.56005C5.27986 9.28672 5.50653 9.06005 5.77986 9.06005C6.05319 9.06005 6.27986 9.28672 6.27986 9.56005C6.27986 10.1401 6.71986 10.6134 7.25986 10.6134H8.93319C9.36653 10.6134 9.72653 10.2267 9.72653 9.76005C9.72653 9.18005 9.51986 9.06672 9.17986 8.94672L6.49319 8.00005C5.97319 7.82005 5.27319 7.43339 5.27319 6.24005C5.27319 5.21339 6.07986 4.38672 7.06653 4.38672H8.73986C9.83319 4.38672 10.7199 5.30672 10.7199 6.44005C10.7199 6.71339 10.4932 6.94005 10.2199 6.94005C9.94653 6.94005 9.71986 6.71339 9.71986 6.44005C9.71986 5.86005 9.27986 5.38672 8.73986 5.38672H7.06653C6.63319 5.38672 6.27319 5.77339 6.27319 6.24005C6.27319 6.82005 6.47986 6.93339 6.81986 7.05339L9.50653 8.00005C10.0265 8.18005 10.7265 8.56672 10.7265 9.76005C10.7199 10.7801 9.91986 11.6134 8.93319 11.6134Z"
          fill={stroke}
        />
        <Path
          d="M8 12.5C7.72667 12.5 7.5 12.2733 7.5 12V4C7.5 3.72667 7.72667 3.5 8 3.5C8.27333 3.5 8.5 3.72667 8.5 4V12C8.5 12.2733 8.27333 12.5 8 12.5Z"
          fill={stroke}
        />
        <Path
          d="M7.99992 15.1668C4.04659 15.1668 0.833252 11.9535 0.833252 8.00016C0.833252 4.04683 4.04659 0.833496 7.99992 0.833496C11.9533 0.833496 15.1666 4.04683 15.1666 8.00016C15.1666 11.9535 11.9533 15.1668 7.99992 15.1668ZM7.99992 1.8335C4.59992 1.8335 1.83325 4.60016 1.83325 8.00016C1.83325 11.4002 4.59992 14.1668 7.99992 14.1668C11.3999 14.1668 14.1666 11.4002 14.1666 8.00016C14.1666 4.60016 11.3999 1.8335 7.99992 1.8335Z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default DollarSign;