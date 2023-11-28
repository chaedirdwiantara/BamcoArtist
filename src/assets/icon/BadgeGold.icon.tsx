import * as React from 'react';
import {View} from 'react-native';
import Svg, {Defs, G, LinearGradient, Mask, Path, Stop} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function BadgeGoldIcon({
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
          fill="url(#paint0_linear_10897_186423)"
        />
        <Path
          d="M34.788 30.156l-.496-.868.496.868a2 2 0 001.009-1.737V12.581a2 2 0 00-1.01-1.737l-13.902-7.93a2 2 0 00-1.982 0l-13.902 7.93a2 2 0 00-1.01 1.737v15.838a2 2 0 001.01 1.737l13.902 7.93.496-.869-.496.87a2 2 0 001.982 0l-.48-.842.48.841 13.903-7.93z"
          fill="url(#paint1_linear_10897_186423)"
          stroke="url(#paint2_linear_10897_186423)"
          strokeWidth={2}
        />
        <Path
          opacity={0.7}
          d="M25.852 11.5l.854-.142a1.812 1.812 0 001.489-1.498l.14-.86.141.86a1.813 1.813 0 001.489 1.498l.854.142-.854.142a1.813 1.813 0 00-1.489 1.498l-.14.86-.141-.86a1.812 1.812 0 00-1.49-1.498l-.853-.142zM12.406 31.159l.681-.113a1.445 1.445 0 001.188-1.195l.112-.686.112.686c.1.613.578 1.094 1.188 1.195l.68.113-.68.113a1.446 1.446 0 00-1.188 1.195l-.112.685-.112-.685a1.446 1.446 0 00-1.188-1.195l-.68-.113zM25.844 28l.341-.057a.725.725 0 00.596-.6l.056-.343.056.344c.05.308.29.549.596.6l.342.056-.342.057a.725.725 0 00-.596.6l-.056.343-.056-.344a.725.725 0 00-.595-.6L25.844 28zM8.438 13.079l.51-.085c.457-.076.816-.436.891-.896l.084-.514.084.514c.076.46.434.82.89.896l.512.085-.511.085a1.084 1.084 0 00-.89.896l-.085.514-.084-.514a1.084 1.084 0 00-.89-.896l-.511-.085z"
          fill="#fff"
        />
        <G filter="url(#filter0_f_10897_186423)">
          <Path
            d="M20.02 32.413a.349.349 0 01-.564 0l-8.854-12.212a.349.349 0 010-.41l3.293-4.53a.35.35 0 01.283-.143h11.121a.35.35 0 01.282.143l3.294 4.53a.349.349 0 010 .41L20.02 32.413z"
            fill="#976725"
          />
        </G>
        <Path
          d="M20.02 29.796a.349.349 0 01-.564 0l-8.854-12.212a.349.349 0 010-.41l3.293-4.53a.35.35 0 01.283-.144h11.121a.35.35 0 01.282.144l3.294 4.53a.35.35 0 010 .41L20.02 29.796z"
          fill="#FFF1D2"
        />
        <Path
          d="M19.9 29.317a.174.174 0 01-.33 0L14.114 12.73a.175.175 0 01.166-.229h10.908c.119 0 .203.117.165.23l-5.453 16.587z"
          fill="url(#paint3_linear_10897_186423)"
        />
        <Path
          d="M19.732 12.501L15.59 17.39h8.285L19.732 12.5z"
          fill="url(#paint4_linear_10897_186423)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_10897_186423"
            x1={15.1597}
            y1={41.7245}
            x2={15.1597}
            y2={-0.798694}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#A16D2A" />
            <Stop offset={0.528348} stopColor="#E7CF6B" />
            <Stop offset={1} stopColor="#EFE7BE" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_10897_186423"
            x1={19.8943}
            y1={37.5}
            x2={19.8943}
            y2={3.5}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#91682C" />
            <Stop offset={0.460638} stopColor="#D39E4E" />
            <Stop offset={1} stopColor="#895A1C" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_10897_186423"
            x1={19.8943}
            y1={37.5}
            x2={19.8943}
            y2={1.99557}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#EEE3B1" />
            <Stop offset={1} stopColor="#AC7D34" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_10897_186423"
            x1={19.7348}
            y1={29.8213}
            x2={19.7348}
            y2={12.5004}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FFE8DC" />
            <Stop offset={1} stopColor="#E9BA79" />
          </LinearGradient>
          <LinearGradient
            id="paint4_linear_10897_186423"
            x1={19.7324}
            y1={12.501}
            x2={19.7324}
            y2={17.3895}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FFF7EB" />
            <Stop offset={1} stopColor="#FFF3D6" />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default BadgeGoldIcon;
