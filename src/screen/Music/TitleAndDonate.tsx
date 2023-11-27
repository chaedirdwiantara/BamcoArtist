import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {color, font} from '../../theme';
import {mvs} from 'react-native-size-matters';

interface TitleAndDonateProps {
  title: string;
  artist: string;
  albumName?: string;
  artistOnPress: () => void;
}

const TitleAndDonate: FC<TitleAndDonateProps> = (
  props: TitleAndDonateProps,
) => {
  const {title, artist, albumName, artistOnPress} = props;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.subTitleContainer}>
          <TouchableOpacity onPress={artistOnPress}>
            <Text style={styles.subTitle} numberOfLines={1}>
              {artist}
            </Text>
          </TouchableOpacity>
          <Text style={styles.subTitle} numberOfLines={1}>
            {albumName && `, ${albumName}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TitleAndDonate;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(20),
    color: color.Neutral[10],
  },
  subTitle: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: mvs(15),
    color: color.Dark[50],
  },
  subTitleContainer: {
    flexDirection: 'row',
  },
  iconStyle: {
    justifyContent: 'center',
  },
});
