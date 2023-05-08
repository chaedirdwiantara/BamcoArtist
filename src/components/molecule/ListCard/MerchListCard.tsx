import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {MerchListType} from '../../../data/merchList';
import {
  heightResponsive,
  normalize,
  toCurrency,
  widthResponsive,
} from '../../../utils';
import Color from '../../../theme/Color';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';

interface ListProps extends MerchListType {
  onPressCard?: () => void;
  containerStyles?: ViewStyle;
}

const MerchListCard: React.FC<ListProps> = props => {
  const {title, image, owner, price, containerStyles, currency, type, charge} =
    props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const onPressCard = (data: MerchListType) => {
    if (type === 'merch') {
      navigation.navigate('MerchDetail', data);
    } else {
      navigation.navigate('ConcertDetail', data);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyles]}
      onPress={() => onPressCard(props)}>
      <View style={styles.imageContainer}>
        <FastImage
          source={{uri: image}}
          style={[
            styles.image,
            {
              width: widthResponsive(155),
              aspectRatio: 1 / 1,
            },
          ]}
        />
      </View>

      <View>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.owner} numberOfLines={1}>
          {owner}
        </Text>
        <Text style={styles.price}>
          {charge === 'no_tickets'
            ? ''
            : charge === 'free_event'
            ? 'Free'
            : currency + ' ' + toCurrency(price / 100, {withFraction: false})}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MerchListCard;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    marginBottom: heightResponsive(16),
  },
  title: {
    color: Color.Neutral[10],
    fontSize: normalize(12),
    fontWeight: '500',
    marginBottom: 4,
    minHeight: heightResponsive(42),
  },
  owner: {
    color: Color.Dark[50],
    fontSize: normalize(10),
    marginBottom: 4,
    fontWeight: '500',
  },
  price: {
    color: Color.Neutral[10],
    fontWeight: '500',
  },
  imageContainer: {width: '100%', overflow: 'hidden'},
  image: {
    height: undefined,
    aspectRatio: 1 / 1,
    marginBottom: heightResponsive(10),
  },
});
