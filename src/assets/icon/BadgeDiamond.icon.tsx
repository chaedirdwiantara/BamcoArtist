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
      <Svg width={40} height={41} fill="none" viewBox={'0 0 40 41'}>
        <Path
          fill="url(#a)"
          d="M21.521 39.605a3 3 0 0 1-3.042 0l-14-8.235A3 3 0 0 1 3 28.784V12.216A3 3 0 0 1 4.479 9.63l14-8.235a3 3 0 0 1 3.042 0l14 8.235A3 3 0 0 1 37 12.216v16.568a3 3 0 0 1-1.479 2.586l-14 8.235Z"
        />
        <Path
          fill="url(#b)"
          stroke="url(#c)"
          strokeWidth={2}
          d="m5 30.156 13.903 7.93a2 2 0 0 0 1.982 0l13.903-7.93a2 2 0 0 0 1.009-1.737V12.581a2 2 0 0 0-1.01-1.737l-13.902-7.93a2 2 0 0 0-1.982 0l-13.902 7.93a2 2 0 0 0-1.01 1.737v15.838a2 2 0 0 0 1.01 1.737Z"
        />
        <G filter="url(#d)">
          <Path fill="#B49DDB" d="M10 23.5h19.333v4.333H10z" />
        </G>
        <Path
          fill="#fff"
          d="m29.328 25.5.684-.113a1.45 1.45 0 0 0 1.19-1.2l.113-.687.113.688c.1.615.58 1.097 1.19 1.199l.684.113-.683.113a1.45 1.45 0 0 0-1.191 1.2l-.113.687-.112-.688a1.45 1.45 0 0 0-1.191-1.199l-.684-.113Z"
          opacity={0.7}
        />
        <Path
          fill="#fff"
          d="m9.969 30.25.427-.07a.906.906 0 0 0 .744-.75l.07-.43.071.43a.906.906 0 0 0 .744.75l.428.07-.428.07a.906.906 0 0 0-.744.75l-.07.43-.07-.43a.906.906 0 0 0-.745-.75l-.427-.07Z"
          opacity={0.8}
        />
        <Path
          fill="#fff"
          d="m11.914 10.079.511-.085c.457-.076.815-.436.89-.896l.085-.514.084.514c.075.46.433.82.89.896l.511.085-.51.085a1.084 1.084 0 0 0-.891.896l-.084.514-.085-.514a1.084 1.084 0 0 0-.89-.896l-.51-.085ZM23 11.333l.401-.066c.36-.059.64-.34.7-.7l.066-.4.066.4c.059.36.34.641.7.7l.4.066-.4.066a.848.848 0 0 0-.7.7l-.066.401-.066-.401a.848.848 0 0 0-.7-.7L23 11.333Z"
          opacity={0.7}
        />
        <Path
          fill="#9E7AD8"
          d="M15.386 16.821a.349.349 0 0 1 .637 0l4.79 10.658a.349.349 0 0 1-.319.492h-9.58a.349.349 0 0 1-.318-.492l4.79-10.658Z"
        />
        <Path
          fill="#9E7AD8"
          d="M23.238 16.821a.349.349 0 0 1 .636 0l4.79 10.658a.349.349 0 0 1-.318.492h-9.58a.349.349 0 0 1-.318-.492l4.79-10.658Z"
        />
        <Path
          fill="#E1D3FA"
          d="M9.813 15.999c0-.676.864-.957 1.261-.41l3.746 5.146 4.038 6.186a.698.698 0 0 1-.584 1.08H10.51a.698.698 0 0 1-.697-.698V15.999Z"
        />
        <Path
          fill="url(#e)"
          d="M9.813 16.73c0-.73.982-.97 1.318-.319l5.974 11.59H10.51a.698.698 0 0 1-.697-.698V16.73Z"
        />
        <Path
          fill="#E1D3FA"
          d="M29.398 15.999c0-.676-.864-.957-1.262-.41l-3.745 5.146-4.038 6.186a.698.698 0 0 0 .584 1.08h7.764a.698.698 0 0 0 .697-.698V15.999Z"
        />
        <Path
          fill="url(#f)"
          d="M29.398 16.847c0-.738-.997-.97-1.323-.309l-5.449 11.048a.698.698 0 0 1-.618.39l-2.36.024h9.053a.698.698 0 0 0 .697-.697V16.847Z"
        />
        <Path
          fill="url(#g)"
          d="M19.044 13.016c.212-.636 1.112-.636 1.324 0l4.69 14.063a.698.698 0 0 1-.662.919h-9.38a.698.698 0 0 1-.663-.92l4.69-14.062Z"
        />
        <Path
          fill="url(#h)"
          d="M19.711 15.223c0-.789 1.103-.972 1.358-.227l4.136 12.078a.698.698 0 0 1-.66.924h-4.136a.698.698 0 0 1-.698-.698V15.222Z"
        />
        <Ellipse cx={10.365} cy={15.495} fill="#A98ADC" rx={1.678} ry={1.689} />
        <Ellipse cx={19.732} cy={12.681} fill="#BD9FED" rx={1.678} ry={1.689} />
        <Ellipse cx={15.419} cy={16.113} fill="#9E7AD8" rx={1.122} ry={1.129} />
        <Ellipse cx={23.833} cy={16.113} fill="#9E7AD8" rx={1.122} ry={1.129} />
        <Ellipse cx={29.1} cy={15.495} fill="#C7B1EA" rx={1.678} ry={1.689} />
        <Defs>
          <LinearGradient
            id="a"
            x1={15.16}
            x2={15.16}
            y1={41.724}
            y2={-0.799}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#9E77EA" />
            <Stop offset={0.367} stopColor="#BB8DEE" />
            <Stop offset={1} stopColor="#CB88E3" />
          </LinearGradient>
          <LinearGradient
            id="b"
            x1={19.894}
            x2={19.894}
            y1={37.5}
            y2={3.5}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#8B6BC0" />
            <Stop offset={0.461} stopColor="#B49DDB" />
            <Stop offset={1} stopColor="#603B9E" />
          </LinearGradient>
          <LinearGradient
            id="c"
            x1={19.894}
            x2={19.894}
            y1={37.5}
            y2={1.996}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FAEEFF" />
            <Stop offset={0.461} stopColor="#B674D1" />
            <Stop offset={1} stopColor="#7F52D4" />
          </LinearGradient>
          <LinearGradient
            id="e"
            x1={11.513}
            x2={14.638}
            y1={15.011}
            y2={27.991}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#E5E3EA" />
            <Stop offset={0} stopColor="#B295E3" />
            <Stop offset={1} stopColor="#8B68C4" />
          </LinearGradient>
          <LinearGradient
            id="f"
            x1={24.523}
            x2={24.523}
            y1={13.854}
            y2={28}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#DAC9F6" />
            <Stop offset={1} stopColor="#8C65CC" />
          </LinearGradient>
          <LinearGradient
            id="g"
            x1={19.706}
            x2={19.706}
            y1={11.031}
            y2={27.998}
            gradientUnits="userSpaceOnUse">
            <Stop offset={0.325} stopColor="#F1E8FF" />
            <Stop offset={1} stopColor="#8D68C9" />
          </LinearGradient>
          <LinearGradient
            id="h"
            x1={19.711}
            x2={19.711}
            y1={11.031}
            y2={27.998}
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
