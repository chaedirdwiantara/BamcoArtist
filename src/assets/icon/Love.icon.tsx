import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const LoveIcon = ({
  width = widthPercentage(13),
  height = widthPercentage(10),
  fill = 'none',
  stroke = '#292D32',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 16 16'}>
      <Path
        d="M7.6003 3.85284L8.00065 4.38797L8.40101 3.85284C8.98441 3.07305 9.91889 2.56665 10.9607 2.56665C12.7288 2.56665 14.1673 4.00712 14.1673 5.79332C14.1673 6.53227 14.0495 7.21373 13.8449 7.84607L13.8439 7.84933C13.353 9.4027 12.345 10.6605 11.2489 11.6025C10.1507 12.5463 8.99272 13.1483 8.25293 13.4L8.25292 13.3999L8.24757 13.4018C8.2044 13.4171 8.1149 13.4333 8.00065 13.4333C7.8864 13.4333 7.7969 13.4171 7.75373 13.4018L7.75374 13.4018L7.74837 13.4C7.00858 13.1483 5.85065 12.5463 4.75238 11.6025C3.65631 10.6605 2.64828 9.4027 2.15741 7.84933L2.15742 7.84932L2.15637 7.84607C1.95179 7.21373 1.83398 6.53227 1.83398 5.79332C1.83398 4.00712 3.27246 2.56665 5.04065 2.56665C6.08241 2.56665 7.01689 3.07305 7.6003 3.85284Z"
        stroke={stroke}
        fill={fill}
      />
    </Svg>
  </View>
);

export default LoveIcon;
