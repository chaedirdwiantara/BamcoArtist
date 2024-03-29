import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function DefaultBrowserIcon({
  width = widthResponsive(32),
  height = widthResponsive(32),
  fill = '#A2B7DD',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 32 32'}>
        <Path
          fill={fill}
          d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm10.4 10.6c.8 0 1.4.6 2.2.6-.6.8-3.2.8-4-.2.6-.2 1-.4 1.8-.4zM2 16c0-.8 0-1.6.2-2.6.2 0 .4.2.6.2 0 0 .2.2.2.4 0 .6.6 1 1 1 1.6.2 2.2 1.6 3.6 2 .4.2.2.6 0 1-1.2 1.6-.2 2.8.8 3.8 1 .8 1 1.6 1.2 2.8 0 1.4.2 3 .8 4.4-5-2.4-8.4-7.2-8.4-13zm14 14c-1.4 0-3-.2-4.2-.6-.2-.4-.2-.8 0-1.2.8-1.6 1.6-3 2.6-4.4.4-.4.8-.8.8-1.4 0-.4.2-1 .4-1.4.6-1 .4-1.6-.4-1.8-1.6-.4-2.4-1.8-3.6-2.4-1.2-.6-2.4-1-3.4-.4-.4.2-1 .4-1-.2 0-.8-1-1.4-.8-2.2-.2 0-.4 0-.6.2-.2.2-.4.4-.8.2-.4-.4-.2-.8-.2-1.2.2-.4.4-.6.8-.8.8-.2 1.6-.2 2 .8.6-1.8 1.8-2.8 3-3.6 0 0 1.6-1.4 1.8-1.4.2 0 .4.4.8.6.4 0 .6 0 .6-.4.2-1-.4-2.2-1.2-2.4 0-.2.2-.2.2-.2.6-.2 1.4-.6 1.2-1.2 0-.8-.8-1.2-1.6-1.2-.4 0-.8 0-1.2.2-.8.4-1.8.8-3 .8C10.4 2.8 13.2 2 16 2h1.6c-1.2.2-2.4.6-3.2 1 1.2.2 1.4.8 1 1.8-.2.4 0 .8.4 1 .4.2.8.2 1-.2.4-.6 1.2-.8 1.8-1 .8-.2 1.4-.6 2-1.4 0-.2.2-.2.4-.4 1.2.4 2.4 1.2 3.6 2-.2 0-.2.2-.4.2-.4.4-1 .6-.4 1.4.2.4 0 .6-.2.8-.4.2-.6 0-.8-.2-.2-.2-.2-.6-.8-.6-.2.4-.8.6-.8 1.2 1 0 .8.8 1 1.4-1.2.2-1.6.8-1 1.8.2.4-.2.6-.4.8-.8 1.2-1.6 2-1.6 3.4s1 2.8 2.6 2.6c1.8-.2 1.8-.2 2.4 1.4 0 .2.2.4.2.6.2.4.4.8.2 1.2-.6 1.6.2 2.8.8 4 .2.4.4.6.6.8-2.6 2.8-6 4.4-10 4.4z"></Path>
      </Svg>
    </View>
  );
}

export default DefaultBrowserIcon;
