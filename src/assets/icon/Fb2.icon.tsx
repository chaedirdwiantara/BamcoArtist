import * as React from 'react';
import {View} from 'react-native';
import {ms} from 'react-native-size-matters';
import Svg, {Circle, G, Path, Defs, ClipPath} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';

function Fb2Icon({
  width = ms(24),
  height = ms(24),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
        <Circle cx={12} cy={12} r={12} fill="#353E4E" />
        <G clipPath="url(#clip0_1469_108786)">
          <Path
            d="M14.994 6.087V7.99h-1.051c-.384 0-.643.087-.777.26-.133.173-.2.433-.2.779v1.363h1.96l-.26 2.134h-1.7V18h-2.048v-5.474H9.21v-2.134h1.707V8.82c0-.895.232-1.588.696-2.08.464-.494 1.082-.74 1.854-.74.655 0 1.164.029 1.526.087z"
            fill="#fff"
          />
        </G>
        <Defs>
          <ClipPath id="clip0_1469_108786">
            <Path fill="#fff" transform="translate(9 6)" d="M0 0H6V12H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}

export default Fb2Icon;
