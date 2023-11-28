import * as React from 'react';
import {View} from 'react-native';
import Svg, {Defs, G, LinearGradient, Mask, Path, Stop} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function BadgePlatinumIcon({
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
          fill="url(#paint0_linear_10897_186530)"
        />
        <Path
          d="M34.788 30.156l-.496-.868.496.868a2 2 0 001.009-1.737V12.581a2 2 0 00-1.01-1.737l-13.902-7.93a2 2 0 00-1.982 0l-13.902 7.93a2 2 0 00-1.01 1.737v15.838a2 2 0 001.01 1.737l13.902 7.93.496-.869-.496.87a2 2 0 001.982 0l-.48-.842.48.841 13.903-7.93z"
          fill="url(#paint1_linear_10897_186530)"
          stroke="url(#paint2_linear_10897_186530)"
          strokeWidth={2}
        />
        <Path
          opacity={0.8}
          d="M25.852 11.5l.683-.113a1.45 1.45 0 001.191-1.2l.113-.687.112.688c.1.615.58 1.097 1.191 1.199l.684.113-.684.113a1.45 1.45 0 00-1.19 1.2l-.113.687-.113-.688a1.45 1.45 0 00-1.191-1.199l-.683-.113zM28.828 29.25l.427-.07a.906.906 0 00.745-.75l.07-.43.07.43a.906.906 0 00.745.75l.427.07-.427.07a.906.906 0 00-.745.75l-.07.43-.07-.43a.906.906 0 00-.745-.75l-.427-.07zM9.93 12.579l.51-.085c.458-.076.816-.436.891-.896l.084-.514.085.514c.075.46.433.82.89.896l.51.085-.51.085a1.084 1.084 0 00-.89.896l-.085.514-.084-.514a1.084 1.084 0 00-.89-.896l-.511-.085z"
          fill="#fff"
        />
        <G filter="url(#filter0_f_10897_186530)">
          <Path
            d="M19.787 11.693a.4.4 0 01.71-.006l3.039 5.781a.4.4 0 00.247.2l5.871 1.622a.4.4 0 01.175.67l-4.054 4.013a.4.4 0 00-.111.358l1.153 6.122a.4.4 0 01-.566.434l-5.935-2.839a.4.4 0 00-.356.005l-5.934 3.056a.4.4 0 01-.573-.443l1.414-6.32a.4.4 0 00-.117-.38l-4.273-4.002a.4.4 0 01.169-.678l5.972-1.618a.4.4 0 00.253-.205l2.916-5.77z"
            fill="#617E82"
          />
        </G>
        <Mask
          id="a"
          // @ts-ignore dont need to fix it
          style={{
            maskType: 'alpha',
          }}
          maskUnits="userSpaceOnUse"
          x={10}
          y={9}
          width={21}
          height={21}>
          <Path
            d="M19.756 9.622a.4.4 0 01.711-.005l3.077 5.853a.4.4 0 00.247.2l5.944 1.641a.4.4 0 01.174.67l-4.104 4.064a.4.4 0 00-.112.358l1.167 6.199a.4.4 0 01-.565.434l-6.01-2.874a.4.4 0 00-.355.005L13.92 29.26a.4.4 0 01-.573-.443l1.432-6.4a.4.4 0 00-.117-.38l-4.327-4.052a.4.4 0 01.169-.678l6.047-1.638a.4.4 0 00.252-.206l2.952-5.842z"
            fill="#D9D9D9"
          />
        </Mask>
        <G mask="url(#a)">
          <Path
            d="M23.325 31.377c3.797-1.107 6.788-4.123 7.882-7.947L20.15 20.268a.317.317 0 00.004-.103l-.001-.005a.119.119 0 00-.003-.013l11.057-3.162c-1.094-3.824-4.085-6.84-7.882-7.947l-3.22 11.04.008.002 3.212 11.297zm0 0l-3.22-11.04a.086.086 0 01.01-.002h-.022l.01.002-3.22 11.04c-3.796-1.107-6.788-4.123-7.881-7.947l11.056-3.162a.098.098 0 01-.003-.018.297.297 0 01.003-.103L9.002 16.985c1.093-3.824 4.085-6.84 7.882-7.947m6.441 22.34l-6.441-22.34m0 0l3.219 11.04-.005.001a.088.088 0 01-.005.002h.023L16.884 9.038z"
            fill="url(#paint3_linear_10897_186530)"
            stroke="url(#paint4_linear_10897_186530)"
            strokeWidth={23}
            strokeDasharray="19 34"
          />
        </G>
        <Defs>
          <LinearGradient
            id="paint0_linear_10897_186530"
            x1={15.1597}
            y1={41.7245}
            x2={15.1597}
            y2={-0.798694}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#67898D" />
            <Stop offset={1} stopColor="#E4F7F9" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_10897_186530"
            x1={19.8943}
            y1={37.5}
            x2={19.8943}
            y2={3.5}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#4F787D" />
            <Stop offset={0.460638} stopColor="#9EDBE3" />
            <Stop offset={1} stopColor="#617E82" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_10897_186530"
            x1={19.8943}
            y1={37.5}
            x2={19.8943}
            y2={1.99557}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#B6EAEF" />
            <Stop offset={1} stopColor="#456E74" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_10897_186530"
            x1={31.6562}
            y1={20.2076}
            x2={8.55222}
            y2={20.2076}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#E8FFFC" />
            <Stop offset={1} stopColor="#C0E5E6" />
          </LinearGradient>
          <LinearGradient
            id="paint4_linear_10897_186530"
            x1={26.1698}
            y1={23.3196}
            x2={10.4792}
            y2={18.0285}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#C6E0E4" />
            <Stop offset={1} stopColor="#629AA2" />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default BadgePlatinumIcon;
