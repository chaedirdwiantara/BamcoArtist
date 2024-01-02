import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import {
  BadgeBronzeMissionIcon,
  BadgeDiamondMissionIcon,
  BadgeGoldMissionIcon,
  BadgePlatinumMissionIcon,
  BadgeSilverMissionIcon,
  CheckCircle2Icon,
} from '../../../assets/icon';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';
import {
  DataListMissioProgress,
  DataMissionMaster,
} from '../../../interface/reward.interface';
import {useRewardHook} from '../../../hooks/use-reward.hook';
import {useTranslation} from 'react-i18next';
import {levelName} from '../../../utils/calculateGamification';
import {ModalHowToGetCredit} from '../Modal/ModalHowToGetCredit';

interface MissionProps {
  data: DataMissionMaster;
  onClaim: (rewardCount: number, data: DataMissionMaster) => void;
  onGo: () => void;
  rankTitle: levelName;
}

const Mission: React.FC<MissionProps> = ({data, onClaim, onGo, rankTitle}) => {
  const {t} = useTranslation();
  const {useGetMissionProgress} = useRewardHook();
  const [dataProgress, setDataProgress] = useState<DataListMissioProgress>();
  const [readyToRefetch, setreadyToRefetch] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    data: dataMissionPrg,
    refetch: refetchMissionPrg,
    isLoading: isLoadingMissionPrg,
    isRefetching: isRefetchingMissionPrg,
  } = useGetMissionProgress({
    task_type: data.taskType,
    function: data.function,
  });

  useEffect(() => {
    refetchMissionPrg();
  }, [data]);

  useEffect(() => {
    if (dataMissionPrg?.data) {
      setDataProgress(dataMissionPrg.data);
    }
  }, [dataMissionPrg]);

  useEffect(() => {
    if (readyToRefetch) {
      setTimeout(() => {
        refetchMissionPrg();
      }, 3000);
      setreadyToRefetch(false);
    }
  }, [readyToRefetch]);

  const progressBar = dataProgress
    ? dataProgress?.rowCount / data.amountToClaim
    : 0 / data.amountToClaim;
  const progressText = `${dataProgress ? dataProgress?.rowCount : 0}${
    dataProgress?.function.includes('profile') ? '%' : ''
  }/${data.amountToClaim}${
    dataProgress?.function.includes('profile') ? '%' : ''
  }`;
  const progressRepeatable = dataProgress?.rowCount === 0 ? 0 / 1 : 1;
  const progressTextRepeatable = `${dataProgress?.rowCount} ${
    dataProgress?.function.includes('donation') ||
    dataProgress?.function.includes('tipping')
      ? 'Credit Detected'
      : 'Activity Detected'
  }`;

  const handleOnClaim = (
    dataProgress: DataListMissioProgress,
    data: DataMissionMaster,
  ) => {
    if (data.taskType !== 'based-reward') {
      setDataProgress({...dataProgress, isClaimable: false, isClaimed: true});
    } else {
      setDataProgress({...dataProgress, isClaimable: false, isClaimed: false});
    }
    setreadyToRefetch(true);
    onClaim(dataProgress?.sumLoyaltyPoints!, data);
  };

  return (
    <View>
      <TouchableOpacity onPress={onGo} style={styles.voteTopContainer}>
        <View style={styles.containerBadge}>
          {rankTitle === 'bronze' ? (
            <BadgeBronzeMissionIcon />
          ) : rankTitle === 'silver' ? (
            <BadgeSilverMissionIcon />
          ) : rankTitle === 'gold' ? (
            <BadgeGoldMissionIcon />
          ) : rankTitle === 'platinum' ? (
            <BadgePlatinumMissionIcon />
          ) : rankTitle === 'diamond' ? (
            <BadgeDiamondMissionIcon />
          ) : null}
          <Text style={styles.rewardCountTxt}>
            {data.taskType === 'based-reward' &&
            dataProgress &&
            dataProgress?.sumLoyaltyPoints > 0
              ? dataProgress.sumLoyaltyPoints
              : data.rewards}
          </Text>
        </View>
        <Gap width={widthResponsive(12)} />
        <View style={styles.progressBarContainer}>
          <Text style={styles.titleTxt}>{data.taskName}</Text>
          <Gap height={mvs(5)} />
          <View style={styles.prgContainer}>
            <Progress.Bar
              progress={
                data.taskType === 'based-reward'
                  ? progressRepeatable
                  : progressBar
              }
              width={null}
              height={widthResponsive(11)}
              borderWidth={0}
              color={color.Pink[200]}
              unfilledColor={color.Dark[300]}
              borderRadius={4}
              animated={false}
              style={{width: '100%'}}
              // animationType={'timing'}
            />
            {!dataProgress?.isClaimed ? (
              <View style={styles.progressContainer}>
                <Text style={styles.progressTxt}>
                  {data.taskType === 'based-reward'
                    ? progressTextRepeatable
                    : progressText}
                </Text>
              </View>
            ) : (
              <View style={styles.progressContainer}>
                <CheckCircle2Icon width={10} height={10} />
                <Gap width={4} />
                <Text style={styles.progressTxt}>
                  {t('Rewards.MissionTab.BtnCompleted')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  voteTopContainer: {
    flexDirection: 'row',
    backgroundColor: color.Dark[700],
    padding: widthResponsive(16),
    borderRadius: 4,
    marginBottom: widthResponsive(16),
  },
  containerBadge: {
    alignItems: 'center',
  },
  progressBarContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  prgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressTxt: {
    color: color.Neutral[20],
    fontFamily: font.InterRegular,
    fontSize: mvs(10),
    fontWeight: '600',
    lineHeight: widthResponsive(12),
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnClaim: {
    aspectRatio: undefined,
    width: widthResponsive(50),
    height: widthResponsive(40),
    backgroundColor: color.Pink[200],
  },
  btnGo: {
    width: widthResponsive(50),
    height: widthResponsive(40),
    aspectRatio: undefined,
    backgroundColor: color.Dark[800],
  },
  textButton: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
  },
  textGoButton: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
    color: color.Pink[200],
  },
  textAreaProgress: {flexDirection: 'row', alignItems: 'center'},
  rewardCountContainer: {flexDirection: 'row', alignItems: 'center'},
  captionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleTxt: {
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '600',
  },
  rewardCountTxt: {
    color: color.Pink[200],
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '500',
  },
});

export default Mission;
