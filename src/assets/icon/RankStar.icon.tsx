import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {heightResponsive, normalize, widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';
import {Text} from 'react-native';
import Color from '../../theme/Color';

interface CustomProps extends SvgProps {
  rank: Number;
}

function RankStarIcon({
  width = widthPercentage(16),
  height = widthPercentage(16),
  fill = 'none',
  style,
  rank,
}: CustomProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} viewBox="0 0 16 16" fill="none">
        <Path
          d="M8 0L9.84279 1.12261L12 1.0718L13.0346 2.9654L14.9282 4L14.8774 6.15721L16 8L14.8774 9.84279L14.9282 12L13.0346 13.0346L12 14.9282L9.84279 14.8774L8 16L6.15721 14.8774L4 14.9282L2.9654 13.0346L1.0718 12L1.12261 9.84279L0 8L1.12261 6.15721L1.0718 4L2.9654 2.9654L4 1.0718L6.15721 1.12261L8 0Z"
          fill={fill}
        />
        <Text
          style={{
            fontWeight: '600',
            fontSize: normalize(8),
            width: '100%',
            color: Color.Neutral[10],
            textAlign: 'center',
            paddingTop: heightResponsive(2),
          }}>
          {rank.toString()}
        </Text>
      </Svg>
    </View>
  );
}

export default RankStarIcon;
