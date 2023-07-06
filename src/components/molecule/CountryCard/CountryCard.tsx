import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {Gap} from '../..';
import FastImage from 'react-native-fast-image';

interface CountryCardProps {
  countryId: number | string;
  flagUri: string;
  name: string;
  value: number;
}

const CountryCard: FC<CountryCardProps> = (props: CountryCardProps) => {
  const {countryId, flagUri, name, value} = props;
  return (
    <View style={styles.container}>
      <View style={styles.childOne}>
        <View style={styles.idContainer}>
          <Text style={styles.number}>{countryId}</Text>
        </View>
        <View style={styles.imageContainer}>
          <FastImage style={styles.image} source={{uri: flagUri}} />
        </View>
        <Gap width={6} />
        <Text style={styles.value}>{name}</Text>
      </View>
      <View>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

export default CountryCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: widthResponsive(20),
    height: widthResponsive(15),
  },
  idContainer: {
    width: widthResponsive(15),
  },
  childOne: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: widthResponsive(13),
    color: color.Dark[100],
  },
  value: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: widthResponsive(14),
    color: color.Neutral[10],
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
