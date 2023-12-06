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
import RedeemSuccessIcon from '../../assets/icon/RedeemSuccess.icon';
import {
  BadgeBronzeMIcon,
  BadgeDiamondMIcon,
  BadgeGoldMIcon,
  BadgePlatinumMIcon,
  BadgeSilverMIcon,
} from '../../assets/icon';
import {dataMissionStore} from '../../store/reward.store';

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

export type levelName = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
type itemLevel = {
  name: levelName;
  lowPoint: number;
  highPoint: number;
  label: string;
};

const Rewards = () => {
  const {t} = useTranslation();
  const {dataProfile, getProfileUser} = useProfileHook();
  const {storedBadgeTitle, setStoredBadgeTitle} = dataMissionStore();

  const [selectedIndex, setSelectedIndex] = useState(-0);
  const [filter] = useState([
    {filterName: 'Rewards.Reward'},
    {filterName: 'Rewards.Mission'},
  ]);
  const [scrollEffect, setScrollEffect] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  const calculateGamification = (): {
    rankTitle: levelName;
    nextMilestone: number;
    nextLevelStage: levelName;
    nextLabelName: string;
    isMax: boolean;
  } => {
    const rewardLevel: itemLevel[] = [
      {
        name: 'bronze',
        lowPoint: 0,
        highPoint: 1000,
        label: ' Bronze',
      },
      {
        name: 'silver',
        lowPoint: 1001,
        highPoint: 2000,
        label: ' Silver',
      },
      {
        name: 'gold',
        lowPoint: 2001,
        highPoint: 6000,
        label: ' Gold',
      },
      {
        name: 'platinum',
        lowPoint: 6001,
        highPoint: 10000,
        label: ' Platinum',
      },
      {
        name: 'diamond',
        lowPoint: 10001,
        highPoint: 9999999999999,
        label: ' Diamond',
      },
    ];
    const rewardsCredit = dataProfile?.data.rewards.credit || 0;
    const currentLevel = rewardLevel.filter(
      ar => rewardsCredit >= ar.lowPoint && rewardsCredit <= ar.highPoint,
    )[0];
    const indexCurrentLevel = rewardLevel.findIndex(
      ar => rewardsCredit >= ar.lowPoint && rewardsCredit <= ar.highPoint,
    );
    const rankTitle = currentLevel.name;
    const nextMilestone = currentLevel.highPoint;

    return {
      rankTitle,
      nextMilestone,
      nextLevelStage:
        indexCurrentLevel < rewardLevel.length - 1
          ? rewardLevel[indexCurrentLevel + 1].name
          : rewardLevel[rewardLevel.length - 1].name,
      nextLabelName:
        indexCurrentLevel < rewardLevel.length - 1
          ? rewardLevel[indexCurrentLevel + 1].label
          : rewardLevel[rewardLevel.length - 1].label,
      isMax: indexCurrentLevel === rewardLevel.length - 1,
    };
  };

  useEffect(() => {
    if (
      storedBadgeTitle &&
      calculateGamification().rankTitle !== storedBadgeTitle
    ) {
      setStoredBadgeTitle(calculateGamification().rankTitle);
      setModalNewRank(true);
    } else if (
      !storedBadgeTitle &&
      calculateGamification().rankTitle !== 'bronze'
    ) {
      setStoredBadgeTitle(calculateGamification().rankTitle);
    }
  }, [calculateGamification().rankTitle]);

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
        <View style={styles.slide}>
          <BackgroundHeader
            points={dataProfile?.data.rewards.credit || 0}
            rankTitle={calculateGamification().rankTitle}
          />
        </View>

        <Gap height={14} />
        <View style={{paddingHorizontal: widthResponsive(20)}}>
          <PointProgress
            progress={dataProfile?.data.rewards.credit || 0}
            total={calculateGamification().nextMilestone}
            nextLvl={calculateGamification().nextLabelName}
            isMax={calculateGamification().isMax}
          />
        </View>

        <Gap height={24} />
        <View style={{paddingHorizontal: widthResponsive(20)}}>
          <InfoCard
            title={
              calculateGamification().isMax
                ? 'Your Badge is Maxed Out'
                : `${calculateGamification().nextLabelName.substring(
                    3,
                  )} Badge is Closer `
            }
            caption={
              calculateGamification().isMax
                ? `Congratulations! You've reached Diamond Badge Claim. Claim the rewards and be proud`
                : `You’re ${
                    calculateGamification().nextMilestone -
                    (dataProfile?.data.rewards.credit || 0)
                  } Points away from being ${calculateGamification().nextLabelName.substring(
                    3,
                  )}. Let’s get ‘em by completing more mission!`
            }
            badgeType={calculateGamification().nextLevelStage}
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
                <TabOneReward
                  creditReward={dataProfile?.data.rewards.credit || 0}
                />
              </View>
            ) : (
              <View>
                <TabTwoRewards
                  refreshing={refreshing}
                  setRefreshing={setRefreshing}
                />
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
                label={'Dismiss'}
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
});
