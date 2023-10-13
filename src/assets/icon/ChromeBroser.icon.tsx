import * as React from 'react';
import {View} from 'react-native';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function ChromeBrowserIcon({
  width = widthResponsive(32),
  height = widthResponsive(32),
  fill = '#A2B7DD',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 32 32'}>
        <G clipPath="url(#clip0_8318_62473)">
          <Path
            fill="#fff"
            d="M16 24.901A8.903 8.903 0 0024.903 16a8.903 8.903 0 10-17.805 0A8.903 8.903 0 0016 24.9z"></Path>
          <Path
            fill="#229342"
            d="M4.486 11.624a46.277 46.277 0 00-2.342-3.622A15.997 15.997 0 0016.001 32c1.473-2.066 2.473-3.555 3-4.468 1.012-1.753 2.321-4.264 3.928-7.531v-.002A8 8 0 019.07 20c-2.181-4.069-3.71-6.86-4.585-8.377z"></Path>
          <Path
            fill="#FBC116"
            d="M16.003 31.998a15.996 15.996 0 0013.854-24c-3.031-.298-5.268-.447-6.711-.447-1.636 0-4.018.15-7.144.448L16 8a8 8 0 016.93 12l-6.927 11.998z"></Path>
          <Path
            fill="#1A73E8"
            d="M16.002 22.335a6.334 6.334 0 100-12.667 6.334 6.334 0 000 12.668z"></Path>
          <Path
            fill="#E33B2E"
            d="M16 8h13.855a15.997 15.997 0 00-27.71.002l6.927 12h.002A8 8 0 0116 8z"></Path>
        </G>
        <Defs>
          <ClipPath id="clip0_8318_62473">
            <Path fill="#fff" d="M0 0H32V32H0z"></Path>
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}

export default ChromeBrowserIcon;
