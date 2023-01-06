import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {color, font} from '../../theme';
import {CoinCIcon} from '../../assets/icon';
import {mvs} from 'react-native-size-matters';

interface TitleAndDonateProps {
  title: string;
  artist: string;
  albumName?: string;
  coinOnPress: () => void;
}

const TitleAndDonate: FC<TitleAndDonateProps> = (
  props: TitleAndDonateProps,
) => {
  const {title, artist, albumName, coinOnPress} = props;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subTitle} numberOfLines={1}>
          {artist}
          {albumName && `, ${albumName}`}
        </Text>
      </View>
      <View style={styles.iconStyle}>
        <TouchableOpacity onPress={coinOnPress}>
          <CoinCIcon />
        </TouchableOpacity>
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
  iconStyle: {
    justifyContent: 'center',
  },
});
