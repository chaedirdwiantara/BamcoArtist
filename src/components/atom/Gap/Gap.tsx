import {View} from 'react-native';
import React from 'react';
import {
  heightResponsive,
  widthResponsive,
} from '../../../utils/dimensionFormat';

interface GapProps {
  height?: number;
  width?: number;
}

const Gap: React.FC<GapProps> = ({height, width}) => {
  return (
    <View
      style={{
        height: height && heightResponsive(height),
        width: width && widthResponsive(width),
      }}
    />
  );
};

export default Gap;
