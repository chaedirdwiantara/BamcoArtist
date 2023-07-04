import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

export function NormalCreditCard({
  width = widthPercentage(18),
  height = widthPercentage(18),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={width} height={height} viewBox="0 0 16 16" fill={fill}>
        <Path
          d="M14.6666 6.1665H1.33325C1.05992 6.1665 0.833252 5.93984 0.833252 5.6665C0.833252 5.39317 1.05992 5.1665 1.33325 5.1665H14.6666C14.9399 5.1665 15.1666 5.39317 15.1666 5.6665C15.1666 5.93984 14.9399 6.1665 14.6666 6.1665Z"
          fill={stroke}
        />
        <Path
          d="M5.33333 11.5H4C3.72667 11.5 3.5 11.2733 3.5 11C3.5 10.7267 3.72667 10.5 4 10.5H5.33333C5.60667 10.5 5.83333 10.7267 5.83333 11C5.83333 11.2733 5.60667 11.5 5.33333 11.5Z"
          fill={stroke}
        />
        <Path
          d="M9.66667 11.5H7C6.72667 11.5 6.5 11.2733 6.5 11C6.5 10.7267 6.72667 10.5 7 10.5H9.66667C9.94 10.5 10.1667 10.7267 10.1667 11C10.1667 11.2733 9.94 11.5 9.66667 11.5Z"
          fill={stroke}
        />
        <Path
          d="M11.7066 14.1668H4.29325C1.63992 14.1668 0.833252 13.3668 0.833252 10.7402V5.26016C0.833252 2.6335 1.63992 1.8335 4.29325 1.8335H11.6999C14.3533 1.8335 15.1599 2.6335 15.1599 5.26016V10.7335C15.1666 13.3668 14.3599 14.1668 11.7066 14.1668ZM4.29325 2.8335C2.19992 2.8335 1.83325 3.1935 1.83325 5.26016V10.7335C1.83325 12.8002 2.19992 13.1602 4.29325 13.1602H11.6999C13.7933 13.1602 14.1599 12.8002 14.1599 10.7335V5.26016C14.1599 3.1935 13.7933 2.8335 11.6999 2.8335H4.29325Z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export function PosCreditCard({
  width = widthPercentage(18),
  height = widthPercentage(18),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={width} height={height} viewBox="0 0 16 16" fill={fill}>
        <Path
          d="M2.62016 11.0866C2.49349 11.0866 2.36683 11.0399 2.26683 10.9399C2.07349 10.7466 2.07349 10.4266 2.26683 10.2332L10.2335 2.26658C10.4268 2.07325 10.7468 2.07325 10.9402 2.26658C11.1335 2.45992 11.1335 2.77992 10.9402 2.97325L2.97349 10.9466C2.88016 11.0399 2.74683 11.0866 2.62016 11.0866Z"
          fill={stroke}
        />
        <Path
          d="M7.39995 12.6865C7.27328 12.6865 7.14661 12.6399 7.04661 12.5399C6.85328 12.3465 6.85328 12.0265 7.04661 11.8332L7.84661 11.0332C8.03995 10.8399 8.35994 10.8399 8.55328 11.0332C8.74661 11.2265 8.74661 11.5465 8.55328 11.7399L7.75328 12.5399C7.65994 12.6332 7.53328 12.6865 7.39995 12.6865Z"
          fill={stroke}
        />
        <Path
          d="M9.1934 10.8934C9.06673 10.8934 8.94007 10.8468 8.84007 10.7468C8.64674 10.5534 8.64674 10.2334 8.84007 10.0401L10.4334 8.44676C10.6267 8.25342 10.9467 8.25342 11.1401 8.44676C11.3334 8.64009 11.3334 8.96009 11.1401 9.15342L9.54673 10.7468C9.4534 10.8401 9.32007 10.8934 9.1934 10.8934Z"
          fill={stroke}
        />
        <Path
          d="M7.40002 15.1664C6.74669 15.1664 6.09336 14.7664 5.30002 13.9731L2.02669 10.6998C0.433357 9.10645 0.440024 8.07978 2.04669 6.47311L6.47336 2.04645C8.08002 0.43978 9.10669 0.433113 10.7 2.02645L13.9734 5.29978C15.5667 6.89311 15.56 7.91978 13.9534 9.52645L9.52669 13.9531C8.72002 14.7598 8.06002 15.1664 7.40002 15.1664ZM8.60002 1.83311C8.25336 1.83311 7.81336 2.11978 7.18002 2.75311L2.75336 7.17978C2.12002 7.81311 1.83336 8.25311 1.83336 8.59311C1.83336 8.93978 2.10002 9.35978 2.73336 9.99311L6.00669 13.2664C6.64002 13.8998 7.05336 14.1664 7.40002 14.1664C7.40002 14.1664 7.40002 14.1664 7.40669 14.1664C7.75336 14.1664 8.18669 13.8798 8.82002 13.2464L13.2467 8.81978C13.88 8.18645 14.1667 7.74645 14.1667 7.40645C14.1667 7.05978 13.9 6.63978 13.2667 6.00645L9.99336 2.73311C9.36669 2.09978 8.94669 1.83311 8.60002 1.83311Z"
          fill={stroke}
        />
        <Path
          d="M14.6666 15.1665H1.33325C1.05992 15.1665 0.833252 14.9398 0.833252 14.6665C0.833252 14.3932 1.05992 14.1665 1.33325 14.1665H14.6666C14.9399 14.1665 15.1666 14.3932 15.1666 14.6665C15.1666 14.9398 14.9399 15.1665 14.6666 15.1665Z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}
