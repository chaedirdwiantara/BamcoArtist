import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Defs, G, Path, Rect} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function RedeemSuccessIcon({
  width = widthResponsive(120),
  height = widthResponsive(120),
  fill = '#F4D761',
  stroke = '',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 120 120'}>
        <Rect width={120} height={120} rx={60} fill="#20242C" />
        <Path
          d="M60 23l12.035 7.944 14.128 2.893 2.893 14.128L97 60l-7.944 12.035-2.893 14.128-14.128 2.893L60 97l-12.035-7.944-14.128-2.893-2.893-14.128L23 60l7.944-12.035 2.893-14.128 14.128-2.893L60 23z"
          fill="#FF69D2"
          fillOpacity={0.4}
        />
        <G opacity={0.8} filter="url(#filter0_d_11042_66488)">
          <Circle cx={60} cy={60} r={24} fill="#DD41A7" />
        </G>
        <G filter="url(#filter1_d_11042_66488)">
          <Path
            d="M56.489 67.813c-.494 0-.962-.197-1.308-.543l-6.98-6.98a1.861 1.861 0 010-2.615 1.861 1.861 0 012.614 0l5.674 5.674 12.678-12.68a1.861 1.861 0 012.615 0c.715.716.715 1.9 0 2.616L57.796 67.27a1.848 1.848 0 01-1.307.542z"
            fill="#fff"
          />
        </G>
        <Defs></Defs>
      </Svg>
    </View>
  );
}

export default RedeemSuccessIcon;
