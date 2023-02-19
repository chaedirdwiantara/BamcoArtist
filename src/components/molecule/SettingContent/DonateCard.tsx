import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Dropdown} from '../DropDown';
import {Avatar, Gap} from '../../atom';
import {color, typography} from '../../../theme';
import {dropDownSubscription} from '../../../data/dropdown';
import {heightPercentage, widthPercentage} from '../../../utils';

interface DonateCardProps {
  avatarUri: string;
  name: string;
  username: string;
  detail: string[];
  onPressMore: (value: any) => void;
}

export const DonateCardContent: React.FC<DonateCardProps> = ({
  name,
  username,
  detail,
  avatarUri = 'https://wallpaperspeed.id/wp-content/uploads/2021/09/dragon-ball-z-wallpaper-goku-super-saiyan-god-source-moddroid.com_.webp',
  onPressMore,
}) => {
  const detailTitle = ['Status', 'Next Payment', 'Price', 'Duration'];

  return (
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
        <Dropdown.More
          data={dropDownSubscription}
          selectedMenu={onPressMore}
          containerStyle={styles.dropdown}
          translation={true}
        />
      </View>

      <View style={styles.containerDetail}>
        {Array.from(Array(4).keys()).map((item, index) => {
          return (
            <Text key={index}>
              <Text style={[typography.Caption, {color: color.Dark[50]}]}>
                {detailTitle[index]}
              </Text>
              <Gap width={widthPercentage(6)} />
              <Text style={[typography.Caption, {color: color.Neutral[10]}]}>
                {detail[index]}
              </Text>
            </Text>
          );
        })}
      </View>
    </View>
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
