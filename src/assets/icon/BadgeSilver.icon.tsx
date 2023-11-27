import * as React from 'react';
import {View} from 'react-native';
import Svg, {Defs, G, LinearGradient, Mask, Path, Stop} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function BadgeSilverIcon({
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
          fill="url(#paint0_linear_10897_186316)"
        />
        <Path
          d="M34.788 30.156l-.496-.868.496.868a2 2 0 001.009-1.737V12.581a2 2 0 00-1.01-1.737l-13.902-7.93a2 2 0 00-1.982 0l-13.902 7.93a2 2 0 00-1.01 1.737v15.838a2 2 0 001.01 1.737l13.902 7.93.496-.869-.496.87a2 2 0 001.982 0l-.48-.842.48.841 13.903-7.93z"
          fill="url(#paint1_linear_10897_186316)"
          stroke="url(#paint2_linear_10897_186316)"
          strokeWidth={2}
        />
        <Path
          opacity={0.7}
          d="M25.156 12.464l1.107-.183a2.349 2.349 0 001.93-1.942l.182-1.115.182 1.115c.164.996.94 1.777 1.93 1.942l1.107.183-1.107.184a2.349 2.349 0 00-1.93 1.942l-.182 1.114-.182-1.114a2.349 2.349 0 00-1.93-1.942l-1.107-.184zM11.906 30.159l.681-.113a1.445 1.445 0 001.188-1.195l.112-.686.112.686c.1.613.578 1.094 1.188 1.195l.68.113-.68.113a1.446 1.446 0 00-1.188 1.195l-.112.685-.112-.685a1.446 1.446 0 00-1.188-1.195l-.68-.113zM8.438 15.579l.51-.085c.457-.076.816-.436.891-.896l.084-.514.084.514c.076.46.434.82.89.896l.512.085-.511.085a1.084 1.084 0 00-.89.896l-.085.514-.084-.514a1.084 1.084 0 00-.89-.896l-.511-.085z"
          fill="#fff"
        />
        <G filter="url(#filter0_f_10897_186316)">
          <Path
            d="M19.642 12.836a.523.523 0 01.983 0l2.31 6.285a.523.523 0 00.309.31l6.253 2.328a.523.523 0 010 .982l-6.253 2.329a.523.523 0 00-.31.31l-2.31 6.284a.523.523 0 01-.982 0l-2.31-6.285a.523.523 0 00-.309-.31l-6.253-2.328a.523.523 0 010-.982l6.253-2.329a.523.523 0 00.309-.31l2.31-6.284z"
            fill="#676A6C"
          />
        </G>
        <Path
          d="M19.723 10.69a.4.4 0 01.751 0l2.555 6.948a.4.4 0 00.236.237l6.91 2.574a.4.4 0 010 .75l-6.91 2.573a.4.4 0 00-.236.237l-2.555 6.95a.4.4 0 01-.75 0l-2.555-6.95a.4.4 0 00-.236-.236l-6.911-2.575a.4.4 0 010-.75l6.911-2.573a.4.4 0 00.236-.237l2.554-6.949z"
          fill="#DCE1DF"
        />
        <Mask
          id="a"
          // @ts-ignore dont need to fix this
          style={{
            maskType: 'alpha',
          }}
          maskUnits="userSpaceOnUse"
          x={9}
          y={10}
          width={22}
          height={22}>
          <Path
            d="M19.723 10.69a.4.4 0 01.751 0l2.555 6.948a.4.4 0 00.236.237l6.91 2.574a.4.4 0 010 .75l-6.91 2.573a.4.4 0 00-.236.237l-2.555 6.95a.4.4 0 01-.75 0l-2.555-6.95a.4.4 0 00-.236-.236l-6.911-2.575a.4.4 0 010-.75l6.911-2.573a.4.4 0 00.236-.237l2.554-6.949z"
            fill="#DFE6E3"
          />
        </Mask>
        <G mask="url(#a)">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.094 10.008H9.344V20.77h10.75V10.008zm10.75 10.762h-10.75v10.763h10.75V20.77z"
            fill="url(#paint3_linear_10897_186316)"
          />
        </G>
        <Defs>
          <LinearGradient
            id="paint0_linear_10897_186316"
            x1={15.1597}
            y1={41.7245}
            x2={15.1597}
            y2={-0.798694}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#979B99" />
            <Stop offset={1} stopColor="#F4FAF7" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_10897_186316"
            x1={19.8943}
            y1={37.5}
            x2={19.8943}
            y2={3.5}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#585B5C" />
            <Stop offset={0.460638} stopColor="#C3BCAF" />
            <Stop offset={1} stopColor="#4C5258" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_10897_186316"
            x1={19.8943}
            y1={37.5}
            x2={19.8943}
            y2={1.99557}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#DFEEE8" />
            <Stop offset={1} stopColor="#7D8287" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_10897_186316"
            x1={20.0937}
            y1={10.0078}
            x2={20.0937}
            y2={31.5326}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#C6CBCE" />
            <Stop offset={1} stopColor="#8AA4B4" stopOpacity={0} />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default BadgeSilverIcon;
