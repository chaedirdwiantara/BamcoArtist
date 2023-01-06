import * as React from 'react';
import {View} from 'react-native';
import Svg, {G, Path, Rect, Defs, ClipPath} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function ContentPhoneImage({
  width = widthResponsive(100),
  height = widthResponsive(100),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 100 100'}>
        <G clipPath="url(#clip0_3515_164653)">
          <Path
            d="M66.419 15.341H42.685c-3.932 0-7.644 3.144-8.291 7.023l-9.372 56.184c-.647 3.878 2.017 7.022 5.949 7.022h23.733c3.932 0 7.645-3.144 8.291-7.022l9.372-56.184c.647-3.879-2.016-7.023-5.948-7.023z"
            fill="#FF77D6"
            stroke="#fff"
            strokeWidth={0.787383}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M42.685 15.341h3.56c.315 0 .597.123.782.343.186.22.262.517.21.828-.104.62.047 1.216.419 1.655.372.439.934.685 1.564.685h9.493c.63 0 1.274-.246 1.793-.685.518-.44.867-1.035.97-1.655.053-.31.227-.609.486-.828.26-.22.582-.343.897-.343h3.56"
            stroke="#fff"
            strokeWidth={0.787383}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Rect
            x={0.127725}
            y={0.154641}
            width={36.0334}
            height={12.2123}
            rx={1.10234}
            transform="matrix(1 0 -.18892 .982 43.277 28.662)"
            fill="#fff"
            stroke="#FF77D6"
            strokeWidth={0.314953}
          />
          <Path
            d="M45.3 31.734H76.36M44.708 34.81h18.835M44.116 37.886h9.913M55.682 37.886h8.26M65.265 37.886h9.913M64.865 34.81H75.77"
            stroke="#FF77D6"
            strokeWidth={0.314953}
            strokeLinecap="round"
          />
          <Rect
            x={0.127725}
            y={0.154641}
            width={28.5751}
            height={12.2123}
            rx={1.10234}
            transform="matrix(1 0 -.18892 .982 24.878 45.495)"
            fill="#fff"
            stroke="#FF77D6"
            strokeWidth={0.314953}
          />
          <Path
            d="M26.358 48.568h24.688M25.767 51.643h14.97M25.175 54.719h7.879M34.367 54.719h6.566M41.983 54.719h7.88M41.787 51.643h8.667"
            stroke="#FF77D6"
            strokeWidth={0.314953}
            strokeLinecap="round"
          />
          <Rect
            x={0.127725}
            y={0.154641}
            width={28.5751}
            height={12.2123}
            rx={1.10234}
            transform="matrix(1 0 -.18892 .982 44.06 62.329)"
            fill="#fff"
            stroke="#FF77D6"
            strokeWidth={0.314953}
          />
          <Path
            d="M45.541 65.401h24.688M44.95 68.476h14.97M44.357 71.552h7.88M53.55 71.552h6.566M61.166 71.552h7.88M60.97 68.476h8.667"
            stroke="#FF77D6"
            strokeWidth={0.314953}
            strokeLinecap="round"
          />
          <G clipPath="url(#clip1_3515_164653)">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M26.713 20.32c.29-.103.592-.103.852 0l4.026 1.577c.22.086.398.24.51.441.112.201.154.44.12.685l-.457 3.224a6.12 6.12 0 01-1.218 2.844 6.68 6.68 0 01-2.486 1.994l-2.179 1.008c-.135.062-.279.095-.42.095a.836.836 0 01-.394-.095l-1.894-1.008a4.432 4.432 0 01-1.922-1.995c-.412-.855-.556-1.84-.414-2.844l.456-3.222a1.37 1.37 0 01.313-.686c.17-.2.39-.355.634-.44l4.473-1.579zm.223 5.732c.25-.133.46-.337.596-.581.137-.245.193-.516.16-.771a1.004 1.004 0 00-.342-.643 1.077 1.077 0 00-.704-.248c-.268 0-.54.087-.774.248-.235.161-.42.387-.525.643a1.193 1.193 0 00-.058.77c.068.245.22.45.432.582l-.277 1.964c-.023.16.02.312.117.425a.528.528 0 00.405.176.7.7 0 00.454-.176.701.701 0 00.238-.425l.277-1.964z"
              fill="#88FFB8"
            />
          </G>
        </G>
        <Defs>
          <ClipPath id="clip0_3515_164653">
            <Path fill="#fff" d="M0 0H100V100H0z" />
          </ClipPath>
          <ClipPath id="clip1_3515_164653">
            <Path
              fill="#fff"
              transform="matrix(1 0 -.14004 .99015 20.041 19)"
              d="M0 0H14.5693V14.5693H0z"
            />
          </ClipPath>
        </Defs>
      </Svg>
    </View>
  );
}

export default ContentPhoneImage;
