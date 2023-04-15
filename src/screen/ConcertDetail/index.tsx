import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {ArrowLeftIcon, CoinIcon, DefaultAvatar} from '../../assets/icon';
import {
  Avatar,
  ButtonGradient,
  Gap,
  SsuDivider,
  TopNavigation,
} from '../../components';
import QuantityInput from '../../components/molecule/EventDetail/QuantityInput';
import {SelectColorType} from '../../components/molecule/EventDetail/SelectColor';
import SelectSize, {
  SelectSizeType,
} from '../../components/molecule/EventDetail/SelectSize';
import {useMusicianHook} from '../../hooks/use-musician.hook';
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
import TopMusician from '../ListCard/TopMusician';
import {usePlayerStore} from '../../store/player.store';
import {mvs} from 'react-native-size-matters';
import Typography from '../../theme/Typography';
import LineUp from '../../components/molecule/EventDetail/LineUp';
import SelectDate from '../../components/molecule/EventDetail/SelectDate';
import TicketCategory, {
  TicketCategoryType,
} from '../../components/molecule/EventDetail/TicketCategory';

type MerchDetailProps = NativeStackScreenProps<
  RootStackParams,
  'ConcertDetail'
>;

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
  const {t} = useTranslation();
  const data = route.params;
  const {getListDataMusician} = useMusicianHook();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {setWithoutBottomTab, show} = usePlayerStore();
  const [selectedDate, setSelectedDate] = useState<
    SelectSizeType | undefined
  >();
  const [selectedTicket, setSelectedTicket] = useState<
    TicketCategoryType | undefined
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

  const dates: SelectSizeType[] = [
    {
      id: 1,
      name: '3 March',
    },
    {
      id: 2,
      name: '4 March',
    },
    {
      id: 3,
      name: '5 March',
    },
    {
      id: 4,
      name: '6 March',
    },
    {
      id: 5,
      name: '7 March',
    },
  ];

  const tickets: TicketCategoryType[] = [
    {
      id: 1,
      title: 'Festival (Standing)',
      desc: 'Price already included tax and admin fee (20%)',
      price: '2,500',
      qty: 0,
    },
    {
      id: 2,
      title: 'Tribune Silver (Seated Row 3)',
      desc: 'Price already included tax and admin fee (20%)',
      price: '3,000',
      qty: 2,
    },
    {
      id: 3,
      title: 'Tribune Gold  (Seated Row 2)',
      desc: 'Price already included tax and admin fee (20%)',
      price: '3,500',
      qty: 4,
    },
    {
      id: 4,
      title: 'Tribune Platinum  (Seated Row 1)',
      desc: 'Price already included tax and admin fee (20%)',
      price: '4.000',
      qty: 2,
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
        <TopNavigation.Type1
          title={t('Event.Concert.Detail')}
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
            <Text style={styles.title2}>Jakarta Velodrome</Text>

            <View style={styles.owner}>
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
          <View style={styles.descContainer}>
            {/* Description */}
            <Text style={styles.subtitle}>{t('Event.Description')}</Text>
            <View style={styles.row}>
              <Text style={[styles.desc, styles.descLeft]}>
                {t('Event.Concert.Date')}
              </Text>
              <Text style={[styles.desc, styles.descRight]}>3 March 2023</Text>
            </View>
            <Gap height={heightPercentage(6)} />
            <View style={styles.row}>
              <Text style={[styles.desc, styles.descLeft]}>
                {t('Event.Concert.Time')}
              </Text>
              <Text style={[styles.desc, styles.descRight]}>02 PM - 03 PM</Text>
            </View>
            <Gap height={heightPercentage(6)} />
            <View style={styles.row}>
              <Text style={[styles.desc, styles.descLeft]}>
                {t('Event.Concert.Venue')}
              </Text>
              <Text style={[styles.desc, styles.descRight]}>
                Jakarta Velodrome
              </Text>
            </View>
            <Gap height={heightPercentage(6)} />
            <View style={styles.row}>
              <Text style={[styles.desc, styles.descLeft]}>
                {t('Event.Concert.OpenGate')}
              </Text>
              <Text style={[styles.desc, styles.descRight]}>11 AM</Text>
            </View>
            <Gap height={heightPercentage(16)} />
            {/* Duration */}
            <Text style={styles.subtitle}>{t('Event.Concert.Duration')}</Text>
            <View style={styles.row}>
              <Text style={[styles.desc, styles.descRight]}>2 Hours</Text>
            </View>
            <Gap height={heightPercentage(16)} />
            {/* Location */}
            <Text style={styles.subtitle}>{t('Event.Concert.Location')}</Text>
            <View style={styles.row}>
              <Text style={[styles.desc, styles.descRight]}>
                Jln Kenangan, Gang Rindu, Desa Ingin Bertemu
              </Text>
            </View>
          </View>
          <SsuDivider />
          <View style={styles.descContainer}>
            <View style={styles.attribute}>
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <Text style={[styles.subtitle, {marginBottom: 0}]}>
                  {t('Event.Concert.LineUp')}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.subtitle,
                      {marginBottom: 0, color: Color.Pink.linear},
                    ]}>
                    View More
                  </Text>
                </TouchableOpacity>
              </View>

              <LineUp />
            </View>
            <View style={styles.attribute}>
              <Text style={styles.subtitle}>
                {t('Event.Concert.ChooseDate')}
              </Text>
              <SelectDate
                selected={selectedDate}
                data={dates}
                onPressSize={date => setSelectedDate(date)}
              />
            </View>
            <View>
              <Text style={styles.subtitle}>{t('Event.Concert.Ticket')}</Text>
              <TicketCategory
                selected={selectedTicket}
                data={tickets}
                onPressSize={ticket => setSelectedTicket(ticket)}
                onPressDetail={() => null}
              />
            </View>
          </View>
          <SsuDivider />
          <View style={[styles.descContainer, styles.priceContainer]}>
            <View>
              <Text style={styles.subtitle}>{t('Event.Concert.Total')}</Text>
              <Text style={styles.totalPrice}>3,500 Credits</Text>
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
    marginBottom: heightPercentage(4),
    fontFamily: Font.InterSemiBold,
  },
  title2: {
    ...Typography.Subtitle2,
    color: Color.Dark[50],
    marginBottom: heightPercentage(12),
  },
  subtitle: {
    color: 'white',
    fontFamily: Font.InterMedium,
    fontSize: normalize(12),
    marginBottom: heightResponsive(12),
  },
  descContainer: {
    paddingHorizontal: widthPercentage(24),
    paddingVertical: heightPercentage(20),
  },
  desc: {
    ...Typography.Subtitle3,
    color: Color.Neutral[50],
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
  row: {
    flexDirection: 'row',
  },
  descLeft: {
    width: '35%',
  },
  descRight: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalPrice: {
    ...Typography.Heading6,
    color: Color.Success[400],
    paddingTop: heightPercentage(6),
  },
});
