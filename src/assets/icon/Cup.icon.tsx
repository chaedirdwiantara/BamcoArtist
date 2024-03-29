import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function CupIcon({
  width = widthResponsive(12),
  height = widthResponsive(12),
  fill = '#F4D761',
  stroke = '',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 12 12'}>
        <Path
          d="M6.078 9.675a.378.378 0 01-.375-.375V8.25c0-.205.17-.375.375-.375s.375.17.375.375V9.3c0 .205-.17.375-.375.375z"
          fill={fill}
        />
        <Path
          d="M8.953 11.375h-5.75V10.5c0-.76.615-1.375 1.375-1.375h3c.76 0 1.375.615 1.375 1.375v.875zm-5-.75h4.25V10.5a.625.625 0 00-.625-.625h-3a.625.625 0 00-.625.625v.125z"
          fill={fill}
        />
        <Path
          d="M9.078 11.375h-6A.378.378 0 012.703 11c0-.205.17-.375.375-.375h6c.205 0 .375.17.375.375s-.17.375-.375.375zM9.213 6.22a.381.381 0 01-.285-.13.37.37 0 01-.06-.395c.17-.39.255-.805.255-1.24v-1.5c0-.175-.03-.345-.09-.525a.82.82 0 01-.015-.055 1.125 1.125 0 01-.02-.22c0-.205.17-.375.375-.375h.3c.895 0 1.625.75 1.625 1.675 0 .765-.315 1.52-.86 2.065l-.045.04c-.295.245-.63.52-1.08.645a.346.346 0 01-.1.015zm.625-3.675c.025.135.035.275.035.41v1.5c0 .205-.015.4-.045.6l.085-.07c.4-.4.635-.96.635-1.53 0-.45-.305-.83-.71-.91zM2.793 6.2a.31.31 0 01-.115-.02c-.41-.13-.795-.37-1.115-.69-.575-.635-.86-1.33-.86-2.065 0-.91.715-1.625 1.625-1.625h.325a.374.374 0 01.345.525c-.08.18-.12.385-.12.6v1.5c0 .43.085.85.26 1.25.06.135.03.29-.065.4a.383.383 0 01-.28.125zm-.64-3.635c-.405.08-.7.43-.7.86 0 .545.22 1.07.655 1.55.02.025.045.045.07.065a3.644 3.644 0 01-.05-.615v-1.5c0-.12.01-.24.025-.36z"
          fill={fill}
        />
        <Path
          d="M6 8.375A3.882 3.882 0 012.125 4.5V3A2.377 2.377 0 014.5.625h3A2.377 2.377 0 019.875 3v1.5A3.882 3.882 0 016 8.375zm-1.5-7c-.895 0-1.625.73-1.625 1.625v1.5a3.126 3.126 0 006.25 0V3c0-.895-.73-1.625-1.625-1.625h-3z"
          fill={fill}
        />
      </Svg>
    </View>
  );
}

export default CupIcon;
