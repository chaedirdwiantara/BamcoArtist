import * as React from 'react';
import {View} from 'react-native';
import Svg, {Defs, G, LinearGradient, Path, Stop} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function MediaRewardIcon({
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
          fill="url(#paint0_linear_10916_207375)"
        />
        <Path
          d="M16.48 37.156a1.5 1.5 0 001.478 0l14-7.934a1.5 1.5 0 00.76-1.305V12.083a1.5 1.5 0 00-.76-1.305l-14-7.934a1.5 1.5 0 00-1.479 0l-14 7.934a1.5 1.5 0 00-.76 1.305v15.834c0 .54.29 1.039.76 1.305l14 7.934z"
          fill="url(#paint1_linear_10916_207375)"
          stroke="url(#paint2_linear_10916_207375)"
        />
        <G opacity={0.4} filter="url(#filter0_d_10916_207375)">
          <Path
            d="M25 16.648v6.704C25 26.264 23.264 28 20.352 28h-6.704C10.736 28 9 26.264 9 23.352v-6.704c0-.408.032-.8.104-1.16.408-2.2 2.032-3.48 4.512-3.488h6.768c2.48.008 4.104 1.288 4.512 3.488.072.36.104.752.104 1.16z"
            fill="url(#paint3_linear_10916_207375)"
          />
        </G>
        <G filter="url(#filter1_d_10916_207375)">
          <Path
            d="M25 16.648v.04H9v-.04c0-.408.032-.8.104-1.16h4.512V12h1.2v3.488h4.368V12h1.2v3.488h4.512c.072.36.104.752.104 1.16z"
            fill="url(#paint4_linear_10916_207375)"
          />
        </G>
        <G filter="url(#filter2_d_10916_207375)">
          <Path
            d="M18.954 20.576l-1.664-.96c-.616-.352-1.208-.4-1.672-.136-.464.264-.72.808-.72 1.512v1.92c0 .704.256 1.248.72 1.512.2.112.424.168.656.168.32 0 .664-.104 1.016-.304l1.664-.96c.616-.352.952-.848.952-1.384 0-.536-.344-1.008-.952-1.368z"
            fill="url(#paint5_linear_10916_207375)"
          />
        </G>
        <Defs>
          <LinearGradient
            id="paint0_linear_10916_207375"
            x1={12.2357}
            y1={41.2245}
            x2={12.2357}
            y2={-1.2987}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#50464C" />
            <Stop offset={1} stopColor="#4B4148" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_10916_207375"
            x1={17.2188}
            y1={37}
            x2={17.2187}
            y2={3}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#362F34" />
            <Stop offset={1} stopColor="#35182C" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_10916_207375"
            x1={17.2188}
            y1={37}
            x2={17.2187}
            y2={1.49557}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#9F8E9A" />
            <Stop offset={1} stopColor="#272125" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_10916_207375"
            x1={10.6154}
            y1={12.9697}
            x2={25.5722}
            y2={14.3935}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#F98FD9" />
            <Stop offset={1} stopColor="#FF70D4" />
          </LinearGradient>
          <LinearGradient
            id="paint4_linear_10916_207375"
            x1={10.6154}
            y1={12.2841}
            x2={24.2668}
            y2={16.7193}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#BA1B89" />
            <Stop offset={1} stopColor="#FF70D4" />
          </LinearGradient>
          <LinearGradient
            id="paint5_linear_10916_207375"
            x1={15.4041}
            y1={19.632}
            x2={20.0897}
            y2={20.0551}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#BA1B89" />
            <Stop offset={1} stopColor="#FF70D4" />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default MediaRewardIcon;
