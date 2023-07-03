import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function ChartPieIcon({
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
          d="M20.213 16.5H18c-1.66 0-2.5-.94-2.5-2.8v-1.913c0-.68.08-1.654.787-2.187.593-.44 1.446-.474 2.706-.107 1.654.48 3.034 1.86 3.514 3.514.366 1.253.333 2.113-.107 2.7-.533.713-1.507.793-2.187.793zm-2.693-6.26c-.273 0-.487.053-.627.16-.26.193-.386.646-.386 1.386v1.92c0 1.494.573 1.8 1.5 1.8h2.213c.733 0 1.187-.126 1.387-.386.233-.307.213-.92-.047-1.82-.387-1.314-1.52-2.454-2.833-2.834-.494-.153-.894-.226-1.207-.226z"></Path>
        <Path
          fill={fill}
          d="M15.38 23.167c-.353 0-.713-.027-1.073-.087-2.727-.44-4.947-2.653-5.387-5.38-.566-3.507 1.694-6.813 5.154-7.52a.507.507 0 01.593.387.507.507 0 01-.387.593c-2.926.6-4.846 3.4-4.36 6.38.374 2.307 2.247 4.18 4.554 4.553 2.993.48 5.786-1.446 6.38-4.386a.5.5 0 11.98.193 6.568 6.568 0 01-6.454 5.267z"></Path>
      </Svg>
    </View>
  );
}

export default ChartPieIcon;
