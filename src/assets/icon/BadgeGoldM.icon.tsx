import * as React from 'react';
import {View} from 'react-native';
import Svg, {Defs, G, LinearGradient, Mask, Path, Stop} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function BadgeGoldMIcon({
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
          fill="url(#paint0_linear_9377_105111)"
        />
        <Path
          d="M104.366 33.344h0L60.658 8.414a2 2 0 00-1.982 0l-43.708 24.93a2 2 0 00-1.009 1.737v49.838a2 2 0 001.01 1.737l43.707 24.93c.614.35 1.368.35 1.982 0l43.708-24.93a2 2 0 001.009-1.737V35.081a2 2 0 00-1.009-1.737z"
          fill="url(#paint1_linear_9377_105111)"
          stroke="url(#paint2_linear_9377_105111)"
          strokeWidth={2}
        />
        <Path
          opacity={0.7}
          d="M77.555 33l2.563-.425a5.437 5.437 0 004.466-4.495l.422-2.58.422 2.58a5.437 5.437 0 004.466 4.495l2.563.425-2.563.425a5.437 5.437 0 00-4.466 4.495l-.422 2.58-.422-2.58a5.437 5.437 0 00-4.466-4.495L77.555 33zM37.203 91.976l2.044-.34a4.336 4.336 0 003.562-3.584l.337-2.058.336 2.058a4.336 4.336 0 003.562 3.585l2.044.339-2.044.339a4.336 4.336 0 00-3.562 3.585l-.336 2.057-.337-2.057a4.336 4.336 0 00-3.562-3.585l-2.044-.34zM77.555 82.5l1.025-.17a2.175 2.175 0 001.786-1.798l.17-1.032.168 1.032c.151.923.87 1.646 1.787 1.798l1.025.17-1.025.17a2.175 2.175 0 00-1.787 1.798l-.169 1.032-.169-1.032a2.175 2.175 0 00-1.786-1.798l-1.025-.17zM25.313 37.737l1.532-.255a3.252 3.252 0 002.672-2.688l.252-1.543.253 1.543a3.252 3.252 0 002.671 2.689l1.533.254-1.533.254a3.252 3.252 0 00-2.671 2.689l-.253 1.543-.252-1.543a3.252 3.252 0 00-2.672-2.69l-1.532-.253z"
          fill="#fff"
        />
        <G filter="url(#filter0_f_9377_105111)">
          <Path
            d="M59.498 96.518a.349.349 0 01-.566 0L31.508 58.692a.349.349 0 010-.41l10.387-14.286a.349.349 0 01.282-.144h34.076a.35.35 0 01.282.144l10.386 14.286a.349.349 0 010 .41L59.498 96.518z"
            fill="#976725"
          />
        </G>
        <Path
          d="M59.498 88.666a.349.349 0 01-.566 0L31.508 50.841a.349.349 0 010-.41l10.387-14.287a.349.349 0 01.282-.144h34.076a.35.35 0 01.282.144l10.386 14.287a.349.349 0 010 .41L59.498 88.666z"
          fill="#FFF1D2"
        />
        <Path
          d="M59.37 87.46a.174.174 0 01-.331 0L42.195 36.23a.174.174 0 01.166-.229h33.687c.119 0 .203.116.166.23L59.37 87.46z"
          fill="url(#paint3_linear_9377_105111)"
        />
        <Path
          d="M59.205 36.002L46.777 50.668h24.856L59.205 36.002z"
          fill="url(#paint4_linear_9377_105111)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_9377_105111"
            x1={45.4792}
            y1={123.673}
            x2={45.4792}
            y2={-3.89608}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#A16D2A" />
            <Stop offset={0.528348} stopColor="#E7CF6B" />
            <Stop offset={1} stopColor="#EFE7BE" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_9377_105111"
            x1={59.6672}
            y1={111}
            x2={59.6672}
            y2={8.99999}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#91682C" />
            <Stop offset={0.460638} stopColor="#D39E4E" />
            <Stop offset={1} stopColor="#895A1C" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_9377_105111"
            x1={59.6672}
            y1={111}
            x2={59.6672}
            y2={4.48671}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#EEE3B1" />
            <Stop offset={1} stopColor="#AC7D34" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_9377_105111"
            x1={59.2045}
            y1={87.9639}
            x2={59.2045}
            y2={36.0013}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FFE8DC" />
            <Stop offset={1} stopColor="#E9BA79" />
          </LinearGradient>
          <LinearGradient
            id="paint4_linear_9377_105111"
            x1={59.2051}
            y1={36.002}
            x2={59.2051}
            y2={50.6677}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FFF7EB" />
            <Stop offset={1} stopColor="#FFF3D6" />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default BadgeGoldMIcon;
