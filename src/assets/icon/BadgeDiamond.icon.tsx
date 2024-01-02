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
          d="M21.521 39.605a3 3 0 01-3.042 0l-14-8.235A3 3 0 013 28.784V12.216A3 3 0 014.479 9.63l14-8.235a3 3 0 013.042 0l14 8.235A3 3 0 0137 12.216v16.568a3 3 0 01-1.479 2.586l-14 8.235z"
          fill="url(#paint0_linear_10975_62081)"
        />
        <Path
          d="M34.788 30.156l-.496-.868.496.868a2 2 0 001.009-1.737V12.581a2 2 0 00-1.01-1.737l-13.902-7.93a2 2 0 00-1.982 0l-13.902 7.93a2 2 0 00-1.01 1.737v15.838a2 2 0 001.01 1.737l13.902 7.93.496-.869-.496.87a2 2 0 001.982 0l-.48-.842.48.841 13.903-7.93z"
          fill="url(#paint1_linear_10975_62081)"
          stroke="url(#paint2_linear_10975_62081)"
          strokeWidth={2}
        />
        <G filter="url(#filter0_d_10975_62081)">
          <Path fill="#B49DDB" d="M10 23.5H29.3333V27.83333H10z" />
        </G>
        <Path
          opacity={0.7}
          d="M29.328 25.5l.684-.113a1.45 1.45 0 001.19-1.2l.113-.687.113.688c.1.615.58 1.097 1.19 1.199l.684.113-.683.113a1.45 1.45 0 00-1.191 1.2l-.113.687-.112-.688a1.45 1.45 0 00-1.191-1.199l-.684-.113z"
          fill="#fff"
        />
        <Path
          opacity={0.8}
          d="M9.969 30.25l.427-.07a.906.906 0 00.744-.75l.07-.43.071.43a.906.906 0 00.744.75l.428.07-.428.07a.906.906 0 00-.744.75l-.07.43-.07-.43a.906.906 0 00-.745-.75l-.427-.07z"
          fill="#fff"
        />
        <Path
          opacity={0.7}
          d="M11.914 10.079l.511-.085c.457-.076.815-.436.89-.896l.085-.514.084.514c.075.46.433.82.89.896l.511.085-.51.085a1.084 1.084 0 00-.891.896l-.084.514-.085-.514a1.084 1.084 0 00-.89-.896l-.51-.085zM23 11.333l.401-.066c.36-.059.64-.34.7-.7l.066-.4.066.4c.059.36.34.641.7.7l.4.066-.4.066a.848.848 0 00-.7.7l-.066.401-.066-.401a.848.848 0 00-.7-.7L23 11.333z"
          fill="#fff"
        />
        <Path
          d="M15.386 16.821a.349.349 0 01.637 0l4.79 10.658a.349.349 0 01-.319.492h-9.58a.349.349 0 01-.318-.492l4.79-10.658z"
          fill="#9E7AD8"
        />
        <Path
          d="M23.238 16.821a.349.349 0 01.636 0l4.79 10.658a.349.349 0 01-.318.492h-9.58a.349.349 0 01-.318-.492l4.79-10.658z"
          fill="#9E7AD8"
        />
        <Path
          d="M9.813 15.999c0-.676.864-.957 1.261-.41l3.746 5.146 4.038 6.186a.698.698 0 01-.584 1.08H10.51a.698.698 0 01-.697-.698V15.999z"
          fill="#E1D3FA"
        />
        <Path
          d="M9.813 16.73c0-.73.982-.97 1.318-.319l5.974 11.59H10.51a.698.698 0 01-.697-.698V16.73z"
          fill="url(#paint3_linear_10975_62081)"
        />
        <Path
          d="M29.398 15.999c0-.676-.864-.957-1.262-.41l-3.745 5.146-4.038 6.186a.698.698 0 00.584 1.08h7.764a.698.698 0 00.697-.698V15.999z"
          fill="#E1D3FA"
        />
        <Path
          d="M29.398 16.847c0-.738-.997-.97-1.323-.309l-5.449 11.048a.698.698 0 01-.618.39l-2.36.024h9.053a.698.698 0 00.697-.697V16.847z"
          fill="url(#paint4_linear_10975_62081)"
        />
        <Path
          d="M19.044 13.016c.212-.636 1.112-.636 1.324 0l4.69 14.063a.698.698 0 01-.662.919h-9.38a.698.698 0 01-.663-.92l4.69-14.062z"
          fill="url(#paint5_linear_10975_62081)"
        />
        <Path
          d="M19.711 15.223c0-.789 1.103-.972 1.358-.227l4.136 12.078a.698.698 0 01-.66.924h-4.136a.698.698 0 01-.698-.698V15.222z"
          fill="url(#paint6_linear_10975_62081)"
        />
        <Ellipse
          cx={10.3652}
          cy={15.4953}
          rx={1.67772}
          ry={1.68869}
          fill="#A98ADC"
        />
        <Ellipse
          cx={19.7324}
          cy={12.6809}
          rx={1.67772}
          ry={1.68869}
          fill="#BD9FED"
        />
        <Ellipse
          cx={15.4188}
          cy={16.1127}
          rx={1.12198}
          ry={1.12931}
          fill="#9E7AD8"
        />
        <Ellipse
          cx={23.8329}
          cy={16.1127}
          rx={1.12198}
          ry={1.12931}
          fill="#9E7AD8"
        />
        <Ellipse
          cx={29.0996}
          cy={15.4953}
          rx={1.67772}
          ry={1.68869}
          fill="#C7B1EA"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_10975_62081"
            x1={15.1597}
            y1={41.7245}
            x2={15.1597}
            y2={-0.798694}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#9E77EA" />
            <Stop offset={0.366886} stopColor="#BB8DEE" />
            <Stop offset={1} stopColor="#CB88E3" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_10975_62081"
            x1={19.8943}
            y1={37.5}
            x2={19.8943}
            y2={3.5}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#8B6BC0" />
            <Stop offset={0.460638} stopColor="#B49DDB" />
            <Stop offset={1} stopColor="#603B9E" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_10975_62081"
            x1={19.8943}
            y1={37.5}
            x2={19.8943}
            y2={1.99557}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FAEEFF" />
            <Stop offset={0.460638} stopColor="#B674D1" />
            <Stop offset={1} stopColor="#7F52D4" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_10975_62081"
            x1={11.513}
            y1={15.0111}
            x2={14.638}
            y2={27.9913}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#E5E3EA" />
            <Stop offset={0.0001} stopColor="#B295E3" />
            <Stop offset={1} stopColor="#8B68C4" />
          </LinearGradient>
          <LinearGradient
            id="paint4_linear_10975_62081"
            x1={24.5234}
            y1={13.8545}
            x2={24.5234}
            y2={28.0005}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#DAC9F6" />
            <Stop offset={1} stopColor="#8C65CC" />
          </LinearGradient>
          <LinearGradient
            id="paint5_linear_10975_62081"
            x1={19.7057}
            y1={11.0312}
            x2={19.7057}
            y2={27.9976}
            gradientUnits="userSpaceOnUse">
            <Stop offset={0.325219} stopColor="#F1E8FF" />
            <Stop offset={1} stopColor="#8D68C9" />
          </LinearGradient>
          <LinearGradient
            id="paint6_linear_10975_62081"
            x1={19.7109}
            y1={11.0312}
            x2={19.7109}
            y2={27.9976}
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
