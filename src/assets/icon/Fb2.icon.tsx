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
      {/* <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
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
      </Svg> */}

      {/* <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
        <Path
          d="M14.9936 6.08654V7.99038H13.9428C13.5591 7.99038 13.3003 8.07692 13.1664 8.25C13.0326 8.42308 12.9656 8.68269 12.9656 9.02885V10.3918H14.9266L14.6656 12.5264H12.9656V18H10.9176V12.5264H9.21094V10.3918H10.9176V8.81971C10.9176 7.92548 11.1496 7.23197 11.6137 6.73918C12.0777 6.24639 12.6957 6 13.4676 6C14.1235 6 14.6321 6.02885 14.9936 6.08654Z"
          fill="white"
        />
      </Svg> */}

      <Svg width={'200%'} height={'200%'} fill={fill} viewBox={'0 0 20 26'}>
        <Path
          d="M5.99355 0.0865385V1.99038H4.94278C4.55905 1.99038 4.30026 2.07692 4.16641 2.25C4.03255 2.42308 3.96562 2.68269 3.96562 3.02885V4.39183H5.92663L5.6656 6.52644H3.96562V12H1.91761V6.52644H0.210938V4.39183H1.91761V2.81971C1.91761 1.92548 2.14963 1.23197 2.61367 0.739183C3.07771 0.246394 3.69568 0 4.46759 0C5.12348 0 5.63214 0.0288462 5.99355 0.0865385Z"
          fill="white"
        />
      </Svg>
    </View>
  );
}

export default Fb2Icon;
