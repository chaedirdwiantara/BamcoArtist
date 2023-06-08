import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Avatar, Gap, SsuDivider} from '../../atom';
import {color, typography} from '../../../theme';
import {dropDownSubscription, dropDownTipping} from '../../../data/dropdown';
import {heightPercentage, widthPercentage} from '../../../utils';
import DropdownMore from '../V2/DropdownFilter/DropdownMore';

interface DonateCardProps {
  avatarUri: string;
  name: string;
  username: string;
  detail: string[];
  onPressMore: (value: any) => void;
  type: string;
  next: boolean;
}

export const DonateCardContent: React.FC<DonateCardProps> = ({
  name,
  username,
  detail,
  avatarUri = 'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
  onPressMore,
  type,
  next,
}) => {
  const detailTitle = [
    'Status',
    next ? 'Next Payment' : 'Ended In',
    'Price',
    'Duration',
  ];

  return (
    <>
      <View style={{marginTop: heightPercentage(15)}}>
        <View style={styles.root}>
          <View style={styles.header}>
            <Avatar size={widthPercentage(32)} imgUri={avatarUri} />
            <View style={{marginLeft: widthPercentage(10)}}>
              <Text style={[typography.Subtitle1, {color: color.Neutral[10]}]}>
                {name}
              </Text>
              <Text style={[typography.Caption, {color: color.Pink[2]}]}>
                {username}
              </Text>
            </View>
          </View>
          <DropdownMore
            dataFilter={
              type === 'subs'
                ? next
                  ? dropDownSubscription
                  : dropDownSubscription.slice(1)
                : next
                ? dropDownTipping
                : dropDownTipping.slice(1)
            }
            selectedMenu={onPressMore}
          />
        </View>

        <View style={styles.containerDetail}>
          {Array.from(Array(4).keys()).map((item, index) => {
            return (
              <Text key={index}>
                <Text
                  style={[
                    typography.Caption,
                    {color: color.Dark[50], textTransform: 'capitalize'},
                  ]}>
                  {detailTitle[index]}
                </Text>
                <Gap width={widthPercentage(6)} />
                <Text
                  style={[
                    typography.Caption,
                    {color: color.Neutral[10], textTransform: 'capitalize'},
                  ]}>
                  {detail[index]}
                </Text>
              </Text>
            );
          })}
        </View>
      </View>
      <Gap height={heightPercentage(12)} />
      <SsuDivider />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
