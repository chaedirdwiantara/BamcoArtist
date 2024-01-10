import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Gap, TopNavigation} from '../../../components';
import {color, font} from '../../../theme';
import {widthResponsive} from '../../../utils';
import {RootStackParams} from '../../../navigations';
import {ArrowLeftIcon, ClockIcon} from '../../../assets/icon';
import {useRewardHook} from '../../../hooks/use-reward.hook';
import {useFocusEffect} from '@react-navigation/native';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

type ListVoucherProps = NativeStackScreenProps<
  RootStackParams,
  'DetailBenefit'
>;

const DetailBenefit: FC<ListVoucherProps> = ({
  route,
  navigation,
}: ListVoucherProps) => {
  const {t} = useTranslation();
  const benefitId = route.params.benefitId;
  const [scrollEffect, setScrollEffect] = useState<boolean>(false);

  const {useGetDetailBenefit} = useRewardHook();

  const {
    data: dataDetail,
    refetch: refetchDetailBenefit,
    isLoading: isLoadingDetailBenefit,
    isRefetching: isRefetchingDetailBenefit,
  } = useGetDetailBenefit({id: benefitId});

  // ! 1. FETCH DATA ON FOCUS
  useFocusEffect(
    useCallback(() => {
      refetchDetailBenefit();
    }, []),
  );

  const handleBackAction = () => {
    navigation.goBack();
  };

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 1;
    setScrollEffect(scrolled);
  };

  return (
    <View style={styles.root}>
      {scrollEffect && (
        <TopNavigation.Type1
          title={t('Event.DetailVoucher.Title')}
          maxLengthTitle={20}
          itemStrokeColor={'white'}
          leftIcon={<ArrowLeftIcon />}
          leftIconAction={handleBackAction}
          containerStyles={styles.topNavStyle}
          rightIconAction={() => {}}
        />
      )}
      <ScrollView onScroll={handleScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.slide}>
          <ImageBackground
            style={{width: '100%', height: 400}}
            source={require('../../../assets/image/bg-detail-voucher.png')}>
            <LinearGradient
              colors={['#00000000', color.Dark[800]]}
              style={{height: '100%', width: '100%'}}>
              <View style={styles.headerContent}>
                {!scrollEffect ? (
                  <TopNavigation.Type1
                    title={t('Event.DetailVoucher.Title')}
                    maxLengthTitle={20}
                    itemStrokeColor={'white'}
                    leftIcon={<ArrowLeftIcon />}
                    leftIconAction={handleBackAction}
                    rightIconAction={() => {}}
                    containerStyles={{
                      borderBottomColor: 'transparent',
                      paddingHorizontal: widthResponsive(24),
                    }}
                  />
                ) : (
                  <View />
                )}

                <View style={styles.titleContainer}>
                  <Text style={styles.vTitle}>{dataDetail?.data.title}</Text>
                  <Gap height={5} />
                  <Text style={styles.vSubTitle}>
                    {t('Rewards.DetailVoucher.RewardAchievement')}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <View style={styles.expired}>
            <View style={styles.textIcon}>
              <View style={{flexDirection: 'row'}}>
                <ClockIcon
                  stroke={color.Pink[200]}
                  width={mvs(16)}
                  height={mvs(16)}
                />
                <Gap width={8} />
                <Text style={styles.normalTitle}>
                  {t('Event.DetailVoucher.Expired')}
                </Text>
              </View>
              <Text style={[styles.normalTitle, {color: color.Success[400]}]}>
                {dataDetail?.data.tier.name}
              </Text>
            </View>
          </View>
          {dataDetail?.data.tnc.value !== null && (
            <View style={styles.tnc}>
              <Text style={styles.normalTitle}>
                {t('Event.DetailVoucher.Tnc')}
              </Text>
              <Gap height={4} />
              {dataDetail?.data.tnc.value.map((val, i) => (
                <View key={i} style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      width: widthResponsive(20),
                    }}>
                    <Text style={styles.tncValue}>{i + 1}.</Text>
                  </View>
                  <Text style={[styles.tncValue, {flex: 1, textAlign: 'auto'}]}>
                    {val}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailBenefit;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
    position: 'relative',
  },
  slide: {
    position: 'relative',
    width: '100%',
  },
  topNavStyle: {
    paddingHorizontal: widthResponsive(20),
  },
  headerContent: {
    height: '100%',
    justifyContent: 'space-between',
  },
  titleContainer: {
    paddingBottom: widthResponsive(20),
    paddingHorizontal: widthResponsive(20),
  },
  vTitle: {
    fontFamily: font.InterRegular,
    fontSize: mvs(20),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  vSubTitle: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
    color: color.Success[400],
  },
  content: {},
  expired: {
    padding: widthResponsive(20),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: color.Dark[500],
    justifyContent: 'space-between',
  },
  textIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  normalTitle: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  tnc: {
    padding: widthResponsive(20),
  },
  tncValue: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '400',
    color: color.Neutral[35],
  },
  bottomContainer: {
    paddingHorizontal: widthResponsive(20),
    paddingBottom: widthResponsive(25),
    paddingTop: widthResponsive(15),
    width: '100%',
  },
  buttonStyle: {
    width: '100%',
    height: widthResponsive(40),
    aspectRatio: undefined,
    backgroundColor: color.Pink[10],
  },
  modalContainer: {
    backgroundColor: color.Dark[800],
    paddingHorizontal: widthResponsive(16),
    paddingTop: widthResponsive(32),
    paddingBottom: widthResponsive(16),
    alignItems: 'center',
    borderRadius: 16,
  },
  qrCodeStyle: {
    width: widthResponsive(254),
    height: widthResponsive(254),
    backgroundColor: color.Neutral[10],
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    color: color.Neutral[10],
    textAlign: 'center',
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(16),
  },
  modalCaption: {
    color: color.Neutral[35],
    textAlign: 'center',
    fontFamily: font.InterRegular,
    fontWeight: '500',
    maxWidth: '80%',
    fontSize: mvs(10),
  },
  buttonModalStyle: {
    width: undefined,
    aspectRatio: undefined,
    paddingHorizontal: widthResponsive(15),
    paddingVertical: widthResponsive(5),
    borderColor: 'transparent',
  },
});
