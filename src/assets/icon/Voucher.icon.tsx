import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function VoucherNotif({
  width = widthPercentage(20),
  height = widthPercentage(20),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 20 20" fill={fill}>
        <Path
          d="M13.875 3.217H8.258v2.516a.585.585 0 01-.583.584.585.585 0 01-.583-.584V3.217h-.967c-3.292 0-4.375.983-4.45 4.058a.565.565 0 00.167.417c.108.116.25.175.416.175 1.167 0 2.125.966 2.125 2.133a2.141 2.141 0 01-2.125 2.133.56.56 0 00-.416.175.566.566 0 00-.167.417c.075 3.075 1.158 4.058 4.45 4.058h.967v-2.516c0-.325.266-.584.583-.584.317 0 .583.259.583.584v2.516h5.617c3.417 0 4.458-1.041 4.458-4.458v-4.65c0-3.417-1.041-4.458-4.458-4.458zm1.517 6.7l-.775.75c-.034.025-.042.075-.034.116l.184 1.059a.511.511 0 01-.209.508.51.51 0 01-.541.042l-.959-.5a.142.142 0 00-.116 0l-.959.5a.494.494 0 01-.241.058.52.52 0 01-.508-.608l.183-1.059a.15.15 0 00-.034-.116l-.775-.75a.513.513 0 01-.133-.525.492.492 0 01.417-.35l1.066-.159a.166.166 0 00.1-.066l.475-.967a.521.521 0 01.925 0l.475.967c.017.041.05.066.092.066l1.067.159c.2.025.358.166.416.35a.478.478 0 01-.116.525z"
          fill="#E9DA5D"
        />
      </Svg>
    </View>
  );
}

export default VoucherNotif;
