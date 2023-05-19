import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function CopyrightVisualIcon({
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
          d="M6.929 7.164h-.934a.912.912 0 00-.104-.322.819.819 0 00-.202-.243.89.89 0 00-.286-.153 1.092 1.092 0 00-.347-.053c-.226 0-.423.056-.59.168-.168.11-.298.273-.39.486a1.925 1.925 0 00-.139.771c0 .311.046.573.139.784.093.212.224.372.392.48.167.108.361.162.581.162.124 0 .238-.017.343-.05a.823.823 0 00.488-.375.905.905 0 00.115-.31l.934.004a1.742 1.742 0 01-.567 1.076c-.16.145-.352.26-.575.345a2.113 2.113 0 01-.753.126c-.389 0-.737-.088-1.044-.265a1.875 1.875 0 01-.724-.764c-.176-.334-.264-.738-.264-1.213 0-.476.09-.88.268-1.214A1.87 1.87 0 014 5.84a2.042 2.042 0 011.035-.264c.253 0 .488.035.704.106.217.071.41.175.577.311.168.135.304.3.41.497.106.196.174.42.204.673z"
          fill="#fff"
        />
      </Svg>
    </View>
  );
}

export default CopyrightVisualIcon;
