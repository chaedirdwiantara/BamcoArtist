import * as React from 'react';
import Svg, {
  Path,
  Circle,
  Ellipse,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
} from 'react-native-svg';
import {View} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {SvgProps} from '../../interface/svg.interface';

function ReferralImage({
  width = ms(280),
  height = mvs(280),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 280 280'}>
        <Path
          d="M101.082 82.823c-16.323 1.838-15.75 17.413-13.194 27.268.73 3.371.715 9.111-7.516 12.716-8.746 3.829-9.512 10.876-8.745 15.472 1.891 11.337 12.732 13.635 5.982 20.835-6.75 7.2-4.602 22.366 6.75 25.124 11.352 2.757 15.34 9.192 15.034 20.528-.307 11.336 19.176 19.149 32.676 10.57 13.5-8.578 16.414-1.531 31.448 0 15.034 1.532 27.153-5.055 25.619-16.698-1.227-9.314 5.932-13.481 9.665-14.4 21.323-8.12 23.011-20.375 16.108-30.18-6.904-9.804-1.534-18.843 0-29.26 1.534-10.417-5.063-21.907-19.79-21.907-11.782 0-16.67-9.396-17.642-14.094-6.289-23.439-27.153-30.486-43.107-14.553-15.954 15.932-12.885 6.28-33.288 8.579z"
          fill="#fff"
        />
        <Circle
          cx={144.969}
          cy={145.157}
          r={48.9836}
          fill="url(#paint0_linear_1701_87890)"
        />
        <Circle
          cx={28.5336}
          cy={126.505}
          r={27.1342}
          fill="url(#paint1_linear_1701_87890)"
        />
        <Circle
          cx={238.814}
          cy={60.1757}
          r={27.1342}
          fill="url(#paint2_linear_1701_87890)"
        />
        <Circle
          cx={246.234}
          cy={219.547}
          r={27.1342}
          fill="url(#paint3_radial_1701_87890)"
        />
        <Path
          d="M116.79 138.412c2.219-3.14 7.672-7.536 11.726 0M149.949 142.195c2.22-2.855 7.672-6.851 11.726 0"
          stroke="#000"
          strokeWidth={1.08609}
        />
        <Path
          d="M131.2 141.434a6.601 6.601 0 001.232 4.895 6.598 6.598 0 0011.818-2.974l-6.525-.961-6.525-.96z"
          fill="#000"
        />
        <Path
          d="M227.269 63.595a6.48 6.48 0 0010.819 5.14 6.485 6.485 0 002.129-4.482l-6.474-.329-6.474-.329z"
          fill="#141921"
        />
        <Path
          d="M31.734 164.501c-.477 12.355 7.804 37.788 44.742 40.686M209.158 44.802c-9.402-5.352-38.232-8.814-43.469 12.39M225.68 161.307c8.843-1.457 27.043 1.568 29.094 25.325"
          stroke="#fff"
          strokeWidth={2.41193}
          strokeLinecap="round"
          strokeDasharray="4.82 4.82"
        />
        <Path
          d="M233.421 220.753c2.512 1.307 8.773 3.136 13.718 0M23.107 125.902c.826-.911 2.886-2.185 4.523 0M222.459 61.407c.825-.91 2.886-2.184 4.522 0M36.976 124.997c.77-.91 2.693-2.184 4.22 0M241.779 62.667c.771-.91 2.694-2.184 4.221 0"
          stroke="#000"
          strokeWidth={0.904474}
        />
        <Ellipse
          cx={33.5083}
          cy={130.726}
          rx={2.26118}
          ry={4.22088}
          fill="#141921"
        />
        <Path
          d="M228.446 217.738c.826-.91 2.886-2.184 4.523 0M247.44 217.738c.771-.91 2.694-2.184 4.221 0"
          stroke="#000"
          strokeWidth={0.904474}
        />
        <Path
          d="M10.897 110.978c-1.91 1.507-5.759 6.18-5.88 12.813M4.866 126.957c0 .955.12 3.105.603 4.07M254.1 242.038c2.562-.603 6.632-1.959 9.497-5.276M265.104 234.953c.703-.553 2.11-2.683 2.713-4.371M239.566 35.604c2.865.151 8.291 1.056 12.814 4.523M254.189 41.484c.603.452 1.96 1.567 2.563 2.412"
          stroke="#fff"
          strokeWidth={1.20597}
          strokeLinecap="round"
        />
        <Path
          d="M159.37 185.174c-1.359.624-4.648 1.946-6.936 2.238M181.605 165.249c-1.27 5.921-11.447 15.329-18.231 17.983"
          stroke="#fff"
          strokeWidth={2.8}
          strokeLinecap="round"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_1701_87890"
            x1={118.946}
            y1={101.838}
            x2={166.859}
            y2={194.141}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FFE071" />
            <Stop offset={1} stopColor="#FFCC7E" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_1701_87890"
            x1={14.1186}
            y1={102.508}
            x2={40.6592}
            y2={153.639}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FFE071" />
            <Stop offset={1} stopColor="#FFCC7E" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_1701_87890"
            x1={224.399}
            y1={36.1789}
            x2={250.94}
            y2={87.3099}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FFE071" />
            <Stop offset={1} stopColor="#FFCC7E" />
          </LinearGradient>
          <RadialGradient
            id="paint3_radial_1701_87890"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(62.568 -59.408 312.237) scale(28.8045)">
            <Stop stopColor="#FFE071" />
            <Stop offset={1} stopColor="#FFCC7E" />
          </RadialGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default ReferralImage;
