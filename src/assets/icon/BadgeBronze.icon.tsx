import * as React from 'react';
import {View} from 'react-native';
import Svg, {Defs, G, LinearGradient, Mask, Path, Stop} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function BadgeBronzeIcon({
  width = widthResponsive(40),
  height = widthResponsive(41),
  fill = '#F4D761',
  stroke = '',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 40 41'}>
        <Path
          d="M21.521 39.605a3 3 0 01-3.042 0l-14-8.235A3 3 0 013 28.784V12.216A3 3 0 014.479 9.63l14-8.235a3 3 0 013.042 0l14 8.235A3 3 0 0137 12.216v16.568a3 3 0 01-1.479 2.586l-14 8.235z"
          fill="url(#paint0_linear_10897_186178)"
        />
        <Path
          d="M5 30.156l13.903 7.93a2 2 0 001.982 0l13.903-7.93a2 2 0 001.009-1.737V12.581a2 2 0 00-1.01-1.737l-13.902-7.93a2 2 0 00-1.982 0l-13.902 7.93a2 2 0 00-1.01 1.737v15.838a2 2 0 001.01 1.737z"
          fill="url(#paint1_linear_10897_186178)"
          stroke="url(#paint2_linear_10897_186178)"
          strokeWidth={2}
        />
        <G opacity={0.3} filter="url(#filter0_f_10897_186178)">
          <Path
            d="M19.444 10.716a.523.523 0 01.89 0l6.835 11.008a.523.523 0 010 .552l-6.836 11.008a.523.523 0 01-.889 0L12.61 22.276a.523.523 0 010-.552l6.835-11.008z"
            fill="#503C13"
          />
        </G>
        <Mask
          id="a"
          // @ts-ignore don't need to fix it
          style={{
            maskType: 'alpha',
          }}
          maskUnits="userSpaceOnUse"
          x={13}
          y={8}
          width={14}
          height={24}>
          <Path
            d="M19.414 9.177a.61.61 0 011.056 0l6.329 10.878a.61.61 0 010 .614l-6.33 10.879a.61.61 0 01-1.055 0l-6.33-10.879a.61.61 0 010-.614l6.33-10.878z"
            fill="#4D884B"
          />
        </Mask>
        <G mask="url(#a)">
          <Path
            fill="#C59F69"
            d="M12.9062 9.01758H26.9775V31.706780000000002H12.9062z"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.942 9.018h-7.036v11.344h7.036V9.018zm7.035 11.344h-7.036v11.345h7.036V20.362z"
            fill="#C7B696"
          />
          <Path fill="#C59F69" d="M12.9062 7.82617H26.9775V32.97087H12.9062z" />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.942 7.826h-7.036v12.572h7.035v12.573h7.036V20.398h-7.035V7.826z"
            fill="url(#paint3_linear_10897_186178)"
          />
        </G>
        <Path
          opacity={0.7}
          d="M25.156 12.464l1.107-.183a2.349 2.349 0 001.93-1.942l.182-1.115.182 1.115c.164.996.94 1.777 1.93 1.942l1.107.183-1.107.184a2.349 2.349 0 00-1.93 1.942l-.182 1.114-.182-1.114a2.349 2.349 0 00-1.93-1.942l-1.107-.184zM11.906 30.159l.681-.113a1.445 1.445 0 001.188-1.195l.112-.686.112.686c.1.613.578 1.094 1.188 1.195l.68.113-.68.113a1.446 1.446 0 00-1.188 1.195l-.112.685-.112-.685a1.446 1.446 0 00-1.188-1.195l-.68-.113zM8.438 15.579l.51-.085c.457-.076.816-.436.891-.896l.084-.514.084.514c.076.46.434.82.89.896l.512.085-.511.085a1.084 1.084 0 00-.89.896l-.085.514-.084-.514a1.084 1.084 0 00-.89-.896l-.511-.085z"
          fill="#fff"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_10897_186178"
            x1={15.1597}
            y1={41.7245}
            x2={15.1597}
            y2={-0.798694}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#4D3811" />
            <Stop offset={1} stopColor="#886F4C" />
          </LinearGradient>
          <LinearGradient
            id="paint1_linear_10897_186178"
            x1={19.8943}
            y1={37.5}
            x2={19.8943}
            y2={3.5}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#533B17" />
            <Stop offset={0.460638} stopColor="#B49561" />
            <Stop offset={1} stopColor="#A1783E" />
          </LinearGradient>
          <LinearGradient
            id="paint2_linear_10897_186178"
            x1={19.8943}
            y1={37.5}
            x2={19.8943}
            y2={1.99557}
            gradientUnits="userSpaceOnUse">
            <Stop stopColor="#C7B696" />
            <Stop offset={1} stopColor="#523C16" />
          </LinearGradient>
          <LinearGradient
            id="paint3_linear_10897_186178"
            x1={19.9417}
            y1={7.82617}
            x2={19.9417}
            y2={32.9708}
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

export default BadgeBronzeIcon;
