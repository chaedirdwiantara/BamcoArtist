import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const CloseIcon = ({
  width = widthPercentage(12),
  height = widthPercentage(12),
  fill = 'none',
  stroke = '#8794AD',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} viewBox="0 0 16 16" fill={fill}>
      <Path
        d="M7.99992 15.1668C4.04659 15.1668 0.833252 11.9535 0.833252 8.00016C0.833252 4.04683 4.04659 0.833496 7.99992 0.833496C11.9533 0.833496 15.1666 4.04683 15.1666 8.00016C15.1666 11.9535 11.9533 15.1668 7.99992 15.1668ZM7.99992 1.8335C4.59992 1.8335 1.83325 4.60016 1.83325 8.00016C1.83325 11.4002 4.59992 14.1668 7.99992 14.1668C11.3999 14.1668 14.1666 11.4002 14.1666 8.00016C14.1666 4.60016 11.3999 1.8335 7.99992 1.8335Z"
        fill={stroke}
      />
      <Path
        d="M10.4733 10.6202C10.3867 10.6202 10.3 10.6002 10.22 10.5468L8.15334 9.3135C7.64001 9.00684 7.26001 8.3335 7.26001 7.74017V5.00684C7.26001 4.7335 7.48668 4.50684 7.76001 4.50684C8.03334 4.50684 8.26001 4.7335 8.26001 5.00684V7.74017C8.26001 7.98017 8.46001 8.3335 8.66668 8.4535L10.7333 9.68684C10.9733 9.82684 11.0467 10.1335 10.9067 10.3735C10.8067 10.5335 10.64 10.6202 10.4733 10.6202Z"
        fill={stroke}
      />
    </Svg>
  </View>
);

export default CloseIcon;
