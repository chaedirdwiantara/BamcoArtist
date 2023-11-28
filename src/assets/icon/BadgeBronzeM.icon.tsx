import * as React from 'react';
import {View} from 'react-native';
import Svg, {Defs, G, LinearGradient, Mask, Path, Stop} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function BadgeBronzeMIcon({
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
          fill="url(#paint0_linear_9377_105420)"
        />
        <Path
          d="M104.366 33.344h0L60.658 8.414a2 2 0 00-1.982 0l-43.708 24.93a2 2 0 00-1.009 1.737v49.838a2 2 0 001.01 1.737l43.707 24.93c.614.35 1.368.35 1.982 0l43.708-24.93a2 2 0 001.009-1.737V35.081a2 2 0 00-1.009-1.737z"
          fill="url(#paint1_linear_9377_105420)"
          stroke="url(#paint2_linear_9377_105420)"
          strokeWidth={2}
        />
        <G opacity={0.3} filter="url(#filter0_f_9377_105420)">
          <Path
            d="M59.222 29.216a.523.523 0 01.889 0l21.738 35.008a.524.524 0 010 .552L60.11 99.784a.523.523 0 01-.89 0L37.485 64.776a.523.523 0 010-.552l21.738-35.008z"
            fill="#503C13"
          />
        </G>
        <Mask
          id="a"
          // @ts-ignore
          style={{
            maskType: 'alpha',
          }}
          maskUnits="userSpaceOnUse"
          x={38}
          y={23}
          width={43}
          height={73}>
          <Path
            d="M59.298 24.215a.61.61 0 011.055 0l20.401 35.063a.61.61 0 010 .614l-20.4 35.064a.61.61 0 01-1.056 0l-20.4-35.064a.61.61 0 010-.614l20.4-35.063z"
            fill="#4D884B"
          />
        </Mask>
        <G mask="url(#a)">
          <Path
            fill="#C59F69"
            d="M38.7188 25.5508H80.93270000000001V93.6185H38.7188z"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M59.826 25.55H38.719v34.035h21.107V25.55zM80.93 59.586H59.824v34.034h21.107V59.585z"
            fill="#C7B696"
          />
          <Path
            fill="#C59F69"
            d="M38.7188 21.9766H80.93270000000001V97.4107H38.7188z"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M59.826 21.977H38.719v37.717h21.105V97.41h21.107V59.693H59.826V21.977z"
            fill="url(#paint3_linear_9377_105420)"
          />
        </G>
        <Path
          opacity={0.7}
          d="M75.453 35.893l3.321-.551a7.046 7.046 0 005.789-5.826l.547-3.343.547 3.343a7.046 7.046 0 005.788 5.826l3.321.55-3.321.551a7.046 7.046 0 00-5.788 5.826l-.547 3.343-.547-3.343a7.046 7.046 0 00-5.789-5.826l-3.32-.55zM35.719 88.976l2.044-.34a4.336 4.336 0 003.562-3.584l.336-2.058.337 2.058a4.336 4.336 0 003.562 3.585l2.044.339-2.044.339a4.336 4.336 0 00-3.562 3.585l-.337 2.057-.336-2.057a4.336 4.336 0 00-3.562-3.585l-2.044-.34zM25.313 45.237l1.532-.255a3.252 3.252 0 002.672-2.688l.252-1.543.253 1.543a3.252 3.252 0 002.671 2.689l1.533.254-1.533.254a3.252 3.252 0 00-2.671 2.689l-.253 1.543-.252-1.543a3.252 3.252 0 00-2.672-2.69l-1.532-.253z"
          fill="#fff"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_9377_105420"
            x1={45.4792}
            y1={123.673}
            x2={45.4792}
            y2={-3.89608}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#4D3811" />
            <Stop offset={1} stopColor="#886F4C" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_9377_105420"
            x1={59.6672}
            y1={111}
            x2={59.6672}
            y2={8.99999}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#533B17" />
            <Stop offset={0.460638} stopColor="#B49561" />
            <Stop offset={1} stopColor="#A1783E" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_9377_105420"
            x1={59.6672}
            y1={111}
            x2={59.6672}
            y2={4.48671}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#C7B696" />
            <Stop offset={1} stopColor="#523C16" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_9377_105420"
            x1={59.825}
            y1={21.9766}
            x2={59.825}
            y2={97.4104}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#625C4F" />
            <Stop offset={0.0001} stopColor="#7B6E57" />
            <Stop offset={1} stopColor="#A18D67" stopOpacity={0} />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default BadgeBronzeMIcon;
