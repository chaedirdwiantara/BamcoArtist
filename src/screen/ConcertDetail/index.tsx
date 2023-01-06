import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
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
import {ArrowLeftIcon, DefaultAvatar, ThreeDotsIcon} from '../../assets/icon';
import {
  Avatar,
  Button,
  ButtonGradient,
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
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {ParamsProps} from '../../interface/base.interface';
import {FollowMusicianPropsType} from '../../interface/musician.interface';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import Font from '../../theme/Font';
import {
  heightResponsive,
  normalize,
  toCurrency,
  widthPercentage,
  widthResponsive,
} from '../../utils';
import TopMusician from '../ListCard/TopMusician';

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

export const ConcertDetail: React.FC<MerchDetailProps> = ({
  route,
}: MerchDetailProps) => {
  const data = route.params;
  const {
    dataMusician,
    getListDataMusician,
    setFollowMusician,
    setUnfollowMusician,
  } = useMusicianHook();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [selectedSize, setSelectedSize] = useState<
    SelectSizeType | undefined
  >();
  const [selectedColor, setSelectedColor] = useState<
    SelectColorType | undefined
  >();
  const [quantity, setQuantity] = useState<number>(0);

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
      name: 'VIP',
    },
    {
      id: 2,
      name: 'Platinum',
    },
    {
      id: 3,
      name: 'Festival',
    },
    {
      id: 4,
      name: 'Gold',
    },
    {
      id: 5,
      name: 'Silver',
    },
  ];

  useEffect(() => {
    getListDataMusician({filterBy: 'top'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.root}>
        <TopNavigation.Type4
          title="Ticket Detail"
          maxLengthTitle={20}
          itemStrokeColor={'white'}
          rightIcon={<ThreeDotsIcon fill={Color.Neutral[10]} />}
          rightIconAction={() => null}
          leftIcon={<ArrowLeftIcon />}
          leftIconAction={() => navigation.goBack()}
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
            <View style={styles.owner}>
              <Text style={styles.ownerLabel}>By</Text>
              <View style={{marginHorizontal: 5}}>
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
            <Text style={styles.price}>
              {data?.currency} {toCurrency(data.price, {withFraction: false})}
            </Text>
          </View>
          <SsuDivider />
          <View style={styles.descContainer}>
            <Text style={styles.subtitle}>Description</Text>
            <Text style={styles.desc}>{data.desc ? data.desc : '-'}</Text>
          </View>
          <SsuDivider />
          <View style={styles.descContainer}>
            <View style={styles.attribute}>
              <Text style={styles.subtitle}>Line Up</Text>
              <TopMusician
                dataMusician={dataMusician ? dataMusician : []}
                setFollowMusician={(
                  props?: FollowMusicianPropsType,
                  params?: ParamsProps,
                ) => setFollowMusician(props, params)}
                setUnfollowMusician={(
                  props?: FollowMusicianPropsType,
                  params?: ParamsProps,
                ) => setUnfollowMusician(props, params)}
                emptyState={
                  <View>
                    <Text style={styles.desc}>-</Text>
                  </View>
                }
              />
            </View>
            <View style={styles.attribute}>
              <Text style={styles.subtitle}>Select Class</Text>
              <SelectSize
                selectedSize={selectedSize}
                sizes={sizes}
                onPressSize={size => setSelectedSize(size)}
              />
            </View>
            <View>
              <Text style={styles.subtitle}>Quantity</Text>
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
              label="Buy Now"
              gradientStyles={{width: '100%'}}
              containerStyles={{marginBottom: 8}}
              onPress={() => null}
            />
          </View>
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
    marginBottom: heightResponsive(8),
  },
  descContainer: {
    paddingHorizontal: normalize(24),
    paddingVertical: normalize(20),
  },
  desc: {
    color: 'white',
    fontFamily: Font.InterRegular,
    fontSize: normalize(11),
  },
  owner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ownerLabel: {
    color: 'white',
    fontFamily: Font.InterMedium,
    fontSize: normalize(12),
  },
  price: {
    color: Color.Pink[2],
    fontSize: normalize(20),
    fontFamily: Font.InterBold,
  },
  attribute: {
    marginBottom: heightResponsive(24),
  },
});
