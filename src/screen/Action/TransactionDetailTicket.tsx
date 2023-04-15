import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
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
import {ArrowLeftIcon} from '../../assets/icon';
import {Button, Gap, SsuDivider, TopNavigation} from '../../components';
import {useMusicianHook} from '../../hooks/use-musician.hook';
import {RootStackParams} from '../../navigations';
import Color from '../../theme/Color';
import Font from '../../theme/Font';
import {
  heightPercentage,
  heightResponsive,
  normalize,
  widthPercentage,
  widthResponsive,
} from '../../utils';
import {mvs} from 'react-native-size-matters';
import Typography from '../../theme/Typography';
import LineUp from '../../components/molecule/EventDetail/LineUp';
import TicketDescription from '../../components/molecule/EventDetail/TicketDescription';
import {Image} from 'react-native';

type MerchDetailProps = NativeStackScreenProps<
  RootStackParams,
  'TransactionDetailTicket'
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

const TransactionDetailTicket: React.FC<MerchDetailProps> = ({
  route,
}: MerchDetailProps) => {
  const {t} = useTranslation();
  const {getListDataMusician} = useMusicianHook();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

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
          title={t('Transaction.Detail.Ticket')}
          maxLengthTitle={20}
          itemStrokeColor={'white'}
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
                  source={{uri: 'https://picsum.photos/400'}}
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
            <Text style={styles.title}>Head In The Cloud 2022 - Silver</Text>
            <Gap height={heightPercentage(8)} />
            <Text style={styles.title2}>
              3 March 2023, Jakarta Velodrome, Jakarta
            </Text>
            <Gap height={heightPercentage(8)} />
            <Image
              source={require('../../assets/image/barcode.png')}
              style={{width: '100%'}}
              resizeMode={'cover'}
            />
            <Gap height={heightPercentage(16)} />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={styles.title2}>Ticket Code</Text>
              <Gap width={widthPercentage(4)} />
              <Text style={[styles.title2, {color: Color.Pink.linear}]}>
                HITCS200
              </Text>
            </View>
            <Gap height={heightPercentage(8)} />
            <Button
              type="border"
              label="Send to Email"
              containerStyles={{width: '100%'}}
              textStyles={{color: Color.Success[400]}}
            />
          </View>

          <SsuDivider />
          <View style={styles.descContainer}>
            <TicketDescription />
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
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TransactionDetailTicket;

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
