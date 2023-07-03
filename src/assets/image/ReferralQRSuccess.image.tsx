import * as React from 'react';
import Svg, {
  Path,
  Circle,
  Ellipse,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
  Rect,
  G,
  ClipPath,
} from 'react-native-svg';
import {View} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {SvgProps} from '../../interface/svg.interface';

function ReferralQRSuccessImage({
  width = ms(264),
  height = mvs(281),
  fill = 'none',
  style,
}: SvgProps) {
  return (
    <View style={[{width, height}, style]}>
      <Svg width={'264px'} height={'281px'} fill={fill} viewBox={'0 0 264 281'}>
        <G filter="url(#filter0_b_2621_139900)">
          <Rect
            width="264"
            height="264"
            rx="24.75"
            fill="#617594"
            fill-opacity="0.3"
          />
        </G>
        <Rect
          x="13"
          y="13"
          width="238"
          height="238"
          rx="23"
          fill="white"
          stroke="#00D778"
          stroke-width="2"
        />
        <Path
          d="M56.7996 47.0952C54.2261 47.0952 51.758 48.1175 49.9383 49.9373C48.1185 51.757 47.0962 54.2251 47.0962 56.7986V95.6122H95.6132V47.0952H56.7996ZM83.484 83.483H59.2254V59.2245H83.484V83.483Z"
          fill="#141921"
        />
        <Path
          d="M47.0962 207.202C47.0962 209.775 48.1185 212.243 49.9383 214.063C51.758 215.883 54.2261 216.905 56.7996 216.905H95.6132V168.388H47.0962V207.202ZM59.2254 180.517H83.484V204.776H59.2254V180.517Z"
          fill="#141921"
        />
        <Path
          d="M168.386 216.905H207.199C209.773 216.905 212.241 215.883 214.061 214.063C215.88 212.243 216.903 209.775 216.903 207.202V168.388H168.386V216.905ZM180.515 180.517H204.774V204.776H180.515V180.517Z"
          fill="#141921"
        />
        <Path
          d="M207.199 47.0952H168.386V95.6122H216.903V56.7986C216.903 54.2251 215.88 51.757 214.061 49.9373C212.241 48.1175 209.773 47.0952 207.199 47.0952ZM204.774 83.483H180.515V59.2245H204.774V83.483Z"
          fill="#141921"
        />
        <Path
          d="M144.133 83.4828V71.3535H119.874V95.612H132.003V83.4828H144.133Z"
          fill="#141921"
        />
        <Path
          d="M95.6147 95.6118H107.744V107.741H95.6147V95.6118Z"
          fill="#141921"
        />
        <Path
          d="M107.741 107.742H132V119.871H107.741V107.742Z"
          fill="#141921"
        />
        <Path
          d="M144.129 59.2245V71.3537H156.258V47.0952H107.741V71.3537H119.87V59.2245H144.129Z"
          fill="#141921"
        />
        <Path
          d="M47.0962 107.742H59.2254V132H47.0962V107.742Z"
          fill="#141921"
        />
        <Path
          d="M95.6132 119.871V132H83.484V107.742H71.3547V132H59.2254V144.129H47.0962V156.259H71.3547V144.129H83.484V156.259H95.6132V144.129H107.742V119.871H95.6132Z"
          fill="#141921"
        />
        <Path
          d="M144.13 119.871H156.259V132H168.388V119.871H180.518V107.741H156.259V83.4829H144.13V95.6122H132V107.741H144.13V119.871Z"
          fill="#141921"
        />
        <Path
          d="M132 204.776H107.741V216.905H156.258V204.776H144.129V192.646H132V204.776Z"
          fill="#141921"
        />
        <Path
          d="M156.262 144.129V131.999H144.133V119.87H132.003V131.999H119.874V144.129H132.003V156.258H144.133V144.129H156.262Z"
          fill="#141921"
        />
        <Path
          d="M204.778 144.13H216.908V156.259H204.778V144.13Z"
          fill="#141921"
        />
        <Path
          d="M156.259 144.13H192.647V156.259H156.259V144.13Z"
          fill="#141921"
        />
        <Path
          d="M204.771 107.742H192.641V119.871H180.512V132H192.641V144.129H204.771V132H216.9V119.871H204.771V107.742Z"
          fill="#141921"
        />
        <Path
          d="M144.126 156.258H156.256V192.646H144.126V156.258Z"
          fill="#141921"
        />
        <Path
          d="M107.741 192.647H119.87V180.518H132V168.388H119.87V144.13H107.741V192.647Z"
          fill="#141921"
        />
        <Rect x="78" y="237" width="109" height="44" rx="8" fill="#00D778" />
        <Path
          d="M112.71 254.21C112.617 254.116 112.506 254.042 112.385 253.991C112.263 253.94 112.132 253.914 112 253.914C111.868 253.914 111.737 253.94 111.615 253.991C111.494 254.042 111.383 254.116 111.29 254.21L103.84 261.67L100.71 258.53C100.613 258.437 100.499 258.363 100.375 258.314C100.25 258.265 100.116 258.241 99.9823 258.243C99.8481 258.245 99.7157 258.274 99.5926 258.328C99.4695 258.381 99.3582 258.458 99.2649 258.555C99.1717 258.651 99.0984 258.765 99.0492 258.89C99 259.015 98.9759 259.148 98.9782 259.283C98.9805 259.417 99.0092 259.549 99.0627 259.672C99.1162 259.795 99.1934 259.907 99.2899 260L103.13 263.84C103.223 263.934 103.334 264.008 103.455 264.059C103.577 264.11 103.708 264.136 103.84 264.136C103.972 264.136 104.103 264.11 104.225 264.059C104.346 264.008 104.457 263.934 104.55 263.84L112.71 255.68C112.811 255.586 112.892 255.473 112.948 255.346C113.003 255.22 113.032 255.083 113.032 254.945C113.032 254.807 113.003 254.67 112.948 254.544C112.892 254.417 112.811 254.304 112.71 254.21Z"
          fill="white"
        />
        <Path
          d="M123.604 257.172C123.564 256.8 123.396 256.51 123.101 256.303C122.808 256.095 122.428 255.991 121.959 255.991C121.629 255.991 121.347 256.041 121.111 256.141C120.875 256.24 120.695 256.375 120.57 256.545C120.445 256.716 120.381 256.911 120.378 257.129C120.378 257.311 120.419 257.469 120.501 257.602C120.587 257.736 120.702 257.849 120.847 257.943C120.991 258.034 121.152 258.111 121.328 258.173C121.504 258.236 121.682 258.288 121.861 258.331L122.679 258.536C123.009 258.612 123.325 258.716 123.629 258.847C123.936 258.977 124.21 259.142 124.452 259.341C124.696 259.54 124.889 259.78 125.031 260.061C125.173 260.342 125.244 260.672 125.244 261.05C125.244 261.561 125.114 262.011 124.852 262.401C124.591 262.787 124.213 263.089 123.719 263.308C123.227 263.524 122.632 263.632 121.933 263.632C121.254 263.632 120.665 263.527 120.165 263.317C119.668 263.107 119.278 262.8 118.997 262.396C118.719 261.993 118.568 261.501 118.545 260.922H120.101C120.124 261.226 120.217 261.479 120.382 261.68C120.547 261.882 120.761 262.033 121.026 262.132C121.293 262.232 121.591 262.281 121.92 262.281C122.264 262.281 122.565 262.23 122.824 262.128C123.085 262.023 123.29 261.878 123.438 261.693C123.585 261.506 123.661 261.287 123.663 261.037C123.661 260.81 123.594 260.622 123.463 260.474C123.332 260.324 123.149 260.199 122.913 260.099C122.68 259.997 122.408 259.906 122.095 259.827L121.102 259.571C120.384 259.386 119.815 259.107 119.398 258.732C118.983 258.354 118.776 257.852 118.776 257.227C118.776 256.713 118.915 256.263 119.193 255.876C119.474 255.49 119.857 255.19 120.339 254.977C120.822 254.761 121.369 254.653 121.98 254.653C122.599 254.653 123.142 254.761 123.608 254.977C124.077 255.19 124.445 255.487 124.712 255.868C124.979 256.246 125.116 256.68 125.125 257.172H123.604ZM130.757 260.747V256.955H132.3V263.5H130.804V262.337H130.736C130.588 262.703 130.346 263.003 130.007 263.236C129.672 263.469 129.259 263.585 128.767 263.585C128.338 263.585 127.959 263.49 127.63 263.3C127.303 263.107 127.047 262.827 126.863 262.46C126.678 262.091 126.586 261.645 126.586 261.122V256.955H128.128V260.884C128.128 261.298 128.242 261.628 128.469 261.872C128.696 262.116 128.995 262.239 129.364 262.239C129.591 262.239 129.811 262.183 130.025 262.072C130.238 261.962 130.412 261.797 130.549 261.578C130.688 261.357 130.757 261.08 130.757 260.747ZM136.741 263.628C136.088 263.628 135.527 263.484 135.058 263.197C134.592 262.911 134.233 262.514 133.98 262.009C133.73 261.5 133.605 260.915 133.605 260.253C133.605 259.588 133.733 259.001 133.989 258.493C134.244 257.982 134.605 257.584 135.071 257.3C135.54 257.013 136.094 256.869 136.733 256.869C137.264 256.869 137.734 256.967 138.143 257.163C138.555 257.357 138.884 257.631 139.128 257.986C139.372 258.338 139.511 258.75 139.545 259.222H138.071C138.011 258.906 137.869 258.643 137.645 258.433C137.423 258.22 137.126 258.114 136.754 258.114C136.439 258.114 136.162 258.199 135.923 258.369C135.685 258.537 135.499 258.778 135.365 259.094C135.234 259.409 135.169 259.787 135.169 260.227C135.169 260.673 135.234 261.057 135.365 261.378C135.496 261.696 135.679 261.942 135.915 262.115C136.153 262.286 136.433 262.371 136.754 262.371C136.982 262.371 137.185 262.328 137.364 262.243C137.545 262.155 137.697 262.028 137.82 261.864C137.942 261.699 138.026 261.499 138.071 261.263H139.545C139.509 261.726 139.372 262.136 139.136 262.494C138.901 262.849 138.58 263.128 138.173 263.33C137.767 263.528 137.29 263.628 136.741 263.628ZM143.667 263.628C143.014 263.628 142.453 263.484 141.984 263.197C141.518 262.911 141.159 262.514 140.906 262.009C140.656 261.5 140.531 260.915 140.531 260.253C140.531 259.588 140.659 259.001 140.914 258.493C141.17 257.982 141.531 257.584 141.997 257.3C142.466 257.013 143.02 256.869 143.659 256.869C144.19 256.869 144.66 256.967 145.069 257.163C145.481 257.357 145.809 257.631 146.054 257.986C146.298 258.338 146.437 258.75 146.471 259.222H144.997C144.937 258.906 144.795 258.643 144.571 258.433C144.349 258.22 144.052 258.114 143.68 258.114C143.365 258.114 143.088 258.199 142.849 258.369C142.61 258.537 142.424 258.778 142.291 259.094C142.16 259.409 142.095 259.787 142.095 260.227C142.095 260.673 142.16 261.057 142.291 261.378C142.422 261.696 142.605 261.942 142.841 262.115C143.079 262.286 143.359 262.371 143.68 262.371C143.907 262.371 144.11 262.328 144.289 262.243C144.471 262.155 144.623 262.028 144.745 261.864C144.868 261.699 144.951 261.499 144.997 261.263H146.471C146.434 261.726 146.298 262.136 146.062 262.494C145.826 262.849 145.505 263.128 145.099 263.33C144.693 263.528 144.216 263.628 143.667 263.628ZM150.636 263.628C149.979 263.628 149.413 263.491 148.935 263.219C148.461 262.943 148.096 262.554 147.84 262.051C147.585 261.545 147.457 260.95 147.457 260.266C147.457 259.592 147.585 259.001 147.84 258.493C148.099 257.982 148.46 257.584 148.923 257.3C149.386 257.013 149.93 256.869 150.555 256.869C150.958 256.869 151.339 256.935 151.697 257.065C152.058 257.193 152.376 257.392 152.651 257.662C152.93 257.932 153.148 258.276 153.308 258.693C153.467 259.108 153.546 259.602 153.546 260.176V260.649H148.181V259.609H152.067C152.065 259.314 152.001 259.051 151.876 258.821C151.751 258.588 151.576 258.405 151.352 258.271C151.13 258.138 150.871 258.071 150.576 258.071C150.261 258.071 149.984 258.148 149.745 258.301C149.506 258.452 149.32 258.651 149.187 258.898C149.056 259.142 148.989 259.411 148.987 259.703V260.611C148.987 260.991 149.056 261.318 149.195 261.591C149.335 261.861 149.529 262.068 149.779 262.213C150.029 262.355 150.322 262.426 150.657 262.426C150.881 262.426 151.085 262.395 151.266 262.332C151.448 262.267 151.606 262.172 151.739 262.047C151.873 261.922 151.974 261.767 152.042 261.582L153.482 261.744C153.391 262.125 153.218 262.457 152.962 262.741C152.71 263.023 152.386 263.241 151.991 263.398C151.596 263.551 151.144 263.628 150.636 263.628ZM160.025 258.685L158.618 258.838C158.578 258.696 158.509 258.562 158.409 258.438C158.313 258.312 158.182 258.212 158.017 258.135C157.853 258.058 157.651 258.02 157.412 258.02C157.091 258.02 156.821 258.089 156.603 258.229C156.387 258.368 156.28 258.548 156.283 258.77C156.28 258.96 156.35 259.115 156.492 259.234C156.637 259.354 156.875 259.452 157.208 259.528L158.324 259.767C158.944 259.901 159.404 260.112 159.705 260.402C160.009 260.692 160.162 261.071 160.165 261.54C160.162 261.952 160.042 262.315 159.803 262.631C159.567 262.943 159.239 263.187 158.819 263.364C158.398 263.54 157.915 263.628 157.37 263.628C156.569 263.628 155.924 263.46 155.435 263.125C154.946 262.787 154.655 262.317 154.561 261.714L156.066 261.57C156.134 261.865 156.279 262.088 156.5 262.239C156.722 262.389 157.01 262.464 157.365 262.464C157.732 262.464 158.026 262.389 158.248 262.239C158.472 262.088 158.584 261.902 158.584 261.68C158.584 261.493 158.512 261.338 158.367 261.216C158.225 261.094 158.003 261 157.702 260.935L156.586 260.7C155.958 260.57 155.493 260.349 155.192 260.04C154.891 259.727 154.742 259.332 154.745 258.855C154.742 258.452 154.851 258.102 155.073 257.807C155.297 257.509 155.608 257.278 156.006 257.116C156.407 256.952 156.868 256.869 157.391 256.869C158.158 256.869 158.762 257.033 159.202 257.359C159.645 257.686 159.919 258.128 160.025 258.685ZM166.61 258.685L165.204 258.838C165.164 258.696 165.095 258.562 164.995 258.438C164.899 258.312 164.768 258.212 164.603 258.135C164.439 258.058 164.237 258.02 163.998 258.02C163.677 258.02 163.407 258.089 163.189 258.229C162.973 258.368 162.866 258.548 162.869 258.77C162.866 258.96 162.936 259.115 163.078 259.234C163.223 259.354 163.461 259.452 163.794 259.528L164.91 259.767C165.529 259.901 165.99 260.112 166.291 260.402C166.595 260.692 166.748 261.071 166.751 261.54C166.748 261.952 166.627 262.315 166.389 262.631C166.153 262.943 165.825 263.187 165.404 263.364C164.984 263.54 164.501 263.628 163.956 263.628C163.154 263.628 162.51 263.46 162.021 263.125C161.532 262.787 161.241 262.317 161.147 261.714L162.652 261.57C162.72 261.865 162.865 262.088 163.086 262.239C163.308 262.389 163.596 262.464 163.951 262.464C164.318 262.464 164.612 262.389 164.833 262.239C165.058 262.088 165.17 261.902 165.17 261.68C165.17 261.493 165.098 261.338 164.953 261.216C164.811 261.094 164.589 261 164.288 260.935L163.172 260.7C162.544 260.57 162.079 260.349 161.778 260.04C161.477 259.727 161.328 259.332 161.331 258.855C161.328 258.452 161.437 258.102 161.659 257.807C161.883 257.509 162.194 257.278 162.592 257.116C162.993 256.952 163.454 256.869 163.977 256.869C164.744 256.869 165.348 257.033 165.788 257.359C166.231 257.686 166.505 258.128 166.61 258.685ZM169.911 254.773L169.77 260.935H168.398L168.262 254.773H169.911ZM169.084 263.594C168.826 263.594 168.604 263.503 168.419 263.321C168.238 263.139 168.147 262.918 168.147 262.656C168.147 262.401 168.238 262.182 168.419 262C168.604 261.818 168.826 261.727 169.084 261.727C169.337 261.727 169.556 261.818 169.74 262C169.928 262.182 170.022 262.401 170.022 262.656C170.022 262.83 169.978 262.987 169.89 263.129C169.804 263.271 169.691 263.385 169.549 263.47C169.409 263.553 169.255 263.594 169.084 263.594Z"
          fill="white"
        />
        <Defs>
          {/* <filter
            id="filter0_b_2621_139900"
            x="-10"
            y="-10"
            width="284"
            height="284"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_2621_139900"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_2621_139900"
              result="shape"
            />
          </filter> */}
        </Defs>
      </Svg>
    </View>
  );
}

export default ReferralQRSuccessImage;
