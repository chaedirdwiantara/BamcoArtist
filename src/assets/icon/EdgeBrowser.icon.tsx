import * as React from 'react';
import {View} from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function EdgeBrowserIcon({
  width = widthResponsive(32),
  height = widthResponsive(32),
  fill = '#A2B7DD',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 32 32'}>
        <Path
          d="M28.873 23.812a10.26 10.26 0 01-1.312.587c-1.438.538-2.95.813-4.488.813-5.912 0-11.062-4.063-11.062-9.288a3.922 3.922 0 012.05-3.412c-5.35.225-6.725 5.8-6.725 9.062 0 9.238 8.512 10.175 10.35 10.175.987 0 2.475-.287 3.375-.575l.162-.05a15.995 15.995 0 008.325-6.6.5.5 0 00-.15-.687.527.527 0 00-.525-.025z"
          fill="url(#paint0_linear_8318_62694)"
        />
        <Path
          opacity={0.35}
          d="M28.873 23.812a10.26 10.26 0 01-1.312.587c-1.438.538-2.95.813-4.488.813-5.912 0-11.062-4.063-11.062-9.288a3.922 3.922 0 012.05-3.412c-5.35.225-6.725 5.8-6.725 9.062 0 9.238 8.512 10.175 10.35 10.175.987 0 2.475-.287 3.375-.575l.162-.05a15.995 15.995 0 008.325-6.6.5.5 0 00-.15-.687.527.527 0 00-.525-.025z"
          fill="url(#paint1_radial_8318_62694)"
        />
        <Path
          d="M13.213 30.175a9.935 9.935 0 01-2.838-2.662c-3.287-4.5-2.3-10.813 2.2-14.1.475-.338.963-.65 1.488-.9.387-.188 1.05-.513 1.937-.5a4.074 4.074 0 013.213 1.625c.5.675.787 1.487.8 2.337 0-.025 3.062-9.95-10-9.95-5.488 0-10 5.213-10 9.775-.025 2.413.5 4.813 1.512 7 3.45 7.35 11.85 10.95 19.55 8.388a9.472 9.472 0 01-7.862-1.013z"
          fill="url(#paint2_linear_8318_62694)"
        />
        <Path
          opacity={0.41}
          d="M13.213 30.175a9.935 9.935 0 01-2.838-2.662c-3.287-4.5-2.3-10.813 2.2-14.1.475-.338.963-.65 1.488-.9.387-.188 1.05-.513 1.937-.5a4.074 4.074 0 013.213 1.625c.5.675.787 1.487.8 2.337 0-.025 3.062-9.95-10-9.95-5.488 0-10 5.213-10 9.775-.025 2.413.5 4.813 1.512 7 3.45 7.35 11.85 10.95 19.55 8.388a9.472 9.472 0 01-7.862-1.013z"
          fill="url(#paint3_radial_8318_62694)"
        />
        <Path
          d="M19.038 18.613c-.1.125-.413.312-.413.712 0 .325.212.637.587.9 1.8 1.25 5.188 1.087 5.2 1.087a7.47 7.47 0 003.788-1.037 7.662 7.662 0 003.8-6.612c.038-2.8-1-4.663-1.413-5.488C27.938 2.987 22.212 0 16 0 7.25 0 .125 7.025 0 15.775c.063-4.563 4.6-8.25 10-8.25.438 0 2.938.037 5.25 1.262 2.038 1.075 3.113 2.363 3.85 3.65.775 1.338.912 3.013.912 3.688 0 .663-.337 1.663-.974 2.488z"
          fill="url(#paint4_radial_8318_62694)"
        />
        <Path
          d="M19.038 18.613c-.1.125-.413.312-.413.712 0 .325.212.637.587.9 1.8 1.25 5.188 1.087 5.2 1.087a7.47 7.47 0 003.788-1.037 7.662 7.662 0 003.8-6.612c.038-2.8-1-4.663-1.413-5.488C27.938 2.987 22.212 0 16 0 7.25 0 .125 7.025 0 15.775c.063-4.563 4.6-8.25 10-8.25.438 0 2.938.037 5.25 1.262 2.038 1.075 3.113 2.363 3.85 3.65.775 1.338.912 3.013.912 3.688 0 .663-.337 1.663-.974 2.488z"
          fill="url(#paint5_radial_8318_62694)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_8318_62694"
            x1={7.33644}
            y1={22.1267}
            x2={29.6218}
            y2={22.1267}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#0C59A4" />
            <Stop offset={1} stopColor="#114A8B" />
          </LinearGradient>
          <RadialGradient
            id="paint1_radial_8318_62694"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(11.9213 0 0 11.324 19.647 22.304)">
            <Stop offset={0.72} stopOpacity={0} />
            <Stop offset={0.95} stopOpacity={0.53} />
            <Stop offset={1} />
          </RadialGradient>
          <LinearGradient
            id="paint2_linear_8318_62694"
            x1={19.0964}
            y1={12.4686}
            x2={5.17482}
            y2={27.6326}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#1B9DE2" />
            <Stop offset={0.16} stopColor="#1595DF" />
            <Stop offset={0.67} stopColor="#0680D7" />
            <Stop offset={1} stopColor="#0078D4" />
          </LinearGradient>
          <RadialGradient
            id="paint3_radial_8318_62694"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(2.68576 -17.72235 14.32069 2.17025 8.826 24.877)">
            <Stop offset={0.76} stopOpacity={0} />
            <Stop offset={0.95} stopOpacity={0.5} />
            <Stop offset={1} />
          </RadialGradient>
          <RadialGradient
            id="paint4_radial_8318_62694"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-1.01216 25.29866 -53.88919 -2.15603 3.231 5.924)">
            <Stop stopColor="#35C1F1" />
            <Stop offset={0.11} stopColor="#34C1ED" />
            <Stop offset={0.23} stopColor="#2FC2DF" />
            <Stop offset={0.31} stopColor="#2BC3D2" />
            <Stop offset={0.67} stopColor="#36C752" />
          </RadialGradient>
          <RadialGradient
            id="paint5_radial_8318_62694"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(73.737 8.553 24.844) scale(12.1652 9.89461)">
            <Stop stopColor="#66EB6E" />
            <Stop offset={1} stopColor="#66EB6E" stopOpacity={0} />
          </RadialGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default EdgeBrowserIcon;
