import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function AddVoteIcon({
  width = widthPercentage(20),
  height = widthPercentage(20),
  fill = '#8794AD',
  stroke = '#657694',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
        <Path
          fill={fill}
          d="M14.083 16.667H4.25a.63.63 0 01-.625-.625.63.63 0 01.625-.625h9.833c.842 0 1.125-.175 1.125-1.233v-.867c0-1.058-.283-1.233-1.125-1.233H4.25a.63.63 0 01-.625-.625.63.63 0 01.625-.625h9.833c1.6 0 2.375.817 2.375 2.483v.867c0 1.667-.775 2.483-2.375 2.483zM9.917 9.583H4.25a.63.63 0 01-.625-.625.63.63 0 01.625-.625h5.667c.841 0 1.125-.175 1.125-1.233v-.867C11.042 5.175 10.758 5 9.917 5H4.25a.63.63 0 01-.625-.625.63.63 0 01.625-.625h5.667c1.6 0 2.375.817 2.375 2.483V7.1c0 1.667-.775 2.483-2.375 2.483z"></Path>
        <Path
          fill={fill}
          d="M4.164 18.95a.63.63 0 01-.625-.625V1.658a.63.63 0 01.625-.625.63.63 0 01.625.625v16.667a.63.63 0 01-.625.625z"></Path>
      </Svg>
    </View>
  );
}

export default AddVoteIcon;
