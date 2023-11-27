import * as React from 'react';
import {View} from 'react-native';
import Svg, {Defs, G, LinearGradient, Path, Stop} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function TicketRewardIcon({
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
          fill="url(#paint0_linear_10916_207366)"
        />
        <Path
          d="M16.48 37.156a1.5 1.5 0 001.478 0l14-7.934a1.5 1.5 0 00.76-1.305V12.083a1.5 1.5 0 00-.76-1.305l-14-7.934a1.5 1.5 0 00-1.479 0l-14 7.934a1.5 1.5 0 00-.76 1.305v15.834c0 .54.29 1.039.76 1.305l14 7.934z"
          fill="url(#paint1_linear_10916_207366)"
          stroke="url(#paint2_linear_10916_207366)"
        />
        <G opacity={0.4} filter="url(#filter0_d_10916_207366)">
          <Path
            d="M25.37 19.282c.351 0 .63-.279.63-.63v-.837C26 14.125 24.875 13 21.185 13h-8.37C9.125 13 8 14.125 8 17.815v.423c0 .351.279.63.63.63.81 0 1.467.657 1.467 1.467a1.46 1.46 0 01-1.467 1.458.626.626 0 00-.63.63v.423c0 3.69 1.125 4.815 4.815 4.815h8.37c3.69 0 4.815-1.125 4.815-4.815a.626.626 0 00-.63-.63 1.467 1.467 0 010-2.934z"
            fill="url(#paint3_linear_10916_207366)"
          />
        </G>
        <G filter="url(#filter1_d_10916_207366)">
          <Path
            d="M19.698 23.818a.905.905 0 01-.909-.9c0-.495.405-.9.9-.9s.9.405.9.9a.89.89 0 01-.89.9z"
            fill="url(#paint4_linear_10916_207366)"
          />
        </G>
        <G filter="url(#filter2_d_10916_207366)">
          <Path
            d="M14.3 19.318a.905.905 0 01-.91-.9c0-.495.406-.9.9-.9.496 0 .9.405.9.9a.89.89 0 01-.89.9z"
            fill="url(#paint5_linear_10916_207366)"
          />
        </G>
        <G filter="url(#filter3_d_10916_207366)">
          <Path
            d="M13.97 24.313a.668.668 0 01-.477-.198.679.679 0 010-.954l6.057-6.057a.679.679 0 01.954 0 .679.679 0 010 .954l-6.057 6.057a.653.653 0 01-.477.198z"
            fill="url(#paint6_linear_10916_207366)"
          />
        </G>
        <Defs>
          <LinearGradient
            id="paint0_linear_10916_207366"
            x1={12.2357}
            y1={41.2245}
            x2={12.2357}
            y2={-1.2987}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#50464C" />
            <Stop offset={1} stopColor="#4B4148" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_10916_207366"
            x1={17.2188}
            y1={37}
            x2={17.2187}
            y2={3}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#362F34" />
            <Stop offset={1} stopColor="#35182C" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_10916_207366"
            x1={17.2188}
            y1={37}
            x2={17.2187}
            y2={1.49557}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#9F8E9A" />
            <Stop offset={1} stopColor="#272125" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_10916_207366"
            x1={9.81731}
            y1={13.8885}
            x2={26.5674}
            y2={15.8462}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#F98FD9" />
            <Stop offset={1} stopColor="#FF70D4" />
          </LinearGradient>
          <LinearGradient
            id="paint4_linear_10916_207366"
            x1={18.9708}
            y1={22.1269}
            x2={20.6534}
            y2={22.2871}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#B92C8E" />
            <Stop offset={1} stopColor="#FF70D4" />
          </LinearGradient>
          <LinearGradient
            id="paint5_linear_10916_207366"
            x1={13.5724}
            y1={17.6269}
            x2={15.255}
            y2={17.7871}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#B92C8E" />
            <Stop offset={1} stopColor="#FF70D4" />
          </LinearGradient>
          <LinearGradient
            id="paint6_linear_10916_207366"
            x1={14.0442}
            y1={17.3567}
            x2={20.9641}
            y2={18.0153}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#B92C8E" />
            <Stop offset={1} stopColor="#FF70D4" />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default TicketRewardIcon;
