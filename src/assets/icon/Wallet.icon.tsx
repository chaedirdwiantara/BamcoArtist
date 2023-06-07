import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {SvgProps} from '../../interface/svg.interface';
import {ms} from 'react-native-size-matters';

const WeiboIcon = ({
  width = ms(16),
  height = ms(16),
  fill = 'none',
  stroke = '#FF69D2',
  style,
}: SvgProps) => (
  <View style={[{width, height}, style]}>
    <Svg width="100%" height="100%" viewBox="0 0 16 16" fill={fill}>
      <Path
        d="M11.8267 15.1665H4.17341C2.51341 15.1665 1.16675 13.8198 1.16675 12.1598V7.67318C1.16675 6.01318 2.51341 4.6665 4.17341 4.6665H11.8267C13.4867 4.6665 14.8334 6.01318 14.8334 7.67318V8.63318C14.8334 8.90651 14.6067 9.13318 14.3334 9.13318H12.9867C12.7534 9.13318 12.5401 9.21984 12.3867 9.37984L12.3801 9.38652C12.1934 9.56652 12.1067 9.81315 12.1267 10.0665C12.1667 10.5065 12.5867 10.8598 13.0667 10.8598H14.3334C14.6067 10.8598 14.8334 11.0865 14.8334 11.3598V12.1532C14.8334 13.8198 13.4867 15.1665 11.8267 15.1665ZM4.17341 5.6665C3.06675 5.6665 2.16675 6.56651 2.16675 7.67318V12.1598C2.16675 13.2665 3.06675 14.1665 4.17341 14.1665H11.8267C12.9334 14.1665 13.8334 13.2665 13.8334 12.1598V11.8665H13.0667C12.0601 11.8665 11.2067 11.1198 11.1267 10.1598C11.0734 9.61316 11.2734 9.07318 11.6734 8.67985C12.0201 8.32652 12.4867 8.13318 12.9867 8.13318H13.8334V7.67318C13.8334 6.56651 12.9334 5.6665 11.8267 5.6665H4.17341V5.6665Z"
        fill={stroke}
      />
      <Path
        d="M1.66675 8.7735C1.39341 8.7735 1.16675 8.54683 1.16675 8.2735V5.22687C1.16675 4.23354 1.79341 3.3335 2.72008 2.98017L8.01342 0.980166C8.56008 0.7735 9.16675 0.846865 9.64008 1.1802C10.1201 1.51353 10.4001 2.05353 10.4001 2.63353V5.16685C10.4001 5.44019 10.1734 5.66685 9.90008 5.66685C9.62675 5.66685 9.40008 5.44019 9.40008 5.16685V2.63353C9.40008 2.38019 9.28008 2.14685 9.06675 2.00019C8.85342 1.85352 8.60008 1.82018 8.36008 1.91352L3.06675 3.91352C2.52675 4.12018 2.16008 4.64687 2.16008 5.22687V8.2735C2.16675 8.5535 1.94008 8.7735 1.66675 8.7735Z"
        fill={stroke}
      />
      <Path
        d="M13.0666 11.8666C12.06 11.8666 11.2066 11.12 11.1266 10.16C11.0733 9.60662 11.2733 9.06663 11.6733 8.6733C12.0133 8.32663 12.48 8.1333 12.98 8.1333H14.3666C15.0266 8.1533 15.5333 8.67327 15.5333 9.31327V10.6866C15.5333 11.3266 15.0266 11.8466 14.3866 11.8666H13.0666ZM14.3533 9.1333H12.9866C12.7533 9.1333 12.54 9.21996 12.3866 9.37996C12.1933 9.56663 12.1 9.81995 12.1266 10.0733C12.1666 10.5133 12.5866 10.8666 13.0666 10.8666H14.3733C14.46 10.8666 14.54 10.7866 14.54 10.6866V9.31327C14.54 9.21327 14.46 9.13997 14.3533 9.1333Z"
        fill={stroke}
      />
      <Path
        d="M9.33341 8.5H4.66675C4.39341 8.5 4.16675 8.27333 4.16675 8C4.16675 7.72667 4.39341 7.5 4.66675 7.5H9.33341C9.60675 7.5 9.83341 7.72667 9.83341 8C9.83341 8.27333 9.60675 8.5 9.33341 8.5Z"
        fill={stroke}
      />
    </Svg>
  </View>
);

export default WeiboIcon;
