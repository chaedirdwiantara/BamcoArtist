import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {
  ArrowLeftIcon,
  CoinIcon,
  DefaultAvatar,
  StarIcon,
} from '../../assets/icon';
import {
  Avatar,
  Button,
  ButtonGradient,
  Gap,
  SsuDivider,
  TopNavigation,
} from '../../components';
import QuantityInput from '../../components/molecule/EventDetail/QuantityInput';
import SelectColor, {
  SelectColorType,
} from '../../components/molecule/EventDetail/SelectColor';
import SelectSize, {
  SelectSizeType,
} from '../../components/molecule/EventDetail/SelectSize';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import Font from '../../theme/Font';
import {
  heightPercentage,
  heightResponsive,
  normalize,
  toCurrency,
  widthPercentage,
  widthResponsive,
} from '../../utils';
import {usePlayerStore} from '../../store/player.store';
import {mvs} from 'react-native-size-matters';
import Reviews from './Reviews';

type MerchDetailProps = NativeStackScreenProps<RootStackParams, 'MerchDetail'>;

const renderPagination = (index: number, total: number) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={styles.paginationText}>
        {index + 1}/{total}
      </Text>
    </View>
  );
};

export const MerchDetail: React.FC<MerchDetailProps> = ({
  route,
}: MerchDetailProps) => {
  const {t} = useTranslation();
  const data = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {setWithoutBottomTab, show} = usePlayerStore();
  const [selectedSize, setSelectedSize] = useState<
    SelectSizeType | undefined
  >();
  const [selectedColor, setSelectedColor] = useState<
    SelectColorType | undefined
  >();
  const [selectedVariant, setSelectedVariant] = useState<
    SelectSizeType | undefined
  >();
  const [quantity, setQuantity] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  const handleBackAction = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  const handleQuantity = (type: string) => {
    type === 'increment'
      ? setQuantity(quantity + 1)
      : setQuantity(quantity - 1);
  };

  const handleChangeQuantity = (value: string) => {
    const newValue = value.replace(/[^0-9]/g, '');
    setQuantity(Number(newValue));
  };

  const sizes: SelectSizeType[] = [
    {
      id: 1,
      name: 'S',
    },
    {
      id: 2,
      name: 'M',
    },
    {
      id: 3,
      name: 'L',
    },
    {
      id: 4,
      name: 'XL',
    },
  ];

  const colors: SelectColorType[] = [
    {
      id: 1,
      name: '#6ECCAF',
    },
    {
      id: 2,
      name: '#ADE792',
    },
    {
      id: 3,
      name: '#F3ECB0',
    },
    {
      id: 4,
      name: '#FFC0CB',
    },
  ];

  const variant: SelectSizeType[] = [
    {
      id: 1,
      name: 'Long Sleeves',
    },
    {
      id: 2,
      name: 'Short Sleeves',
    },
  ];

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.root}>
        <TopNavigation.Type1
          title={t('Event.Merch.Detail')}
          maxLengthTitle={20}
          itemStrokeColor={'white'}
          leftIcon={<ArrowLeftIcon />}
          leftIconAction={handleBackAction}
          containerStyles={{paddingHorizontal: widthPercentage(20)}}
        />
        <ScrollView>
          <View style={{height: heightResponsive(400)}}>
            <Swiper
              loop={false}
              renderPagination={renderPagination}
              style={styles.swiperContainer}>
              <View style={styles.slide}>
                <FastImage
                  source={{uri: data.image}}
                  style={[
                    {
                      height: heightResponsive(400),
                    },
                  ]}
                />
              </View>
            </Swiper>
          </View>

          <View style={styles.descContainer}>
            <Text style={styles.title}>{data.title}</Text>

            <View style={styles.disc}>
              <CoinIcon
                height={widthResponsive(24)}
                width={widthResponsive(24)}
              />
              <Gap width={widthResponsive(4)} />
              <Text style={styles.price}>
                {toCurrency(data.price, {withFraction: false})}
              </Text>
            </View>
            <View style={styles.disc}>
              <View style={styles.discPercContainer}>
                <Text style={styles.discPerc}>25%</Text>
              </View>
              <Gap width={widthResponsive(4)} />
              <Text style={styles.priceDisc}>
                {toCurrency(data.price, {withFraction: false})}
              </Text>
            </View>
          </View>
          <SsuDivider />
          <View style={[styles.descContainer, {flexDirection: 'row'}]}>
            <View style={{flexDirection: 'row'}}>
              <StarIcon />
              <Gap width={widthPercentage(4)} />
              <Text style={[styles.subtitle, {marginBottom: 0}]}>4,5</Text>
              <Gap width={widthPercentage(4)} />
              <Text
                style={[
                  styles.subtitle,
                  {marginBottom: 0, fontFamily: 'Inter-Regular'},
                ]}>
                (1,000)
              </Text>
            </View>
            <Gap width={widthPercentage(24)} />
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.subtitle, {marginBottom: 0}]}>
                {t('Event.Merch.Sold')}
              </Text>
              <Gap width={widthPercentage(4)} />
              <Text
                style={[
                  styles.subtitle,
                  {marginBottom: 0, fontFamily: 'Inter-Regular'},
                ]}>
                (1,000)
              </Text>
            </View>
          </View>
          <SsuDivider />
          <View style={styles.descContainer}>
            <View style={styles.owner}>
              <View style={{marginRight: widthPercentage(6)}}>
                {data?.ownerImage ? (
                  <Avatar
                    imgUri={data?.ownerImage}
                    size={widthResponsive(24)}
                  />
                ) : (
                  <DefaultAvatar.ProfileIcon width={widthResponsive(24)} />
                )}
              </View>

              <Text style={styles.ownerLabel}>{data.owner}</Text>
            </View>
            <Text style={styles.subtitle}>{t('Event.Description')}</Text>
            <Text style={styles.desc}>{data.desc ? data.desc : '-'}</Text>
          </View>
          <SsuDivider />
          <Reviews />
          <>
            <View style={[styles.descContainer, {flexDirection: 'row'}]}>
              <Text style={[styles.subtitle, {marginBottom: 0}]}>
                {t('Event.Merch.Condition')} :
              </Text>
              <Gap width={widthPercentage(6)} />
              <Text
                style={[
                  styles.subtitle,
                  {color: Color.Pink.linear, marginBottom: 0},
                ]}>
                New
              </Text>
            </View>
            <SsuDivider />
            <View style={styles.descContainer}>
              <View style={styles.attribute}>
                <Text style={styles.subtitle}>{t('Event.Merch.Size')}</Text>
                <SelectSize
                  selectedSize={selectedSize}
                  sizes={sizes}
                  onPressSize={size => setSelectedSize(size)}
                />
              </View>
              <View style={styles.attribute}>
                <Text style={styles.subtitle}>{t('Event.Merch.Color')}</Text>
                <SelectColor
                  selectedColor={selectedColor}
                  colors={colors}
                  onPressColor={color => setSelectedColor(color)}
                />
              </View>
              <View style={styles.attribute}>
                <Text style={styles.subtitle}>{t('Event.Merch.Variant')}</Text>
                <SelectSize
                  selectedSize={selectedVariant}
                  sizes={variant}
                  onPressSize={size => setSelectedVariant(size)}
                />
              </View>
              <View>
                <Text style={styles.subtitle}>{t('Event.Quantity')}</Text>
                <QuantityInput
                  value={quantity.toString()}
                  onPress={handleQuantity}
                  onChangeQuantity={(value: string) =>
                    handleChangeQuantity(value)
                  }
                />
              </View>
            </View>
            <View style={styles.descContainer}>
              <ButtonGradient
                label={t('Btn.BuyNow')}
                gradientStyles={{width: '100%'}}
                containerStyles={{marginBottom: 8}}
                onPress={() => null}
              />
              <Button
                label={t('Btn.AddToCart')}
                type="border"
                containerStyles={{width: '100%'}}
              />
            </View>
          </>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.Dark[800],
    position: 'relative',
  },
  swiperContainer: {
    position: 'relative',
  },
  slide: {
    position: 'relative',
  },
  paginationStyle: {
    backgroundColor: '#141921B2',
    position: 'absolute',
    bottom: 24,
    left: 24,
    paddingVertical: 2,
    paddingHorizontal: widthResponsive(8),
    borderRadius: 4,
  },
  paginationText: {
    color: 'white',
    fontSize: normalize(12),
  },
  title: {
    color: 'white',
    fontSize: normalize(16),
    marginBottom: 8,
    fontFamily: Font.InterSemiBold,
  },
  subtitle: {
    color: 'white',
    fontFamily: Font.InterMedium,
    fontSize: normalize(12),
    marginBottom: 8,
  },
  descContainer: {
    paddingHorizontal: widthPercentage(24),
    paddingVertical: heightPercentage(16),
  },
  desc: {
    color: 'white',
    fontFamily: Font.InterRegular,
    fontSize: normalize(11),
  },
  owner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightPercentage(14),
  },
  ownerLabel: {
    color: 'white',
    fontFamily: Font.InterMedium,
    fontSize: normalize(12),
  },
  price: {
    color: Color.Neutral[10],
    fontSize: normalize(20),
    fontFamily: Font.InterBold,
  },
  attribute: {
    marginBottom: heightPercentage(24),
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
});
