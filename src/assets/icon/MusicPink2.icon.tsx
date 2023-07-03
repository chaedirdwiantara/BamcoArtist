import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function MusicPink2Icon({
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
          d="M18 23.167h-4c-3.62 0-5.167-1.547-5.167-5.167v-4c0-3.62 1.547-5.166 5.167-5.166h4c3.62 0 5.167 1.546 5.167 5.166v4c0 3.62-1.547 5.167-5.167 5.167zM14 9.833c-3.073 0-4.167 1.094-4.167 4.167v4c0 3.073 1.094 4.167 4.167 4.167h4c3.073 0 4.167-1.094 4.167-4.167v-4c0-3.073-1.094-4.166-4.167-4.166h-4z"></Path>
        <Path
          fill={fill}
          d="M14.413 20.033A1.918 1.918 0 0112.5 18.12c0-1.053.86-1.914 1.913-1.914 1.054 0 1.914.86 1.914 1.914 0 1.053-.86 1.913-1.914 1.913zm0-2.82c-.5 0-.913.407-.913.913 0 .5.407.914.913.914.5 0 .914-.407.914-.913a.915.915 0 00-.914-.914z"></Path>
        <Path
          fill={fill}
          d="M15.827 18.62a.504.504 0 01-.5-.5v-4.94c0-.273.227-.5.5-.5s.5.227.5.5v4.94a.5.5 0 01-.5.5z"></Path>
        <Path
          fill={fill}
          d="M18.347 15.62a1.44 1.44 0 01-.433-.074l-1.56-.52c-.587-.193-1.027-.806-1.027-1.426v-.414c0-.42.173-.786.48-1.006.307-.22.707-.274 1.107-.14l1.56.52c.586.193 1.026.806 1.026 1.426v.414c0 .42-.173.786-.48 1.006a1.14 1.14 0 01-.673.214zm-1.873-2.654a.167.167 0 00-.087.02c-.04.027-.067.1-.067.194v.413c0 .187.174.42.347.48l1.56.52c.087.027.167.027.207 0 .04-.027.066-.1.066-.193v-.414c0-.186-.173-.42-.346-.48l-1.56-.52a.412.412 0 00-.12-.02z"></Path>
      </Svg>
    </View>
  );
}

export default MusicPink2Icon;
