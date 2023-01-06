import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';
import {ms} from 'react-native-size-matters';

const FbIcon = ({
  width = ms(20),
  height = ms(20),
  fill = '#E0E0E0',
  stroke = '#292D32',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 20 20'}>
      <Path
        fill={fill}
        d="M18.005 1c.273 0 .508.098.703.293.195.195.293.43.293.703v16.008a.959.959 0 01-.293.703.959.959 0 01-.703.293h-4.582v-6.973h2.332l.351-2.718h-2.683V7.574c0-.437.092-.765.275-.984.184-.219.541-.328 1.072-.328l1.43-.012V3.824c-.492-.07-1.187-.105-2.086-.105-1.062 0-1.912.312-2.549.937-.636.625-.955 1.508-.955 2.649v2.004H8.267v2.718h2.343V19H1.997a.959.959 0 01-.703-.293.959.959 0 01-.293-.703V1.996c0-.273.098-.508.293-.703A.959.959 0 011.997 1h16.008z"></Path>
    </Svg>
  </View>
);

export default FbIcon;
