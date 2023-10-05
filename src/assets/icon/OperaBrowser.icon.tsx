import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function OperaBrowserIcon({
  width = widthResponsive(32),
  height = widthResponsive(32),
  fill = '#A2B7DD',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 32 32'}>
        <Path
          d="M10.738 25.012c-1.775-2.087-2.913-5.175-2.988-8.637v-.75c.075-3.463 1.225-6.55 2.988-8.637 2.3-2.976 5.675-4.313 9.487-4.313 2.35 0 4.563.163 6.438 1.413A15.832 15.832 0 0016.063 0H16C7.162 0 0 7.162 0 16c0 8.575 6.75 15.587 15.238 15.988.25.012.512.012.762.012 4.1 0 7.837-1.538 10.663-4.075-1.875 1.25-3.963 1.3-6.313 1.3-3.8.012-7.325-1.225-9.613-4.213z"
          fill="url(#paint0_linear_8318_62655)"
        />
        <Path
          d="M10.738 6.988c1.463-1.737 3.363-2.775 5.438-2.775 4.662 0 8.437 5.275 8.437 11.8s-3.775 11.8-8.437 11.8c-2.075 0-3.963-1.05-5.438-2.775 2.3 2.975 5.713 4.875 9.513 4.875 2.337 0 4.537-.712 6.412-1.962C29.938 25 32.001 20.738 32.001 16c0-4.738-2.063-9-5.338-11.925-1.875-1.25-4.062-1.963-6.412-1.963-3.813 0-7.225 1.888-9.513 4.875z"
          fill="url(#paint1_linear_8318_62655)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_8318_62655"
            x1={1333.21}
            y1={52.16}
            x2={1333.21}
            y2={3153.44}
            gradientUnits="userSpaceOnUse">
            <Stop offset={0.3} stopColor="#FF1B2D" />
            <Stop offset={0.4381} stopColor="#FA1A2C" />
            <Stop offset={0.5939} stopColor="#ED1528" />
            <Stop offset={0.7581} stopColor="#D60E21" />
            <Stop offset={0.9272} stopColor="#B70519" />
            <Stop offset={1} stopColor="#A70014" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_8318_62655"
            x1={1073.65}
            y1={25.8267}
            x2={1073.65}
            y2={2768.74}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#9C0000" />
            <Stop offset={0.7} stopColor="#FF4B4B" />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default OperaBrowserIcon;
