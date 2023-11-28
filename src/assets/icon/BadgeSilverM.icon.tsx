import * as React from 'react';
import {View} from 'react-native';
import Svg, {Defs, G, LinearGradient, Mask, Path, Stop} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function BadgeSilverMIcon({
  width = widthResponsive(120),
  height = widthResponsive(120),
  fill = '#F4D761',
  stroke = '',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 120 120'}>
        <Path
          d="M61.521 119.105a2.997 2.997 0 01-3.042 0l-48-28.235A3 3 0 019 88.284V31.716a3 3 0 011.479-2.586l48-28.235a3 3 0 013.042 0l48 28.235A3 3 0 01111 31.716v56.568a3 3 0 01-1.479 2.586l-48 28.235z"
          fill="url(#paint0_linear_9377_105110)"
        />
        <Path
          d="M104.366 33.344h0L60.658 8.414a2 2 0 00-1.982 0l-43.708 24.93a2 2 0 00-1.009 1.737v49.838a2 2 0 001.01 1.737l43.707 24.93c.614.35 1.368.35 1.982 0l43.708-24.93a2 2 0 001.009-1.737V35.081a2 2 0 00-1.009-1.737z"
          fill="url(#paint1_linear_9377_105110)"
          stroke="url(#paint2_linear_9377_105110)"
          strokeWidth={2}
        />
        <Path
          opacity={0.7}
          d="M75.453 35.893l3.321-.551a7.046 7.046 0 005.789-5.826l.547-3.343.547 3.343a7.046 7.046 0 005.788 5.826l3.321.55-3.321.551a7.046 7.046 0 00-5.788 5.826l-.547 3.343-.547-3.343a7.046 7.046 0 00-5.789-5.826l-3.32-.55zM35.719 88.976l2.044-.34a4.336 4.336 0 003.562-3.584l.336-2.058.337 2.058a4.336 4.336 0 003.562 3.585l2.044.339-2.044.339a4.336 4.336 0 00-3.562 3.585l-.337 2.057-.336-2.057a4.336 4.336 0 00-3.562-3.585l-2.044-.34zM25.313 45.237l1.532-.255a3.252 3.252 0 002.672-2.688l.252-1.543.253 1.543a3.252 3.252 0 002.671 2.689l1.533.254-1.533.254a3.252 3.252 0 00-2.671 2.689l-.253 1.543-.252-1.543a3.252 3.252 0 00-2.672-2.69l-1.532-.253z"
          fill="#fff"
        />
        <G filter="url(#filter0_f_9377_105110)">
          <Path
            d="M59.924 34.336a.523.523 0 01.983 0l8.08 21.978a.523.523 0 00.308.31l21.844 8.136a.523.523 0 010 .98l-21.844 8.136a.523.523 0 00-.309.31l-8.08 21.978a.523.523 0 01-.982 0l-8.08-21.978a.524.524 0 00-.308-.31L29.692 65.74a.523.523 0 010-.98l21.844-8.136a.524.524 0 00.309-.31l8.08-21.978z"
            fill="#676A6C"
          />
        </G>
        <Path
          d="M59.298 30.176c.337-.914 1.63-.914 1.965 0l7.832 21.304c.106.287.331.513.617.62l21.185 7.89c.908.338.908 1.623 0 1.962l-21.185 7.89a1.047 1.047 0 00-.617.62l-7.832 21.303c-.336.915-1.628.915-1.965 0l-7.831-21.303a1.047 1.047 0 00-.618-.62l-21.184-7.89c-.909-.339-.909-1.624 0-1.962l21.184-7.89c.287-.107.512-.333.618-.62l7.831-21.304z"
          fill="#DCE1DF"
        />
        <Mask
          id="a"
          // @ts-ignore
          style={{
            maskType: 'alpha',
          }}
          maskUnits="userSpaceOnUse"
          x={28}
          y={29}
          width={64}
          height={64}>
          <Path
            d="M59.306 30.176c.336-.914 1.63-.914 1.965 0l7.832 21.304c.106.287.33.513.617.62l21.185 7.89c.908.338.908 1.623 0 1.962l-21.185 7.89a1.047 1.047 0 00-.617.62l-7.832 21.303c-.336.915-1.629.915-1.965 0l-7.832-21.303a1.047 1.047 0 00-.617-.62l-21.184-7.89c-.909-.339-.909-1.624 0-1.962l21.184-7.89c.287-.107.512-.333.617-.62l7.832-21.304z"
            fill="#DFE6E3"
          />
        </Mask>
        <G mask="url(#a)">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M60.28 28.523H28.032v32.288h32.25V28.523zM92.53 60.81H60.282v32.288h32.25V60.81z"
            fill="url(#paint3_linear_9377_105110)"
          />
        </G>
        <Defs>
          <LinearGradient
            id="paint0_linear_9377_105110"
            x1={45.4792}
            y1={123.673}
            x2={45.4792}
            y2={-3.89608}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#979B99" />
            <Stop offset={1} stopColor="#F4FAF7" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_9377_105110"
            x1={59.6672}
            y1={111}
            x2={59.6672}
            y2={8.99999}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#585B5C" />
            <Stop offset={0.460638} stopColor="#C3BCAF" />
            <Stop offset={1} stopColor="#4C5258" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_9377_105110"
            x1={59.6672}
            y1={111}
            x2={59.6672}
            y2={4.48671}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#DFEEE8" />
            <Stop offset={1} stopColor="#7D8287" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_9377_105110"
            x1={60.2811}
            y1={28.5234}
            x2={60.2811}
            y2={93.0978}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#C6CBCE" />
            <Stop offset={1} stopColor="#8AA4B4" stopOpacity={0} />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default BadgeSilverMIcon;
