import * as React from 'react';
import {View} from 'react-native';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

function CrackEggIcon({
  width = widthPercentage(120),
  height = widthPercentage(120),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 120 120'}>
        <Path
          d="M97.584 55.685c7.612 24.231-4.135 41.8-23.52 47.889-19.384 6.09-39.067-1.606-46.679-25.837-7.612-24.231 2.969-56.84 19.115-61.911 15.21-4.778 43.472 15.628 51.084 39.86z"
          fill="url(#paint0_linear_1987_103990)"
        />
        <Path
          d="M73.054 40.69c2.284-1.253-6.684-5.934-7.297-7.884-.49-1.56 4.857-6.703 7.272-9.247l4.944 3.803c-1.909 1.314-5.152 4.404-5.419 4.916-.334.64 5.676 4.428 6.656 7.55.613 1.95-12.605 9.316-13.427 10.11-.822.793 2.075 1.49 2.534 2.952.745 2.373-8.845 9.92-14.124 13.007 3.013-2.91 9.338-9.147 10.53-10.807 1.491-2.075-2.687-3.44-3.48-4.262-.636-.657.403-1.555 1.002-1.922l10.81-8.216z"
          fill="#D1D1D1"
        />
        <Path
          d="M27.55 87.899c.98 2.549 5.012 9.138 13.312 15.101M89.918 36.195c1.703 2.044 5.62 7.46 7.665 12.774M98.357 51.013c.253.511.861 1.84 1.27 3.066M26.146 85.128c-.469-.924-1.4-3.096-1.378-4.388"
          stroke="#fff"
          strokeWidth={1.02195}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_1987_103990"
            x1={77.1809}
            y1={26.5405}
            x2={32.6176}
            y2={89.2786}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#EBEBEB" />
            <Stop offset={1} stopColor="#DBDBDB" />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default CrackEggIcon;
