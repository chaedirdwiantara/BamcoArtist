import {
  NativeModules,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {color, font} from '../../theme';
import {widthResponsive} from '../../utils';
import {Button, Gap, ModalCustom, TabFilter} from '../../components';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {useTranslation} from 'react-i18next';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';
import TabOneReward from './tabOne';
import TabTwoRewards from './tabTwo';
import InfoCard from '../../components/molecule/Reward/infoCard';
import PointProgress from '../../components/molecule/Reward/pointProgress';
import BackgroundHeader from '../../components/molecule/Reward/backgroundHeader';
import {mvs} from 'react-native-size-matters';
import RedeemSuccessIcon from '../../assets/icon/RedeemSuccess.icon';

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

const Rewards = () => {
  const {t} = useTranslation();
  const {dataProfile, dataCountProfile, getProfileUser, getTotalCountProfile} =
    useProfileHook();

  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: 'Rewards.Reward'},
    {filterName: 'Rewards.Mission'},
  ]);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getProfileUser();
    }, []),
  );

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 10;
    setScrollEffect(scrolled);
  };

  const tabFilterOnPress = (params: string, index: number) => {
    setSelectedIndex(index);
  };

  const onClaimVoucher = (id: number) => {
    console.log(id, 'id');
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}>
        <View style={styles.slide}>
          <BackgroundHeader rankTitle={'bronze'} points={1800} />
        </View>

        <Gap height={14} />
        <View style={{paddingHorizontal: widthResponsive(20)}}>
          <PointProgress progress={1800} total={2000} nextLvl="2. Silver" />
        </View>

        <Gap height={24} />
        <View style={{paddingHorizontal: widthResponsive(20)}}>
          <InfoCard
            title={'Silver Streamer Badge is Closer '}
            caption={
              'You’re 200 Points away from being Silver. Let’s get ‘em by completing more mission!'
            }
            badgeType={'silver'}
          />
        </View>
        <Gap height={16} />

        <View style={styles.filterContainer}>
          <TabFilter.Type1
            filterData={filter}
            onPress={tabFilterOnPress}
            selectedIndex={selectedIndex}
            translation={true}
            flatlistContainerStyle={{
              justifyContent: 'space-between',
            }}
            TouchableStyle={{width: widthPercentageToDP(45)}}
          />

          <View style={styles.containerContent}>
            {filter[selectedIndex].filterName === 'Rewards.Reward' ? (
              <View>
                <TabOneReward onClaimVoucher={onClaimVoucher} />
              </View>
            ) : (
              <View>
                <TabTwoRewards />
              </View>
            )}
          </View>
        </View>
        <ModalCustom
          modalVisible={showModal}
          onPressClose={() => setShowModal(false)}
          children={
            <View style={styles.modalContainer}>
              <RedeemSuccessIcon />
              <Gap height={16} />
              <Text style={styles.modalTitle}>
                Congrats! You’ve Claimed 1 Voucher!
              </Text>
              <Gap height={8} />
              <Text style={styles.modalCaption}>
                Redeem for yourself or send to fellow fans. Visit My Rewards
                Page for more details.
              </Text>
              <Gap height={20} />
              <Button
                label={'Dismiss'}
                containerStyles={styles.btnClaim}
                textStyles={styles.textButton}
                onPress={() => setShowModal(false)}
                type="border"
              />
            </View>
          }
        />
      </ScrollView>
    </View>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
    zIndex: 2,
  },
  containerContent: {
    flex: 1,
    marginTop: widthResponsive(16),
    width: '100%',
  },
  filterContainer: {
    paddingHorizontal: widthResponsive(24),
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  slide: {
    position: 'relative',
    width: '100%',
  },
  btnClaim: {
    aspectRatio: undefined,
    width: undefined,
    height: undefined,
    paddingHorizontal: 3,
    borderWidth: 0,
  },
  textButton: {
    fontFamily: font.InterMedium,
    fontSize: mvs(14),
    fontWeight: '500',
    color: color.Pink[200],
  },
  modalTitle: {
    color: color.Neutral[10],
    textAlign: 'center',
    fontFamily: font.InterMedium,
    fontWeight: '600',
    fontSize: mvs(14),
  },
  modalCaption: {
    color: color.Secondary[10],
    textAlign: 'center',
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(10),
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: color.Dark[800],
    paddingTop: widthResponsive(32),
    paddingHorizontal: widthResponsive(16),
    paddingBottom: widthResponsive(16),
    width: widthResponsive(244),
    borderRadius: 16,
  },
});
