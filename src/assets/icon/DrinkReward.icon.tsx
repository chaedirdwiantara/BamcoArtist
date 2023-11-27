import * as React from 'react';
import {View} from 'react-native';
import Svg, {Defs, G, LinearGradient, Path, Stop} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function DrinkRewardIcon({
  width = widthResponsive(35),
  height = widthResponsive(40),
  fill = '#F4D761',
  stroke = '',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 35 40'}>
        <Path
          d="M18.621 39.115a3 3 0 01-3.027 0L1.483 30.87a3 3 0 01-1.486-2.59V11.72a3 3 0 011.486-2.59L15.593.885a3 3 0 013.028 0L32.733 9.13a3 3 0 011.486 2.59V28.28a3 3 0 01-1.486 2.59L18.62 39.115z"
          fill="url(#paint0_linear_10916_207352)"
        />
        <Path
          d="M16.48 37.156a1.5 1.5 0 001.478 0l14-7.934a1.5 1.5 0 00.76-1.305V12.083a1.5 1.5 0 00-.76-1.305l-14-7.934a1.5 1.5 0 00-1.479 0l-14 7.934a1.5 1.5 0 00-.76 1.305v15.834c0 .54.29 1.039.76 1.305l14 7.934z"
          fill="url(#paint1_linear_10916_207352)"
          stroke="url(#paint2_linear_10916_207352)"
        />
        <G opacity={0.4} filter="url(#filter0_d_10916_207352)">
          <Path
            d="M22.266 13.32v11.213c0 1.32-.884 1.979-1.98 1.979H15.01c-1.095 0-1.979-.66-1.979-1.98V13.32h9.235z"
            fill="url(#paint3_linear_10916_207352)"
          />
        </G>
        <G filter="url(#filter1_d_10916_207352)">
          <Path
            d="M13.1 12.66h9.093c.219 0 .4.299.4.66 0 .36-.181.659-.4.659H13.1c-.22 0-.402-.299-.402-.66 0-.36.182-.66.402-.66z"
            fill="url(#paint4_linear_10916_207352)"
          />
        </G>
        <G filter="url(#filter2_d_10916_207352)">
          <Path
            d="M19.37 21.235h-3.45c-.685 0-1.246.33-1.246 1.246v.812c.007.91.567 1.24 1.253 1.24h3.45c.68 0 1.24-.33 1.24-1.247v-.811c0-.91-.56-1.24-1.247-1.24z"
            fill="url(#paint5_linear_10916_207352)"
          />
        </G>
        <G filter="url(#filter3_d_10916_207352)">
          <Path
            d="M18.308 18.761h1.979c.27 0 .494.224.494.495 0 .27-.224.494-.494.494h-1.98a.498.498 0 01-.494-.494c0-.27.224-.495.495-.495z"
            fill="url(#paint6_linear_10916_207352)"
          />
        </G>
        <G filter="url(#filter4_d_10916_207352)">
          <Path
            d="M9.568 21.235v-3.958c0-.27.218-.495.495-.495l2.968-.006v.989l-2.473.007v3.16l1.049.52a.491.491 0 01.217.666.499.499 0 01-.666.218l-1.32-.66a.502.502 0 01-.27-.441z"
            fill="url(#paint7_linear_10916_207352)"
          />
        </G>
        <Defs>
          <LinearGradient
            id="paint0_linear_10916_207352"
            x1={12.2357}
            y1={41.2245}
            x2={12.2357}
            y2={-1.2987}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#50464C" />
            <Stop offset={1} stopColor="#4B4148" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_10916_207352"
            x1={17.2188}
            y1={37}
            x2={17.2187}
            y2={3}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#362F34" />
            <Stop offset={1} stopColor="#35182C" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_10916_207352"
            x1={17.2188}
            y1={37}
            x2={17.2187}
            y2={1.49557}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#9F8E9A" />
            <Stop offset={1} stopColor="#272125" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_10916_207352"
            x1={21.3333}
            y1={25.7122}
            x2={12.661}
            y2={25.1343}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#F98FD9" />
            <Stop offset={1} stopColor="#FF70D4" />
          </LinearGradient>
          <LinearGradient
            id="paint4_linear_10916_207352"
            x1={21.5948}
            y1={13.899}
            x2={15.4129}
            y2={9.48549}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#B92C8E" />
            <Stop offset={1} stopColor="#E454B9" />
          </LinearGradient>
          <LinearGradient
            id="paint5_linear_10916_207352"
            x1={20.0172}
            y1={24.3328}
            x2={14.5714}
            y2={23.3987}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#B92C8E" />
            <Stop offset={1} stopColor="#E454B9" />
          </LinearGradient>
          <LinearGradient
            id="paint6_linear_10916_207352"
            x1={20.4816}
            y1={19.6905}
            x2={17.8928}
            y2={18.9512}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FF70D4" />
            <Stop offset={1} stopColor="#B92C8E" />
          </LinearGradient>
          <LinearGradient
            id="paint7_linear_10916_207352"
            x1={12.6816}
            y1={22.0476}
            x2={9.42631}
            y2={21.8564}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#B92C8E" />
            <Stop offset={1} stopColor="#E454B9" />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default DrinkRewardIcon;
