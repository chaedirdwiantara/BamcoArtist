import * as React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path, Mask, G, Ellipse} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function ProfileIcon({
  width = widthPercentage(40),
  height = widthPercentage(40),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 40 40'}>
        <Circle cx={20} cy={20} r={16} fill="#D9D9D9" />
        <Path
          d="M36.667 20c0-9.183-7.484-16.666-16.667-16.666-9.183 0-16.667 7.483-16.667 16.667 0 4.833 2.084 9.183 5.384 12.233 0 .017 0 .017-.017.033.167.167.367.3.533.45.1.084.184.167.284.234.3.25.633.483.95.716.116.084.216.15.333.234.317.216.65.416 1 .6.117.066.25.15.367.216.333.184.683.35 1.05.5.133.067.266.134.4.184.366.15.733.283 1.1.4.133.05.266.1.4.133.4.117.8.217 1.2.317.116.033.233.066.366.083.467.1.934.167 1.417.217.067 0 .133.016.2.033.567.05 1.133.083 1.7.083s1.133-.033 1.683-.083c.067 0 .134-.017.2-.033.484-.05.95-.117 1.417-.217.117-.017.233-.067.367-.083.4-.1.816-.184 1.2-.317.133-.05.266-.1.4-.133.366-.134.75-.25 1.1-.4.133-.05.266-.117.4-.184.35-.15.7-.316 1.05-.5.133-.066.25-.15.366-.216.334-.2.667-.384 1-.6.117-.067.217-.15.334-.234.333-.233.65-.466.95-.716.1-.084.183-.167.283-.234.183-.15.367-.3.533-.45 0-.016 0-.016-.016-.033 3.316-3.05 5.4-7.4 5.4-12.233zm-8.434 8.284c-4.516-3.033-11.916-3.033-16.466 0a8.049 8.049 0 00-1.834 1.667c-2.533-2.567-4.1-6.084-4.1-9.95 0-7.817 6.35-14.167 14.167-14.167s14.167 6.35 14.167 14.167c0 3.866-1.567 7.383-4.1 9.95a7.711 7.711 0 00-1.834-1.667z"
          fill="#fff"
        />
        <Path
          d="M20 11.55c-3.45 0-6.25 2.8-6.25 6.25 0 3.384 2.65 6.134 6.167 6.234H20.217a6.239 6.239 0 006.033-6.233c0-3.45-2.8-6.25-6.25-6.25z"
          fill="#fff"
        />
      </Svg>
    </View>
  );
}

function MusicianIcon({
  width = widthPercentage(44),
  height = widthPercentage(44),
  color = '#222731',
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 200 200'}>
        <Circle cx={100} cy={100} r={100} fill={color} />
        <Mask
          id="a"
          style={{
            maskType: 'alpha',
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={200}
          height={200}>
          <Circle cx={100} cy={100} r={100} fill="#222731" />
        </Mask>
        <G mask="url(#a)" fill="#D9D9D9">
          <Circle cx={99.9378} cy={89.2044} r={34.2044} />
          <Ellipse cx={99.9378} cy={196.44} rx={61.9378} ry={66.56} />
        </G>
      </Svg>
    </View>
  );
}

export const DefaultAvatar = {ProfileIcon, MusicianIcon};
