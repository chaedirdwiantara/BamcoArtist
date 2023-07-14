import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function PencilIcon({
  width = widthPercentage(32),
  height = widthPercentage(32),
  fill = '#fff',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 32 32'}>
        <Circle cx="16" cy="16" r="16" fill="#FF69D2"></Circle>
        <Path
          fill={fill}
          d="M11.693 21.013c-.406 0-.786-.14-1.06-.4-.346-.326-.513-.82-.453-1.353l.247-2.16c.046-.407.293-.947.58-1.24l5.473-5.793c1.367-1.447 2.793-1.487 4.24-.12 1.447 1.366 1.487 2.793.12 4.24l-5.473 5.793c-.28.3-.8.58-1.207.646l-2.147.367c-.113.007-.213.02-.32.02zM18.62 9.94c-.513 0-.96.32-1.413.8l-5.474 5.8c-.133.14-.286.473-.313.666l-.247 2.16c-.026.22.027.4.147.514.12.113.3.153.52.12l2.147-.367c.193-.033.513-.206.646-.346l5.474-5.794c.826-.88 1.126-1.693-.08-2.827-.534-.513-.994-.726-1.407-.726z"></Path>
        <Path
          fill={fill}
          d="M19.56 15.3h-.047a4.573 4.573 0 01-4.073-3.854.508.508 0 01.42-.573.508.508 0 01.573.42 3.581 3.581 0 003.187 3.013.5.5 0 01.447.547.516.516 0 01-.507.447zM22 23.166H10a.504.504 0 01-.5-.5c0-.273.227-.5.5-.5h12c.273 0 .5.227.5.5 0 .274-.227.5-.5.5z"></Path>
      </Svg>
    </View>
  );
}

export default PencilIcon;
