import * as React from 'react';
import {View} from 'react-native';
import Svg, {Mask, Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

const CommentIcon = ({
  width = 17,
  height = 16,
  fill = 'none',
  stroke = '#657694',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 17 16'}>
      <Mask id="path-1-inside-1_5419_56164" fill="#fff">
        <Path
          fillRule="evenodd"
          d="M3.226 2.476A7.812 7.812 0 018.75.188 7.82 7.82 0 0116.563 8v7.813H8.75A7.813 7.813 0 013.226 2.476z"
          clipRule="evenodd"></Path>
      </Mask>
      <Path
        fill="#657694"
        d="M8.75.188l.001-1.25H8.75v1.25zM3.226 2.475l.884.884-.884-.884zm11.046.002l.884-.884-.884.884zM16.562 8h1.25v-.001L16.563 8zm0 7.813v1.25h1.25v-1.25h-1.25zM3.226 13.524l.884-.884-.884.884zM8.75-1.062a9.063 9.063 0 00-6.408 2.654L4.11 3.36a6.563 6.563 0 014.64-1.922v-2.5zm6.406 2.656A9.071 9.071 0 008.75-1.063l-.002 2.5a6.57 6.57 0 014.639 1.925l1.768-1.768zM17.812 8a9.071 9.071 0 00-2.656-6.405l-1.768 1.768a6.57 6.57 0 011.925 4.64l2.5-.003zm0 7.814V8h-2.5v7.813h2.5zm-9.062 1.25h7.813v-2.5H8.75v2.5zm-6.408-2.655a9.063 9.063 0 006.408 2.655v-2.5c-1.74 0-3.41-.692-4.64-1.923l-1.768 1.768zM-.313 8c0 2.403.955 4.709 2.655 6.408L4.11 12.64A6.563 6.563 0 012.187 8h-2.5zm2.655-6.408A9.063 9.063 0 00-.313 8h2.5c0-1.74.692-3.41 1.923-4.64L2.342 1.592z"
        mask="url(#path-1-inside-1_5419_56164)"></Path>
    </Svg>
  </View>
);

export default CommentIcon;
