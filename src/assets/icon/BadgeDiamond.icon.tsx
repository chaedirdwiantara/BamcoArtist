import * as React from 'react';
import {View} from 'react-native';
import Svg, {
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Mask,
  Path,
  Stop,
} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function BadgeDiamondIcon({
  width = widthResponsive(40),
  height = widthResponsive(41),
  fill = '#F4D761',
  stroke = '',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 40 41'}>
        <Path
          d="M62.021 119.105a2.997 2.997 0 01-3.042 0l-48-28.235A3 3 0 019.5 88.284V31.716a3 3 0 011.479-2.586l48-28.235a3 3 0 013.042 0l48 28.235a3 3 0 011.479 2.586v56.568a3 3 0 01-1.479 2.586l-48 28.235z"
          fill="url(#paint0_linear_10972_56709)"
        />
        <Path
          d="M104.866 33.344h0L61.158 8.414a2 2 0 00-1.982 0l-43.708 24.93a2 2 0 00-1.009 1.737v49.838a2 2 0 001.01 1.737l43.707 24.93c.614.35 1.368.35 1.982 0l43.708-24.93a2 2 0 001.009-1.737V35.081a2 2 0 00-1.009-1.737z"
          fill="url(#paint1_linear_10972_56709)"
          stroke="url(#paint2_linear_10972_56709)"
          strokeWidth={2}
        />
        <Path
          opacity={0.7}
          d="M88.477 75l2.05-.34a4.35 4.35 0 003.573-3.596L94.438 69l.337 2.064a4.35 4.35 0 003.573 3.596l2.051.34-2.05.34a4.35 4.35 0 00-3.574 3.596L94.438 81l-.338-2.064a4.35 4.35 0 00-3.573-3.596l-2.05-.34z"
          fill="#fff"
        />
        <Path
          opacity={0.8}
          d="M24.398 83.25l1.282-.212a2.719 2.719 0 002.233-2.248l.211-1.29.211 1.29a2.718 2.718 0 002.233 2.248l1.282.212-1.282.212a2.718 2.718 0 00-2.233 2.248l-.21 1.29-.212-1.29a2.719 2.719 0 00-2.233-2.248l-1.282-.212z"
          fill="#fff"
        />
        <Path
          opacity={0.7}
          d="M36.25 28.737l1.533-.254a3.252 3.252 0 002.671-2.69l.253-1.542.252 1.543a3.252 3.252 0 002.672 2.689l1.533.254-1.533.254a3.252 3.252 0 00-2.672 2.689l-.252 1.543-.253-1.543a3.252 3.252 0 00-2.671-2.69l-1.533-.253z"
          fill="#fff"
        />
        <G filter="url(#filter0_d_10972_56709)">
          <Path
            d="M47.295 47.547a.349.349 0 01.636 0l15.45 34.373a.349.349 0 01-.319.492H32.164a.349.349 0 01-.318-.492l15.449-34.373z"
            fill="#9E7AD8"
          />
          <G filter="url(#filter1_d_10972_56709)">
            <Path
              d="M59.74 54.112a.698.698 0 01.99 0l26.934 27.11a.698.698 0 01-.495 1.19H33.302a.698.698 0 01-.495-1.19l26.933-27.11z"
              fill="#784FB9"
            />
          </G>
          <Path
            d="M70.842 47.547a.349.349 0 01.636 0l15.45 34.373a.349.349 0 01-.32.492H55.712a.349.349 0 01-.318-.492l15.449-34.373z"
            fill="#9E7AD8"
          />
          <Path
            d="M29.938 42.207c0-.676.864-.957 1.262-.41l13.762 18.906L58.483 81.42a.698.698 0 01-.584 1.08H30.635a.698.698 0 01-.698-.698V42.207z"
            fill="#E1D3FA"
          />
          <Path
            d="M29.938 42.939c0-.732.982-.97 1.318-.32l20.56 39.882h-21.18a.698.698 0 01-.698-.698V42.939z"
            fill="url(#paint3_linear_10972_56709)"
          />
          <Path
            d="M88.688 42.207c0-.676-.865-.957-1.263-.41L73.665 60.702 60.142 81.42a.698.698 0 00.584 1.08H87.99a.698.698 0 00.698-.698V42.207z"
            fill="#E1D3FA"
          />
          <Path
            d="M88.688 43.055c0-.738-.998-.97-1.324-.309L67.99 82.027a.698.698 0 01-.618.39l-7.936.084H87.99a.698.698 0 00.698-.698V43.055z"
            fill="url(#paint4_linear_10972_56709)"
          />
          <Path
            d="M58.963 33.578c.212-.637 1.112-.637 1.324 0l16.008 47.995a.698.698 0 01-.662.919H43.617a.698.698 0 01-.662-.919l16.008-47.995z"
            fill="url(#paint5_linear_10972_56709)"
          />
          <Path
            d="M59.625 35.784c0-.788 1.103-.972 1.358-.226l15.758 46.01a.698.698 0 01-.66.924H60.322a.698.698 0 01-.698-.698v-46.01z"
            fill="url(#paint6_linear_10972_56709)"
          />
          <Ellipse
            cx={31.6035}
            cy={44.9865}
            rx={5.03316}
            ry={5.06606}
            fill="#A98ADC"
          />
          <Ellipse
            cx={59.705}
            cy={36.5416}
            rx={5.03316}
            ry={5.06606}
            fill="#BD9FED"
          />
          <Ellipse
            cx={46.7644}
            cy={46.8386}
            rx={3.36593}
            ry={3.38793}
            fill="#9E7AD8"
          />
          <Ellipse
            cx={72.0066}
            cy={46.8386}
            rx={3.36593}
            ry={3.38793}
            fill="#9E7AD8"
          />
          <Ellipse
            cx={87.8066}
            cy={44.985}
            rx={5.03316}
            ry={5.06606}
            fill="#C7B1EA"
          />
        </G>
        <Defs>
          <LinearGradient
            id="paint0_linear_10972_56709"
            x1={45.9792}
            y1={123.673}
            x2={45.9792}
            y2={-3.89608}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#9E77EA" />
            <Stop offset={0.366886} stopColor="#BB8DEE" />
            <Stop offset={1} stopColor="#CB88E3" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_10972_56709"
            x1={60.1672}
            y1={111}
            x2={60.1672}
            y2={8.99999}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#8B6BC0" />
            <Stop offset={0.460638} stopColor="#B49DDB" />
            <Stop offset={1} stopColor="#603B9E" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_10972_56709"
            x1={60.1672}
            y1={111}
            x2={60.1672}
            y2={4.48671}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FAEEFF" />
            <Stop offset={0.460638} stopColor="#B674D1" />
            <Stop offset={1} stopColor="#7F52D4" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_10972_56709"
            x1={35.039}
            y1={43.5323}
            x2={44.4139}
            y2={82.4729}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#E5E3EA" />
            <Stop offset={0.0001} stopColor="#B295E3" />
            <Stop offset={1} stopColor="#8B68C4" />
          </LinearGradient>
          <LinearGradient
            id="paint4_linear_10972_56709"
            x1={74.0624}
            y1={40.0625}
            x2={74.0624}
            y2={82.5005}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#DAC9F6" />
            <Stop offset={1} stopColor="#8C65CC" />
          </LinearGradient>
          <LinearGradient
            id="paint5_linear_10972_56709"
            x1={59.625}
            y1={31.5928}
            x2={59.625}
            y2={82.4917}
            gradientUnits="userSpaceOnUse">
            <Stop offset={0.325219} stopColor="#F1E8FF" />
            <Stop offset={1} stopColor="#8D68C9" />
          </LinearGradient>
          <LinearGradient
            id="paint6_linear_10972_56709"
            x1={59.6248}
            y1={31.5928}
            x2={59.6248}
            y2={82.4917}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#CAAFF7" />
            <Stop offset={1} stopColor="#8D68C9" />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default BadgeDiamondIcon;
