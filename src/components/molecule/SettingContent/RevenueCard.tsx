import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Avatar, Gap, SsuDivider} from '../../atom';
import {color, typography} from '../../../theme';
import {
  heightPercentage,
  heightResponsive,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import Color from '../../../theme/Color';

interface RevenueProps {
  avatarUri: string;
  name: string;
  username: string;
  credit: number | string;
  time: string;
}

export const RevenueCard: React.FC<RevenueProps> = ({
  name,
  username,
  avatarUri = 'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
  credit,
  time,
}) => {
  return (
    <>
      <View style={{marginTop: heightResponsive(15)}}>
        <View style={styles.root}>
          <View style={styles.header}>
            <Avatar size={widthResponsive(32)} imgUri={avatarUri} />
            <View style={{marginLeft: widthResponsive(10)}}>
              <Text style={[typography.Subtitle1, {color: color.Neutral[10]}]}>
                {name}
              </Text>
              <Text style={[typography.Caption, {color: color.Pink[2]}]}>
                @{username}
              </Text>
            </View>
          </View>
          <Gap width={widthResponsive(10)} />
          <Text style={[typography.Subtitle1, {color: color.Pink[2]}]}>
            +{credit} Credit
          </Text>
        </View>
        <Text
          style={[
            typography.Caption,
            {
              marginLeft: widthResponsive(40),
              marginTop: heightResponsive(6),
              color: Color.Dark[50],
            },
          ]}>
          {time}
        </Text>
      </View>
      <Gap height={heightResponsive(12)} />
      <SsuDivider />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    width: widthPercentage(123),
    marginLeft: widthPercentage(-113),
    marginTop: heightPercentage(-8),
  },
  containerDetail: {
    marginLeft: widthPercentage(42),
    marginTop: heightPercentage(10),
  },
  credit: {
    color: Color.Pink.linear,
  },
});
