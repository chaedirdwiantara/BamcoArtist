import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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
import {
  BadgeBronzeMIcon,
  BadgeDiamondMIcon,
  BadgeGoldMIcon,
  BadgePlatinumMIcon,
  BadgeSilverMIcon,
} from '../../assets/icon';
import {dataMissionStore, slideIndexStore} from '../../store/reward.store';
import {RewardsSkeleton} from '../../skeleton/Rewards';
import {calculateGamification} from '../../utils/calculateGamification';
import HeaderSwiper from '../../components/molecule/Reward/headerSwiper';
import BenefitCard from '../../components/molecule/Reward/benefitCard';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

const Rewards = () => {
  const {t} = useTranslation();
  const {dataProfile, isLoading, getProfileUser} = useProfileHook();
  const {storedBadgeTitle, setStoredBadgeTitle} = dataMissionStore();
  const {storedSlideIndex} = slideIndexStore();
  const credit = dataProfile?.data.rewards.credit || 0;

  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: 'Rewards.Reward'},
    {filterName: 'Rewards.Mission'},
  ]);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalNewRank, setModalNewRank] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      getProfileUser();
    }, []),
  );

  useEffect(() => {
    async function setRefreshDataMain() {
      if (refreshing) {
        await getProfileUser();
        setRefreshing(false);
      }
    }

    setRefreshDataMain();
  }, [refreshing]);

  const handleScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 10;
    setScrollEffect(scrolled);
  };

  const tabFilterOnPress = (params: string, index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (
      storedBadgeTitle &&
      calculateGamification(credit).rankTitle !== storedBadgeTitle
    ) {
      setStoredBadgeTitle(calculateGamification(credit).rankTitle);
      setModalNewRank(true);
    } else if (
      !storedBadgeTitle &&
      calculateGamification(credit).rankTitle !== 'bronze'
    ) {
      setStoredBadgeTitle(calculateGamification(credit).rankTitle);
    }
  }, [calculateGamification(credit).rankTitle]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
            tintColor={'transparent'}
          />
        }>
        {isLoading ? (
          <RewardsSkeleton />
        ) : (
          <>
            <HeaderSwiper
              currentLvl={calculateGamification(credit).rankTitle}
            />
            <Gap height={15} />
            <View
              style={{
                paddingHorizontal: widthResponsive(20),
              }}>
              <PointProgress
                progress={dataProfile?.data.rewards.credit || 0}
                total={calculateGamification(credit).nextMilestone}
                nextLvl={calculateGamification(credit).nextLabelName}
                isMax={calculateGamification(credit).isMax}
                currentLvl={calculateGamification(credit).rankTitle}
              />
            </View>
            <Gap height={19} />
            <View style={{paddingHorizontal: widthResponsive(20)}}>
              <BenefitCard
                id={storedSlideIndex ? storedSlideIndex + 1 : 1}
                currentLvl={calculateGamification(credit).rankTitle}
              />
            </View>
          </>
        )}
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
                <TabOneReward
                  creditReward={dataProfile?.data.rewards.credit || 0}
                />
              </View>
            ) : (
              <View>
                <TabTwoRewards
                  refreshing={refreshing}
                  setRefreshing={setRefreshing}
                  rankTitle={calculateGamification(credit).rankTitle}
                />
              </View>
            )}
          </View>
        </View>
        <ModalCustom
          modalVisible={modalNewRank}
          onPressClose={() => setModalNewRank(false)}
          children={
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {t('Rewards.ModalRankUp.Title')}
              </Text>
              <Gap height={16} />
              {storedBadgeTitle === 'Bronze' ? (
                <BadgeBronzeMIcon />
              ) : storedBadgeTitle === 'Silver' ? (
                <BadgeSilverMIcon />
              ) : storedBadgeTitle === 'Gold' ? (
                <BadgeGoldMIcon />
              ) : storedBadgeTitle === 'Platinum' ? (
                <BadgePlatinumMIcon />
              ) : storedBadgeTitle === 'Diamond' ? (
                <BadgeDiamondMIcon />
              ) : null}
              <Gap height={16} />
              <Text style={styles.modalTitle}>{storedBadgeTitle}</Text>
              <Gap height={8} />
              <Text style={styles.modalCaption}>
                {t('Rewards.ModalRankUp.Subtitle')}
              </Text>
              <Gap height={20} />
              <Button
                label={t('General.Dismiss')}
                containerStyles={styles.btnClaim}
                textStyles={styles.textButton}
                onPress={() => setModalNewRank(false)}
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
  loadingSpinner: {
    alignItems: 'center',
    paddingVertical: mvs(20),
  },
});
