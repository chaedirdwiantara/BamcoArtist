import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {widthPercentage} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function QRCodeIcon({
  width = widthPercentage(24),
  height = widthPercentage(24),
  fill = 'none',
  stroke = '#fff',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 24 24'}>
        <Path
          d="M3.73268 2.6665C3.44978 2.6665 3.17847 2.77888 2.97844 2.97892C2.7784 3.17896 2.66602 3.45027 2.66602 3.73317V7.99984H7.99935V2.6665H3.73268ZM6.66602 6.6665H3.99935V3.99984H6.66602V6.6665Z"
          fill={stroke}
        />
        <Path
          d="M2.66602 20.2667C2.66602 20.5496 2.7784 20.8209 2.97844 21.0209C3.17847 21.221 3.44978 21.3333 3.73268 21.3333H7.99935V16H2.66602V20.2667ZM3.99935 17.3333H6.66602V20H3.99935V17.3333Z"
          fill={stroke}
        />
        <Path
          d="M16 21.3333H20.2667C20.5496 21.3333 20.8209 21.221 21.0209 21.0209C21.221 20.8209 21.3333 20.5496 21.3333 20.2667V16H16V21.3333ZM17.3333 17.3333H20V20H17.3333V17.3333Z"
          fill={stroke}
        />
        <Path
          d="M20.2667 2.6665H16V7.99984H21.3333V3.73317C21.3333 3.45027 21.221 3.17896 21.0209 2.97892C20.8209 2.77888 20.5496 2.6665 20.2667 2.6665ZM20 6.6665H17.3333V3.99984H20V6.6665Z"
          fill={stroke}
        />
        <Path
          d="M13.3327 6.66683V5.3335H10.666V8.00016H11.9993V6.66683H13.3327Z"
          fill={stroke}
        />
        <Path d="M8 8H9.33333V9.33333H8V8Z" fill={stroke} />
        <Path
          d="M9.33398 9.3335H12.0007V10.6668H9.33398V9.3335Z"
          fill={stroke}
        />
        <Path
          d="M13.334 3.99984V5.33317H14.6673V2.6665H9.33398V5.33317H10.6673V3.99984H13.334Z"
          fill={stroke}
        />
        <Path
          d="M2.66602 9.3335H3.99935V12.0002H2.66602V9.3335Z"
          fill={stroke}
        />
        <Path
          d="M7.99935 10.6668V12.0002H6.66602V9.3335H5.33268V12.0002H3.99935V13.3335H2.66602V14.6668H5.33268V13.3335H6.66602V14.6668H7.99935V13.3335H9.33268V10.6668H7.99935Z"
          fill={stroke}
        />
        <Path
          d="M13.3333 10.6665H14.6667V11.9998H16V10.6665H17.3333V9.33317H14.6667V6.6665H13.3333V7.99984H12V9.33317H13.3333V10.6665Z"
          fill={stroke}
        />
        <Path
          d="M12.0007 19.9998H9.33398V21.3332H14.6673V19.9998H13.334V18.6665H12.0007V19.9998Z"
          fill={stroke}
        />
        <Path
          d="M14.666 13.3332V11.9998H13.3327V10.6665H11.9993V11.9998H10.666V13.3332H11.9993V14.6665H13.3327V13.3332H14.666Z"
          fill={stroke}
        />
        <Path d="M20 13.3335H21.3333V14.6668H20V13.3335Z" fill={stroke} />
        <Path
          d="M14.666 13.3335H18.666V14.6668H14.666V13.3335Z"
          fill={stroke}
        />
        <Path
          d="M20.0007 9.3335H18.6673V10.6668H17.334V12.0002H18.6673V13.3335H20.0007V12.0002H21.334V10.6668H20.0007V9.3335Z"
          fill={stroke}
        />
        <Path
          d="M13.334 14.6665H14.6673V18.6665H13.334V14.6665Z"
          fill={stroke}
        />
        <Path
          d="M9.33398 18.6668H10.6673V17.3335H12.0007V16.0002H10.6673V13.3335H9.33398V18.6668Z"
          fill={stroke}
        />
      </Svg>
    </View>
  );
}

export default QRCodeIcon;
