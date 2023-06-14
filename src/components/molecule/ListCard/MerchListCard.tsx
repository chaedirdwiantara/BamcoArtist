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
import {CoinIcon} from '../../../assets/icon';
import {Gap} from '../../atom';
import {mvs} from 'react-native-size-matters';

interface ListProps extends MerchListType {
  onPressCard?: () => void;
  containerStyles?: ViewStyle;
}

const MerchListCard: React.FC<ListProps> = props => {
  const {title, image, owner, price, containerStyles, type} = props;
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
        <View style={styles.disc}>
          <CoinIcon height={widthResponsive(16)} width={widthResponsive(16)} />
          <Gap width={widthResponsive(4)} />
          <Text style={styles.price}>
            {toCurrency(price, {withFraction: false})}
          </Text>
        </View>
        <View style={styles.disc}>
          <View style={styles.discPercContainer}>
            <Text style={styles.discPerc}>25%</Text>
          </View>
          <Gap width={widthResponsive(4)} />
          <Text style={styles.priceDisc}>
            {toCurrency(price, {withFraction: false})}
          </Text>
        </View>
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
  disc: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  priceDisc: {
    color: Color.Neutral[50],
    fontWeight: '500',
    textDecorationLine: 'line-through',
  },
  discPerc: {
    fontSize: mvs(8),
    fontFamily: 'Inter-Semibold',
    color: '#F94D63',
  },
  discPercContainer: {
    backgroundColor: '#FFB8C6',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  imageContainer: {width: '100%', overflow: 'hidden'},
  image: {
    height: undefined,
    aspectRatio: 1 / 1,
    marginBottom: heightResponsive(10),
  },
});
