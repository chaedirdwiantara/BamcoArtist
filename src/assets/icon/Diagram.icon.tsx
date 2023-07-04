import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';

function DiagramIcon({
  width = 16,
  height = 16,
  fill = 'none',
  stroke = '#8794AD',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
        <Path
          fill="#657694"
          d="M14.667 15.167H3.333a2.5 2.5 0 01-2.5-2.5V1.333c0-.273.227-.5.5-.5.274 0 .5.227.5.5v11.334c0 .826.674 1.5 1.5 1.5h11.334c.273 0 .5.226.5.5 0 .273-.227.5-.5.5z"></Path>
        <Path
          fill="#657694"
          d="M3.333 11.833a.508.508 0 01-.326-.12.504.504 0 01-.054-.707l3.06-3.573c.334-.387.814-.62 1.32-.64a1.864 1.864 0 011.367.533l.633.634a.86.86 0 00.62.246.815.815 0 00.6-.293l3.06-3.573a.504.504 0 01.707-.054c.207.18.233.494.053.707l-3.06 3.573c-.333.387-.813.62-1.32.64a1.864 1.864 0 01-1.366-.533L8 8.04a.834.834 0 00-.62-.247.815.815 0 00-.6.293L3.72 11.66a.533.533 0 01-.387.173z"></Path>
      </Svg>
    </View>
  );
}

export default DiagramIcon;
