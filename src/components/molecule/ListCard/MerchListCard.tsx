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
  heightPercentage,
  heightResponsive,
  normalize,
  toCurrency,
  widthPercentage,
  widthResponsive,
} from '../../../utils';
import Color from '../../../theme/Color';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {CoinIcon, StarIcon} from '../../../assets/icon';
import {Gap} from '../../atom';
import {mvs} from 'react-native-size-matters';
import Font from '../../../theme/Font';
import {useTranslation} from 'react-i18next';

interface ListProps extends MerchListType {
  onPressCard?: () => void;
  containerStyles?: ViewStyle;
}

const MerchListCard: React.FC<ListProps> = props => {
  const {t} = useTranslation();
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
        {owner && (
          <Text style={styles.owner} numberOfLines={1}>
            {owner}
          </Text>
        )}

        <Gap height={heightPercentage(5)} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.disc}>
            <Text style={styles.price}>
              {toCurrency(price, {withFraction: false})}
            </Text>
            <Gap width={widthResponsive(4)} />
            <Text style={styles.price}>HKD</Text>
          </View>
          <View style={styles.tabSpacer} />
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
        <Gap height={heightPercentage(7)} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.disc}>
            <StarIcon
              width={widthPercentage(14)}
              height={heightPercentage(14)}
            />
            <Gap width={widthPercentage(4)} />
            <Text style={[styles.subtitle, {marginBottom: 0}]}>4,5 (1K)</Text>
            <Gap width={widthPercentage(4)} />
          </View>

          {/* Hide Sold */}
          {/* <View style={styles.tabSpacer} />
           <View style={styles.disc}>
            <Text style={[styles.subtitle, {marginBottom: 0}]}>
              {t('Event.Merch.Sold')}
            </Text>
            <Gap width={widthPercentage(4)} />
            <Text
              style={[
                styles.subtitle,
                {marginBottom: 0, fontFamily: 'Inter-Regular'},
              ]}>
              1,000
            </Text>
          </View> */}
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
    marginBottom: heightPercentage(4),
    // minHeight: heightResponsive(42),
  },
  owner: {
    color: Color.Pink.linear,
    fontSize: normalize(12),
    marginBottom: heightPercentage(4),
    fontWeight: '500',
  },
  price: {
    fontSize: mvs(12),
    color: Color.Neutral[10],
    fontWeight: '500',
  },
  disc: {flexDirection: 'row', alignItems: 'center'},
  priceDisc: {
    color: Color.Neutral[50],
    fontWeight: '500',
    textDecorationLine: 'line-through',
    fontSize: mvs(8),
  },
  discPerc: {
    fontSize: mvs(6),
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
  subtitle: {
    color: 'white',
    fontFamily: Font.InterMedium,
    fontSize: mvs(10),
    marginBottom: 8,
  },
  tabSpacer: {
    borderWidth: 1,
    borderColor: Color.Dark[300],
    marginHorizontal: widthPercentage(5),
    height: '100%',
  },
});
