import * as React from 'react';
import {View} from 'react-native';
import Svg, {
  Path,
  Mask,
  G,
  Circle,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function BadgeSilverMissionIcon({
  width = widthResponsive(24),
  height = widthResponsive(27),
  fill = '#F4D761',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 27'}>
        <Path
          d="M11.462 1.81a1.077 1.077 0 011.076 0l9.316 5.38c.333.192.538.547.538.932v10.756c0 .385-.205.74-.538.933l-9.316 5.378a1.077 1.077 0 01-1.076 0l-9.316-5.378a1.077 1.077 0 01-.538-.933V8.122c0-.385.205-.74.538-.933l9.316-5.378z"
          stroke="url(#paint0_linear_3_32155)"
          strokeWidth={1.79437}
        />
        <Mask
          id="a"
          style={{
            maskType: 'alpha',
          }}
          maskUnits="userSpaceOnUse"
          x={2}
          y={2}
          width={20}
          height={23}>
          <Path
            d="M11.73 3.025a.538.538 0 01.54 0l8.667 5.004c.167.096.27.274.27.466v10.01c0 .192-.103.37-.27.466l-8.668 5.004a.538.538 0 01-.538 0l-8.668-5.004a.538.538 0 01-.27-.466V8.495c0-.192.103-.37.27-.466l8.668-5.004z"
            fill="#FFB973"
            stroke="#FFEBCD"
            strokeWidth={1.07662}
          />
        </Mask>
        <G mask="url(#a)">
          <Circle cx={12} cy={13.5} r={11.1028} fill="#919191" />
          <Path d="M12 20a6 6 0 010-12v12z" fill="#CBCBCB" />
          <Path d="M12 20a6 6 0 000-12v12z" fill="#A8A8A8" />
          <Path d="M12 9.5a4.5 4.5 0 000 9v-9z" fill="#ECECEC" />
          <Path d="M12 9.5a4.5 4.5 0 010 9v-9z" fill="#CBCBCB" />
          <G clipPath="url(#clip0_3_32155)">
            <Path
              d="M11.731 10.795a.3.3 0 01.538 0l.763 1.547a.3.3 0 00.226.164l1.707.248a.3.3 0 01.166.511l-1.235 1.204a.3.3 0 00-.086.266l.291 1.7a.3.3 0 01-.435.316l-1.526-.803a.3.3 0 00-.28 0l-1.526.803a.3.3 0 01-.435-.316l.291-1.7a.3.3 0 00-.086-.266l-1.235-1.204a.3.3 0 01.166-.511l1.707-.248a.3.3 0 00.226-.164l.763-1.547z"
              fill="#CBCBCB"
            />
          </G>
          <G clipPath="url(#clip1_3_32155)">
            <Path
              d="M12.269 10.795a.3.3 0 00-.538 0l-.763 1.547a.3.3 0 01-.226.164l-1.707.248a.3.3 0 00-.166.511l1.235 1.204a.3.3 0 01.086.266l-.291 1.7a.3.3 0 00.435.316l1.526-.803a.3.3 0 01.28 0l1.526.803a.3.3 0 00.435-.316l-.291-1.7a.3.3 0 01.086-.266l1.235-1.204a.3.3 0 00-.166-.511l-1.707-.248a.3.3 0 01-.226-.164l-.763-1.547z"
              fill="#A8A8A8"
            />
          </G>
        </G>
        <Defs>
          <LinearGradient
            id="paint0_linear_3_32155"
            x1={12}
            y1={1.5}
            x2={12}
            y2={25.5}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#E3E9E6" />
            <Stop offset={1} stopColor="#A8ACAA" />
          </LinearGradient>
          <ClipPath id="clip0_3_32155">
            <Path
              fill="#fff"
              transform="translate(8.25 10.25)"
              d="M0 0H3.75V7.5H0z"
            />
          </ClipPath>
          <ClipPath id="clip1_3_32155">
            <Path
              fill="#fff"
              transform="matrix(-1 0 0 1 15.75 10.25)"
              d="M0 0H3.75V7.5H0z"
            />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}

export default BadgeSilverMissionIcon;
