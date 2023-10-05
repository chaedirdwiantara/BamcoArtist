import * as React from 'react';
import {View} from 'react-native';
import Svg, {
  Defs,
  Path,
  RadialGradient,
  Stop,
  LinearGradient,
} from 'react-native-svg';
import {widthResponsive} from '../../utils';
import {SvgProps} from '../../interface/svg.interface';

function FirefoxBrowserIcon({
  width = widthResponsive(32),
  height = widthResponsive(32),
  fill = '#A2B7DD',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'100%'} height={'100%'} fill={fill} viewBox={'0 0 32 32'}>
        <Path
          d="M30.794 10.712c-.672-1.618-2.036-3.365-3.104-3.917a16.08 16.08 0 011.567 4.697l.003.026c-1.75-4.362-4.717-6.121-7.14-9.951a18.803 18.803 0 01-.365-.593 4.935 4.935 0 01-.17-.32 2.82 2.82 0 01-.232-.612.04.04 0 00-.035-.04.057.057 0 00-.029 0l-.007.004-.012.006.006-.01c-3.887 2.276-5.206 6.49-5.327 8.597a7.741 7.741 0 00-4.259 1.641 4.633 4.633 0 00-.4-.302 7.175 7.175 0 01-.043-3.783 11.461 11.461 0 00-3.725 2.88h-.007c-.613-.778-.57-3.342-.535-3.877a2.773 2.773 0 00-.517.274c-.541.386-1.047.82-1.512 1.296a13.519 13.519 0 00-1.447 1.736v.002-.003a13.073 13.073 0 00-2.076 4.69l-.021.101c-.057.321-.108.644-.152.967 0 .011-.003.022-.004.034-.135.704-.22 1.417-.251 2.133v.08c.01 11.914 12.914 19.348 23.226 13.383a15.477 15.477 0 007.502-10.766c.026-.2.047-.397.07-.6a15.915 15.915 0 00-1.004-7.773zM12.957 22.826c.073.035.14.072.215.105l.01.007a8.43 8.43 0 01-.225-.112zm16.304-11.304v-.015l.003.016-.003-.001z"
          fill="url(#paint0_linear_8318_62617)"
        />
        <Path
          d="M30.794 10.712c-.672-1.618-2.036-3.365-3.104-3.917a16.08 16.08 0 011.567 4.697v.015l.003.016a14.016 14.016 0 01-.482 10.445c-1.774 3.806-6.067 7.707-12.787 7.517-7.261-.206-13.656-5.594-14.852-12.65-.217-1.114 0-1.678.11-2.582-.15.702-.233 1.417-.249 2.135v.08c.01 11.914 12.914 19.348 23.226 13.383a15.477 15.477 0 007.502-10.766c.026-.2.047-.397.07-.599a15.915 15.915 0 00-1.004-7.774z"
          fill="url(#paint1_radial_8318_62617)"
        />
        <Path
          d="M30.794 10.712c-.672-1.618-2.036-3.365-3.104-3.917a16.08 16.08 0 011.567 4.697v.015l.003.016a14.016 14.016 0 01-.482 10.445c-1.774 3.806-6.067 7.707-12.787 7.517-7.261-.206-13.656-5.594-14.852-12.65-.217-1.114 0-1.678.11-2.582-.15.702-.233 1.417-.249 2.135v.08c.01 11.914 12.914 19.348 23.226 13.383a15.477 15.477 0 007.502-10.766c.026-.2.047-.397.07-.599a15.915 15.915 0 00-1.004-7.774z"
          fill="url(#paint2_radial_8318_62617)"
        />
        <Path
          d="M23.274 12.531l.096.07a8.423 8.423 0 00-1.437-1.874c-4.81-4.81-1.26-10.43-.662-10.716l.006-.009c-3.887 2.276-5.206 6.49-5.328 8.597.18-.012.36-.028.544-.028a7.81 7.81 0 016.781 3.96z"
          fill="url(#paint3_radial_8318_62617)"
        />
        <Path
          d="M16.504 13.493c-.026.385-1.386 1.712-1.862 1.712-4.4 0-5.115 2.663-5.115 2.663.195 2.241 1.757 4.088 3.646 5.064.086.045.173.085.26.125.15.066.302.128.455.186a6.88 6.88 0 002.014.389c7.713.361 9.207-9.224 3.641-12.006a5.342 5.342 0 013.731.906 7.81 7.81 0 00-6.78-3.96c-.184 0-.364.015-.544.028a7.742 7.742 0 00-4.26 1.641c.237.2.503.467 1.064 1.02 1.05 1.034 3.743 2.106 3.75 2.232z"
          fill="url(#paint4_radial_8318_62617)"
        />
        <Path
          d="M16.504 13.493c-.026.385-1.386 1.712-1.862 1.712-4.4 0-5.115 2.663-5.115 2.663.195 2.241 1.757 4.088 3.646 5.064.086.045.173.085.26.125.15.066.302.128.455.186a6.88 6.88 0 002.014.389c7.713.361 9.207-9.224 3.641-12.006a5.342 5.342 0 013.731.906 7.81 7.81 0 00-6.78-3.96c-.184 0-.364.015-.544.028a7.742 7.742 0 00-4.26 1.641c.237.2.503.467 1.064 1.02 1.05 1.034 3.743 2.106 3.75 2.232z"
          fill="url(#paint5_radial_8318_62617)"
        />
        <Path
          d="M10.969 9.727c.108.068.214.139.32.212a7.173 7.173 0 01-.044-3.783 11.463 11.463 0 00-3.725 2.88c.075-.003 2.32-.043 3.449.69z"
          fill="url(#paint6_radial_8318_62617)"
        />
        <Path
          d="M1.142 16.834c1.194 7.058 7.59 12.446 14.851 12.651 6.72.19 11.013-3.71 12.787-7.516a14.016 14.016 0 00.482-10.445v-.015c0-.012-.003-.018 0-.015l.003.026c.549 3.585-1.275 7.057-4.125 9.406l-.009.02c-5.553 4.522-10.868 2.728-11.944 1.996a7.732 7.732 0 01-.225-.112c-3.238-1.548-4.575-4.498-4.289-7.028a3.975 3.975 0 01-3.666-2.306 5.837 5.837 0 015.69-.228 7.706 7.706 0 005.81.228c-.005-.126-2.699-1.198-3.749-2.232-.56-.553-.827-.82-1.063-1.02a4.61 4.61 0 00-.4-.302c-.091-.063-.195-.13-.319-.212-1.129-.734-3.374-.694-3.448-.692h-.007c-.613-.777-.57-3.34-.535-3.876a2.76 2.76 0 00-.517.274c-.541.387-1.047.82-1.512 1.296a13.531 13.531 0 00-1.453 1.732v.002-.003a13.073 13.073 0 00-2.076 4.69c-.008.031-.558 2.435-.286 3.681z"
          fill="url(#paint7_radial_8318_62617)"
        />
        <Path
          d="M21.934 10.727a8.43 8.43 0 011.438 1.877c.08.06.157.123.232.19 3.508 3.234 1.67 7.806 1.533 8.132 2.85-2.349 4.672-5.821 4.124-9.406-1.75-4.364-4.718-6.123-7.14-9.953a18.8 18.8 0 01-.365-.593 4.886 4.886 0 01-.17-.32 2.81 2.81 0 01-.232-.612.04.04 0 00-.035-.04.057.057 0 00-.03 0c-.001 0-.004.004-.007.004l-.01.006c-.6.284-4.149 5.904.662 10.715z"
          fill="url(#paint8_radial_8318_62617)"
        />
        <Path
          d="M23.602 12.791a3.249 3.249 0 00-.232-.19l-.096-.07a5.342 5.342 0 00-3.732-.906c5.566 2.783 4.073 12.367-3.64 12.005a6.88 6.88 0 01-2.014-.388 8.076 8.076 0 01-.455-.187c-.088-.04-.175-.08-.261-.124l.01.007c1.076.734 6.39 2.528 11.944-1.997l.01-.02c.138-.323 1.976-4.896-1.534-8.13z"
          fill="url(#paint9_radial_8318_62617)"
        />
        <Path
          d="M9.528 17.867s.714-2.662 5.115-2.662c.476 0 1.837-1.328 1.861-1.712a7.706 7.706 0 01-5.81-.229 5.837 5.837 0 00-5.69.229 3.974 3.974 0 003.666 2.306c-.287 2.53 1.05 5.48 4.289 7.027.072.035.14.072.214.106-1.89-.977-3.45-2.823-3.645-5.065z"
          fill="url(#paint10_radial_8318_62617)"
        />
        <Path
          d="M30.794 10.712c-.672-1.618-2.036-3.365-3.104-3.917a16.08 16.08 0 011.567 4.697l.003.026c-1.75-4.362-4.717-6.121-7.14-9.951a18.803 18.803 0 01-.365-.593 4.935 4.935 0 01-.17-.32 2.82 2.82 0 01-.232-.612.04.04 0 00-.035-.04.057.057 0 00-.029 0l-.007.004-.012.006.006-.01c-3.887 2.276-5.206 6.49-5.327 8.597.18-.013.36-.028.544-.028a7.81 7.81 0 016.78 3.96 5.343 5.343 0 00-3.73-.906c5.566 2.783 4.072 12.367-3.642 12.006a6.883 6.883 0 01-2.014-.389 8.107 8.107 0 01-.454-.186c-.087-.04-.175-.08-.261-.125l.01.007a8.43 8.43 0 01-.225-.112c.073.035.14.072.215.105-1.89-.976-3.45-2.823-3.645-5.064 0 0 .714-2.663 5.115-2.663.475 0 1.837-1.327 1.86-1.712-.005-.126-2.698-1.198-3.749-2.232-.56-.553-.827-.82-1.063-1.02a4.633 4.633 0 00-.4-.302 7.175 7.175 0 01-.043-3.783 11.461 11.461 0 00-3.725 2.88h-.007c-.613-.778-.57-3.342-.535-3.877a2.773 2.773 0 00-.517.274c-.541.386-1.047.82-1.512 1.296a13.519 13.519 0 00-1.447 1.736v.002-.003a13.073 13.073 0 00-2.076 4.69l-.021.101c-.03.136-.16.828-.179.977 0 .01 0-.012 0 0-.119.713-.195 1.434-.228 2.157v.08c.01 11.914 12.914 19.348 23.226 13.383a15.477 15.477 0 007.502-10.766c.026-.2.047-.397.07-.6a15.915 15.915 0 00-1.004-7.773z"
          fill="url(#paint11_linear_8318_62617)"
        />
        <Defs>
          <LinearGradient
            id="paint0_linear_8318_62617"
            x1={28.7457}
            y1={4.9468}
            x2={3.05516}
            y2={29.7333}
            gradientUnits="userSpaceOnUse">
            <Stop offset={0.048} stopColor="#FFF44F" />
            <Stop offset={0.111} stopColor="#FFE847" />
            <Stop offset={0.225} stopColor="#FFC830" />
            <Stop offset={0.368} stopColor="#FF980E" />
            <Stop offset={0.401} stopColor="#FF8B16" />
            <Stop offset={0.462} stopColor="#FF672A" />
            <Stop offset={0.534} stopColor="#FF3647" />
            <Stop offset={0.705} stopColor="#E31587" />
          </LinearGradient>
          <RadialGradient
            id="paint1_radial_8318_62617"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(27.56 3.544) scale(32.2622)">
            <Stop offset={0.129} stopColor="#FFBD4F" />
            <Stop offset={0.186} stopColor="#FFAC31" />
            <Stop offset={0.247} stopColor="#FF9D17" />
            <Stop offset={0.283} stopColor="#FF980E" />
            <Stop offset={0.403} stopColor="#FF563B" />
            <Stop offset={0.467} stopColor="#FF3750" />
            <Stop offset={0.71} stopColor="#F5156C" />
            <Stop offset={0.782} stopColor="#EB0878" />
            <Stop offset={0.86} stopColor="#E50080" />
          </RadialGradient>
          <RadialGradient
            id="paint2_radial_8318_62617"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(15.77 16.734) scale(32.2622)">
            <Stop offset={0.3} stopColor="#960E18" />
            <Stop offset={0.351} stopColor="#B11927" stopOpacity={0.74} />
            <Stop offset={0.435} stopColor="#DB293D" stopOpacity={0.343} />
            <Stop offset={0.497} stopColor="#F5334B" stopOpacity={0.094} />
            <Stop offset={0.53} stopColor="#FF3750" stopOpacity={0} />
          </RadialGradient>
          <RadialGradient
            id="paint3_radial_8318_62617"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(19.66 -3.777) scale(23.3726)">
            <Stop offset={0.132} stopColor="#FFF44F" />
            <Stop offset={0.252} stopColor="#FFDC3E" />
            <Stop offset={0.506} stopColor="#FF9D12" />
            <Stop offset={0.526} stopColor="#FF980E" />
          </RadialGradient>
          <RadialGradient
            id="paint4_radial_8318_62617"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(12.202 25.162) scale(15.3615)">
            <Stop offset={0.353} stopColor="#3A8EE6" />
            <Stop offset={0.472} stopColor="#5C79F0" />
            <Stop offset={0.669} stopColor="#9059FF" />
            <Stop offset={1} stopColor="#C139E6" />
          </RadialGradient>
          <RadialGradient
            id="paint5_radial_8318_62617"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(-13.592 67.893 -66.543) scale(8.14454 9.53522)">
            <Stop offset={0.206} stopColor="#9059FF" stopOpacity={0} />
            <Stop offset={0.278} stopColor="#8C4FF3" stopOpacity={0.064} />
            <Stop offset={0.747} stopColor="#7716A8" stopOpacity={0.45} />
            <Stop offset={0.975} stopColor="#6E008B" stopOpacity={0.6} />
          </RadialGradient>
          <RadialGradient
            id="paint6_radial_8318_62617"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(15.363 2.225) scale(11.051)">
            <Stop stopColor="#FFE226" />
            <Stop offset={0.121} stopColor="#FFDB27" />
            <Stop offset={0.295} stopColor="#FFC82A" />
            <Stop offset={0.502} stopColor="#FFA930" />
            <Stop offset={0.732} stopColor="#FF7E37" />
            <Stop offset={0.792} stopColor="#FF7139" />
          </RadialGradient>
          <RadialGradient
            id="paint7_radial_8318_62617"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(24.05 -4.785) scale(47.1497)">
            <Stop offset={0.113} stopColor="#FFF44F" />
            <Stop offset={0.456} stopColor="#FF980E" />
            <Stop offset={0.622} stopColor="#FF5634" />
            <Stop offset={0.716} stopColor="#FF3647" />
            <Stop offset={0.904} stopColor="#E31587" />
          </RadialGradient>
          <RadialGradient
            id="paint8_radial_8318_62617"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(83.976 11.244 10.075) scale(34.5572 22.6796)">
            <Stop stopColor="#FFF44F" />
            <Stop offset={0.06} stopColor="#FFE847" />
            <Stop offset={0.168} stopColor="#FFC830" />
            <Stop offset={0.304} stopColor="#FF980E" />
            <Stop offset={0.356} stopColor="#FF8B16" />
            <Stop offset={0.455} stopColor="#FF672A" />
            <Stop offset={0.57} stopColor="#FF3647" />
            <Stop offset={0.737} stopColor="#E31587" />
          </RadialGradient>
          <RadialGradient
            id="paint9_radial_8318_62617"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(15.104 6.317) scale(29.4364)">
            <Stop offset={0.137} stopColor="#FFF44F" />
            <Stop offset={0.48} stopColor="#FF980E" />
            <Stop offset={0.592} stopColor="#FF5634" />
            <Stop offset={0.655} stopColor="#FF3647" />
            <Stop offset={0.904} stopColor="#E31587" />
          </RadialGradient>
          <RadialGradient
            id="paint10_radial_8318_62617"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(22.874 8.041) scale(32.2179)">
            <Stop offset={0.094} stopColor="#FFF44F" />
            <Stop offset={0.231} stopColor="#FFE141" />
            <Stop offset={0.509} stopColor="#FFAF1E" />
            <Stop offset={0.626} stopColor="#FF980E" />
          </RadialGradient>
          <LinearGradient
            id="paint11_linear_8318_62617"
            x1={28.437}
            y1={4.81423}
            x2={6.57699}
            y2={26.6739}
            gradientUnits="userSpaceOnUse">
            <Stop offset={0.167} stopColor="#FFF44F" stopOpacity={0.8} />
            <Stop offset={0.266} stopColor="#FFF44F" stopOpacity={0.634} />
            <Stop offset={0.489} stopColor="#FFF44F" stopOpacity={0.217} />
            <Stop offset={0.6} stopColor="#FFF44F" stopOpacity={0} />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
}

export default FirefoxBrowserIcon;
