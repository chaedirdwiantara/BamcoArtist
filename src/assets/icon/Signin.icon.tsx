import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function SigninIcon({
  width = widthPercentage(38),
  height = widthPercentage(32),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 38 32'}>
        <Rect width="38" height="32" rx="4" fill="#FF6ED3" />
        <Path
          d="M21.0248 21.6834C20.8664 21.6834 20.7081 21.6251 20.5831 21.5001C20.3414 21.2584 20.3414 20.8584 20.5831 20.6168L25.1998 16.0001L20.5831 11.3834C20.3414 11.1418 20.3414 10.7418 20.5831 10.5001C20.8248 10.2584 21.2248 10.2584 21.4664 10.5001L26.5248 15.5584C26.7664 15.8001 26.7664 16.2001 26.5248 16.4418L21.4664 21.5001C21.3414 21.6251 21.1831 21.6834 21.0248 21.6834Z"
          fill="white"
        />
        <Path
          d="M25.9415 16.625H11.9165C11.5748 16.625 11.2915 16.3417 11.2915 16C11.2915 15.6583 11.5748 15.375 11.9165 15.375H25.9415C26.2832 15.375 26.5665 15.6583 26.5665 16C26.5665 16.3417 26.2832 16.625 25.9415 16.625Z"
          fill="white"
        />
      </Svg>
    </View>
  );
}

export default SigninIcon;
