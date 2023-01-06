import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function SoundIcon({
  width = widthPercentage(15),
  height = widthPercentage(15),
  fill = 'none',
  stroke = '#00CE61',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
        <Path
          d="M2.5 13.75a.63.63 0 01-.625-.625v-6.25A.63.63 0 012.5 6.25a.63.63 0 01.625.625v6.25a.63.63 0 01-.625.625zM6.25 15.833a.63.63 0 01-.625-.625V4.792a.63.63 0 01.625-.625.63.63 0 01.625.625v10.416a.63.63 0 01-.625.625zM10 17.917a.63.63 0 01-.625-.625V2.708A.63.63 0 0110 2.083a.63.63 0 01.625.625v14.584a.63.63 0 01-.625.625zM13.75 15.833a.63.63 0 01-.625-.625V4.792a.63.63 0 01.625-.625.63.63 0 01.625.625v10.416a.63.63 0 01-.625.625zM17.5 13.75a.63.63 0 01-.625-.625v-6.25a.63.63 0 01.625-.625.63.63 0 01.625.625v6.25a.63.63 0 01-.625.625z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default SoundIcon;
