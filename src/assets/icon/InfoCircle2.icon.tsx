import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function InfoCircle2Icon({
  width = widthPercentage(16),
  height = widthPercentage(16),
  fill = 'none',
  stroke = '#F34E4E',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
        <Path
          d="M8 15.167A7.173 7.173 0 01.833 8 7.173 7.173 0 018 .833 7.173 7.173 0 0115.166 8 7.173 7.173 0 018 15.167zM8 1.833A6.174 6.174 0 001.833 8c0 3.4 2.767 6.167 6.167 6.167S14.166 11.4 14.166 8 11.4 1.833 8 1.833z"
          fill={stroke}
        />
        <Path
          d="M8 9.167a.504.504 0 01-.5-.5V5.333c0-.273.227-.5.5-.5s.5.227.5.5v3.334c0 .273-.227.5-.5.5zM8 11.333a.664.664 0 01-.254-.053.77.77 0 01-.22-.14.688.688 0 01-.14-.22.664.664 0 01-.053-.253c0-.087.02-.174.053-.254a.77.77 0 01.14-.22.771.771 0 01.22-.14.667.667 0 01.507 0c.08.034.153.08.22.14a.77.77 0 01.14.22c.033.08.053.167.053.254 0 .086-.02.173-.053.253a.688.688 0 01-.14.22.77.77 0 01-.22.14.664.664 0 01-.253.053z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default InfoCircle2Icon;
