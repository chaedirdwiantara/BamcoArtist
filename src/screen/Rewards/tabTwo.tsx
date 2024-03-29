import {FlatList, Linking, StyleSheet, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Mission from '../../components/molecule/Reward/mission';
import {ModalConfirm, SuccessToast} from '../../components';
import {color, font} from '../../theme';
import {mvs} from 'react-native-size-matters';
import {widthResponsive} from '../../utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useRewardHook} from '../../hooks/use-reward.hook';
import {
  DataMissionMaster,
  RewardListFunction,
} from '../../interface/reward.interface';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainTabParams, RootStackParams} from '../../navigations';
import {userProfile} from '../../store/userProfile.store';
import {useTranslation} from 'react-i18next';
import {ModalInfo} from '../../components/molecule/Modal/ModalInfo';
import {MissionCardSkeleton} from '../../skeleton/Rewards/MissionCard';
import {levelName} from '../../utils/calculateGamification';
import {dataMissionStore} from '../../store/reward.store';

type Props = {
  refreshing: boolean;
  setRefreshing: (item: boolean) => void;
  rankTitle: levelName;
};

const TabTwoRewards: FC<Props> = ({refreshing, setRefreshing, rankTitle}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const {profileStore} = userProfile();
  const {t} = useTranslation();

  const [activeIndex, setactiveIndex] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [claimedPoint, setClaimedPoint] = useState<number>(0);
  const [paramClaim, setParamClaim] = useState<string>();
  const [modalBan, setModalBan] = useState<boolean>(false);
  const [modalInfoMusic, setModalInfoMusic] = useState<boolean>(false);
  const [dataStateMission, setDataStateMission] =
    useState<DataMissionMaster[]>();

  const {useGetMissionMaster, useSetClaimMission} = useRewardHook();
  const {storedDataMission, setStoredDataMission} = dataMissionStore();

  const {
    data: dataMission,
    refetch: refetchMissionMaster,
    isLoading: isLoadingMissionMaster,
    isRefetching: isRefetchingMissionMaster,
  } = useGetMissionMaster();

  const {
    data: dataClaim,
    refetch: refetchClaimMission,
    isLoading: isLoadingClaimMission,
    isRefetching: isRefetchingClaimMissionr,
  } = useSetClaimMission(paramClaim!);

  // ! 1. FETCH DATA ON FOCUS
  useFocusEffect(
    useCallback(() => {
      refetchMissionMaster();
      setactiveIndex(0);
    }, []),
  );

  useEffect(() => {
    if (dataMission?.data && storedDataMission) {
      // check if the number exists in storedDataMission
      const exInStored = (num: number) =>
        storedDataMission.some(el => el.id === num);

      // Sorting
      const sorted = [...dataMission.data].sort((a, b) => {
        if (exInStored(a.id) && !exInStored(b.id)) {
          return 1; // Move 'a' to end if it exists in exInStored
        } else if (!exInStored(a.id) && exInStored(b.id)) {
          return -1; // Keep 'a' before 'b' if only 'b' exists in exInStored
        }
        return 0; // No change in order if both or neither are in exInStored
      });
      setDataStateMission(sorted);
    }
  }, [dataMission?.data, storedDataMission]);

  useEffect(() => {
    async function fetchClaim() {
      if (paramClaim) {
        await refetchClaimMission();
        // Set a timeout of 3 second before calling setRefreshing
        setParamClaim(undefined);
        setTimeout(() => {
          refetchMissionMaster();
          setRefreshing(true);
        }, 3000);
      }
    }

    fetchClaim();
  }, [paramClaim]);

  const onPressMenu = (index: number) => {
    setactiveIndex(index);
  };

  const onClaimMission = (
    sumLoyaltyPoints: number,
    data: DataMissionMaster,
  ) => {
    setClaimedPoint(sumLoyaltyPoints); // to show on toast
    setShowToast(true); // show toast
    setParamClaim(data.function); // to hit api
  };

  const handleCreatePost = (screen: string) => {
    if (profileStore.data.isBanned) {
      setModalBan(true);
    } else {
      navigation.navigate('CreatePost', {audience: screen});
    }
  };

  const handleCloseBanModal = () => {
    setModalBan(false);
  };

  const handleOkBanModal = () => {
    setModalBan(false);
    navigation.navigate('Setting');
  };

  const onUploadSongMission = () => {
    setModalInfoMusic(true);
  };

  const onGoMission = (screenFn: RewardListFunction) => {
    switch (screenFn) {
      case 'complete-profile':
        navigation.navigate('ProfileProgress');
        break;
      case 'daily-sign-in':
        console.log('nothing to do here');
        break;
      case 'refer-artist':
        navigation.navigate('ReferralCode');
        break;
      case 'share-social-media':
        navigation2.navigate('Home', {
          showToast: false,
          shareMusicMission: true,
        });
        break;
      case 'post-public-text':
        handleCreatePost('Feed.Public');
        break;
      case 'post-public-photo':
        handleCreatePost('Feed.Public');
        break;
      case 'post-public-video':
        handleCreatePost('Feed.Public');
        break;
      case 'post-exclusive-content':
        handleCreatePost('Feed.Exclusive');
        break;
      case 'get-followers':
        navigation.navigate('ExclusiveContentSetting');
        break;
      case 'get-fans':
        navigation.navigate('ExclusiveContentSetting');
        break;
      case 'get-subscriber':
        navigation.navigate('ExclusiveContentSetting');
        break;
      case 'upload-song':
        onUploadSongMission();
        break;
      case 'perform-event':
        Linking.openURL(
          `mailto:team@thebeam.co?subject=${encodeURI(
            t('Event.Detail.MailTitle'),
          )}&body=${encodeURI(t('Event.Detail.MailBody'))}`,
        );
        break;
      case 'get-tip-credits':
        navigation.navigate('EventDetail', {id: 'lShlckDSg'});
        break;
    }
  };

  return (
    <View style={styles().container}>
      {isLoadingMissionMaster ? (
        <MissionCardSkeleton />
      ) : (
        dataStateMission && (
          <FlatList
            data={dataStateMission}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({item}) => (
              <Mission
                data={item}
                onClaim={onClaimMission}
                onGo={() => onGoMission(item.function)}
                rankTitle={rankTitle}
              />
            )}
          />
        )
      )}

      {showToast && (
        <SuccessToast
          toastVisible={showToast}
          onBackPressed={() => setShowToast(false)}
          caption={t('Rewards.MissionTab.ClaimToast', {
            claimedPoint: claimedPoint,
          })}
        />
      )}
      {/* //? Banned user modal */}
      <ModalConfirm
        modalVisible={modalBan}
        title={`${t('Setting.PreventInteraction.Title')}`}
        subtitle={`${t('Setting.PreventInteraction.Subtitle')}`}
        yesText={`${t('Btn.Send')}`}
        noText={`${t('Btn.Cancel')}`}
        onPressClose={handleCloseBanModal}
        onPressOk={handleOkBanModal}
        textNavigate={`${t('Setting.PreventInteraction.TextNavigate')}`}
        textOnPress={handleOkBanModal}
      />

      {modalInfoMusic && (
        <ModalInfo
          title={t('Home.UploadMusic.ModalInfo.Title')}
          subtitle1={t('Home.UploadMusic.ModalInfo.Subtitle1')}
          url={'https://artists.thebeam.co'}
          subtitle2={t('Home.UploadMusic.ModalInfo.Subtitle2')}
          visible={modalInfoMusic}
          onPressClose={() => setModalInfoMusic(false)}
        />
      )}
    </View>
  );
};

export default TabTwoRewards;

const styles = (activeIndex?: number, index?: number) =>
  StyleSheet.create({
    container: {
      // backgroundColor: 'aqua',
    },
    btnClaim: {
      aspectRatio: undefined,
      width: undefined,
      height: undefined,
      paddingVertical: widthResponsive(6),
      paddingHorizontal: widthResponsive(16),
      backgroundColor: activeIndex === index ? color.Pink[200] : '#1A2435',
      borderRadius: 30,
    },
    textButton: {
      fontFamily: font.InterRegular,
      fontSize: mvs(10),
      fontWeight: '500',
    },
    menuStyle: {
      flexDirection: 'row',
    },
  });
