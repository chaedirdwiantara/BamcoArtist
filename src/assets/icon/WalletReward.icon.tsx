import * as React from 'react';
import {View} from 'react-native';
import Svg, {Defs, G, LinearGradient, Path, Stop} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function WalletRewardIcon({
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
          fill="url(#a)"
          d="M18.621 39.115a3 3 0 0 1-3.027 0L1.483 30.87a3 3 0 0 1-1.486-2.59V11.72a3 3 0 0 1 1.486-2.59L15.593.885a3 3 0 0 1 3.028 0L32.733 9.13a3 3 0 0 1 1.486 2.59V28.28a3 3 0 0 1-1.486 2.59L18.62 39.115Z"
        />
        <Path
          fill="url(#b)"
          stroke="url(#c)"
          d="M16.48 37.156a1.5 1.5 0 0 0 1.478 0l14-7.934a1.5 1.5 0 0 0 .76-1.305V12.083a1.5 1.5 0 0 0-.76-1.305l-14-7.934a1.5 1.5 0 0 0-1.479 0l-14 7.934a1.5 1.5 0 0 0-.76 1.305v15.834c0 .54.29 1.039.76 1.305l14 7.934Z"
        />
        <G filter="url(#d)" opacity={0.4}>
          <Path
            fill="url(#e)"
            d="M22.709 19.454h1.476v-1.052a2.753 2.753 0 0 0-2.747-2.747h-8.386a2.753 2.753 0 0 0-2.747 2.747v3.192a2.921 2.921 0 0 1 4.748 2.28c0 .548-.153 1.066-.424 1.504-.153.264-.35.497-.577.687h7.386a2.753 2.753 0 0 0 2.747-2.747v-.869h-1.388c-.79 0-1.512-.577-1.578-1.366-.044-.46.131-.891.438-1.19.27-.278.643-.439 1.052-.439Z"
          />
        </G>
        <G filter="url(#f)">
          <Path
            fill="url(#g)"
            d="M19.327 12.88v2.775H13.05a2.753 2.753 0 0 0-2.746 2.747v-2.68c0-.87.533-1.645 1.344-1.951l5.8-2.192a1.391 1.391 0 0 1 1.878 1.3Z"
          />
        </G>
        <G filter="url(#h)">
          <Path
            fill="url(#i)"
            d="M24.958 20.2v1.504a.75.75 0 0 1-.73.745h-1.433c-.788 0-1.512-.577-1.577-1.366-.044-.46.131-.891.438-1.19.27-.278.643-.439 1.052-.439h1.52a.75.75 0 0 1 .73.745Z"
          />
        </G>
        <G filter="url(#j)">
          <Path
            fill="url(#k)"
            d="M18.7 19.308h-5.113a.552.552 0 0 1-.548-.548c0-.3.248-.548.548-.548h5.114c.3 0 .547.248.547.548 0 .3-.248.548-.547.548Z"
          />
        </G>
        <G filter="url(#l)">
          <Path
            fill="url(#m)"
            d="M14.199 21.807a2.924 2.924 0 0 0-1.746-.836 2.9 2.9 0 0 0-2.386.836 2.865 2.865 0 0 0-.765 1.364 2.9 2.9 0 0 0 .765 2.769 2.853 2.853 0 0 0 1.875.842c.294.026.599 0 .893-.078a2.864 2.864 0 0 0 1.364-.764 2.921 2.921 0 0 0 0-4.133Zm-2.603.972c0-.3.248-.548.547-.548a.56.56 0 0 1 .553.553l-.005.542.521-.005a.56.56 0 0 1 .553.553.56.56 0 0 1-.553.552l-.521-.005.005.543a.56.56 0 0 1-.553.552.565.565 0 0 1-.547-.547v-.548h-.569a.542.542 0 0 1-.387-.16.542.542 0 0 1-.16-.387c0-.3.248-.548.547-.548h.569v-.547Z"
          />
        </G>
        <Defs>
          <LinearGradient
            id="a"
            x1={12.236}
            x2={12.236}
            y1={41.224}
            y2={-1.299}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#50464C" />
            <Stop offset={1} stopColor="#4B4148" />
          </LinearGradient>
          <LinearGradient
            id="b"
            x1={17.219}
            x2={17.219}
            y1={37}
            y2={3}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#362F34" />
            <Stop offset={1} stopColor="#35182C" />
          </LinearGradient>
          <LinearGradient
            id="c"
            x1={17.219}
            x2={17.219}
            y1={37}
            y2={1.496}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#9F8E9A" />
            <Stop offset={1} stopColor="#272125" />
          </LinearGradient>
          <LinearGradient
            id="e"
            x1={11.706}
            x2={24.591}
            y1={16.286}
            y2={17.922}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#F98FD9" />
            <Stop offset={1} stopColor="#FF70D4" />
          </LinearGradient>
          <LinearGradient
            id="g"
            x1={11.216}
            x2={19.596}
            y1={11.91}
            y2={12.951}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#F98FD9" />
            <Stop offset={1} stopColor="#B92C8E" />
          </LinearGradient>
          <LinearGradient
            id="i"
            x1={21.589}
            x2={25.074}
            y1={19.636}
            y2={20.051}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#F98FD9" />
            <Stop offset={1} stopColor="#B92C8E" />
          </LinearGradient>
          <LinearGradient
            id="k"
            x1={13.666}
            x2={18.203}
            y1={18.278}
            y2={20.726}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#F98FD9" />
            <Stop offset={1} stopColor="#B92C8E" />
          </LinearGradient>
          <LinearGradient
            id="m"
            x1={12.3}
            x2={15.795}
            y1={20.409}
            y2={24.64}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#F98FD9" />
            <Stop offset={1} stopColor="#B92C8E" />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default WalletRewardIcon;
