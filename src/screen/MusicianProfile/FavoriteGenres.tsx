import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {TheGenre} from '../../interface/musician.interface';
import {widthResponsive} from '../../utils';
import {ms} from 'react-native-size-matters';
import {color, font} from '../../theme';

interface FavoriteGenresProps {
  favGenres: TheGenre[];
}

export const FavoriteGenres: FC<FavoriteGenresProps> = (
  props: FavoriteGenresProps,
) => {
  const {favGenres} = props;
  return (
    <View style={styles.container}>
      {favGenres.map((item, _i) => (
        <View style={styles.badgeContainer}>
          <Text style={styles.textStyle}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: widthResponsive(24),
    flexWrap: 'wrap',
  },
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthResponsive(12),
    paddingVertical: widthResponsive(4),
    backgroundColor: color.Dark[400],
    borderRadius: 2,
    marginRight: widthResponsive(4),
    marginBottom: widthResponsive(4),
  },
  textStyle: {
    fontSize: ms(12),
    fontFamily: font.InterRegular,
    fontWeight: '500',
    color: color.Neutral[10],
  },
});
