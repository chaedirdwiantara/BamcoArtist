import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function CopyrightProducerIcon({
  width = widthPercentage(18),
  height = widthPercentage(18),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
        <Circle cx={5} cy={8} r={4.5} stroke="#fff" />
        <Path
          d="M3.38 10V5.636H5.1c.332 0 .614.064.847.19.233.125.41.299.532.522.124.222.186.477.186.767 0 .29-.063.546-.188.767a1.293 1.293 0 01-.543.518c-.236.123-.521.185-.857.185H3.98v-.74h.948c.178 0 .324-.03.44-.09a.607.607 0 00.26-.259.808.808 0 00.086-.38.787.787 0 00-.087-.38.583.583 0 00-.26-.254.95.95 0 00-.443-.091h-.622V10h-.923z"
          fill="#fff"
        />
      </Svg>
    </View>
  );
}

export default CopyrightProducerIcon;
