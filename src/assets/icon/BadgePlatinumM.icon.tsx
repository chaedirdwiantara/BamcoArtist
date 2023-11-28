import * as React from 'react';
import {View} from 'react-native';
import Svg, {Defs, G, LinearGradient, Mask, Path, Stop} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function BadgePlatinumMIcon({
  width = widthResponsive(120),
  height = widthResponsive(120),
  fill = '#F4D761',
  stroke = '',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 120 120'}>
        <Path
          d="M61.521 119.105a2.997 2.997 0 01-3.042 0l-48-28.235A3 3 0 019 88.284V31.716a3 3 0 011.479-2.586l48-28.235a3 3 0 013.042 0l48 28.235A3 3 0 01111 31.716v56.568a3 3 0 01-1.479 2.586l-48 28.235z"
          fill="url(#paint0_linear_9377_105109)"
        />
        <Path
          d="M104.366 33.344h0L60.658 8.414a2 2 0 00-1.982 0l-43.708 24.93a2 2 0 00-1.009 1.737v49.838a2 2 0 001.01 1.737l43.707 24.93c.614.35 1.368.35 1.982 0l43.708-24.93a2 2 0 001.009-1.737V35.081a2 2 0 00-1.009-1.737z"
          fill="url(#paint1_linear_9377_105109)"
          stroke="url(#paint2_linear_9377_105109)"
          strokeWidth={2}
        />
        <Path
          opacity={0.8}
          d="M77.555 33l2.05-.34a4.35 4.35 0 003.573-3.596L83.516 27l.337 2.064a4.35 4.35 0 003.574 3.596l2.05.34-2.05.34a4.35 4.35 0 00-3.574 3.596L83.516 39l-.338-2.064a4.35 4.35 0 00-3.573-3.596l-2.05-.34zM86.492 86.25l1.282-.212a2.719 2.719 0 002.233-2.248l.21-1.29.212 1.29a2.719 2.719 0 002.233 2.248l1.281.212-1.28.212a2.719 2.719 0 00-2.234 2.248L90.218 90l-.211-1.29a2.719 2.719 0 00-2.233-2.248l-1.282-.212zM29.79 36.237l1.532-.255a3.252 3.252 0 002.671-2.688l.253-1.543.252 1.543a3.252 3.252 0 002.672 2.689l1.533.254-1.533.254a3.252 3.252 0 00-2.672 2.689l-.252 1.543-.253-1.543a3.252 3.252 0 00-2.671-2.69l-1.533-.253zM25 86.5l1.72-.312c1.538-.278 2.743-1.604 2.997-3.296L30 81l.283 1.892c.254 1.692 1.46 3.018 2.997 3.296L35 86.5l-1.72.312c-1.538.278-2.743 1.604-2.997 3.296L30 92l-.283-1.892c-.254-1.692-1.46-3.018-2.997-3.296L25 86.5z"
          fill="#fff"
        />
        <G filter="url(#filter0_f_9377_105109)">
          <Path
            d="M59.577 33.148a.952.952 0 011.692-.014L70.658 51a.952.952 0 00.589.475l18.13 5.009a.952.952 0 01.415 1.593l-12.56 12.434a.951.951 0 00-.266.852L80.54 90.34a.952.952 0 01-1.345 1.035l-18.36-8.783a.952.952 0 00-.845.012L41.606 92.07a.952.952 0 01-1.364-1.054l4.39-19.618a.952.952 0 00-.279-.902L31.105 58.088a.952.952 0 01.402-1.613l18.455-5a.952.952 0 00.6-.488l9.015-17.84z"
            fill="#617E82"
          />
        </G>
        <Mask
          id="a"
          // @ts-ignore
          style={{
            maskType: 'alpha',
          }}
          maskUnits="userSpaceOnUse"
          x={30}
          y={26}
          width={61}
          height={61}>
          <Path
            d="M59.479 26.937a.952.952 0 011.691-.014l9.503 18.082a.952.952 0 00.589.474l18.347 5.07a.952.952 0 01.416 1.593L77.312 64.727a.952.952 0 00-.266.852l3.618 19.207a.952.952 0 01-1.346 1.035l-18.58-8.889a.951.951 0 00-.847.012l-18.607 9.58a.952.952 0 01-1.364-1.053l4.443-19.858a.952.952 0 00-.278-.902l-13.41-12.558a.952.952 0 01.402-1.613l18.678-5.06a.952.952 0 00.6-.489l9.124-18.054z"
            fill="#D9D9D9"
          />
        </Mask>
        <G mask="url(#a)">
          <Path
            d="M93.605 68.79c-3.28 11.473-12.255 20.52-23.646 23.842l-4.899-16.8a16.962 16.962 0 01-4.763.673c-1.677 0-3.27-.238-4.763-.674l-4.9 16.8C39.245 89.31 30.27 80.264 26.99 68.79l16.826-4.812a17.613 17.613 0 01-.674-4.855c0-1.711.239-3.336.674-4.856l-16.826-4.811c3.281-11.474 12.255-20.52 23.646-23.842l4.9 16.8a16.962 16.962 0 014.762-.674c1.678 0 3.27.239 4.763.674l4.9-16.8c11.39 3.322 20.364 12.368 23.645 23.842l-16.826 4.811c.435 1.52.674 3.145.674 4.856 0 1.71-.239 3.335-.674 4.855l16.826 4.812z"
            fill="url(#paint3_linear_9377_105109)"
            stroke="url(#paint4_linear_9377_105109)"
            strokeWidth={35}
            strokeDasharray="19 34"
          />
        </G>
        <Defs>
          <LinearGradient
            id="paint0_linear_9377_105109"
            x1={45.4792}
            y1={123.673}
            x2={45.4792}
            y2={-3.89608}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#67898D" />
            <Stop offset={1} stopColor="#E4F7F9" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_9377_105109"
            x1={59.6672}
            y1={111}
            x2={59.6672}
            y2={8.99999}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#4F787D" />
            <Stop offset={0.460638} stopColor="#9EDBE3" />
            <Stop offset={1} stopColor="#617E82" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_9377_105109"
            x1={59.6672}
            y1={111}
            x2={59.6672}
            y2={4.48671}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#B6EAEF" />
            <Stop offset={1} stopColor="#456E74" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_9377_105109"
            x1={94.9531}
            y1={59.1228}
            x2={25.6411}
            y2={59.1228}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#E8FFFC" />
            <Stop offset={1} stopColor="#C0E5E6" />
          </LinearGradient>
          <LinearGradient
            id="paint4_linear_9377_105109"
            x1={78.4937}
            y1={68.4587}
            x2={31.422}
            y2={52.5855}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#C6E0E4" />
            <Stop offset={1} stopColor="#629AA2" />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default BadgePlatinumMIcon;
