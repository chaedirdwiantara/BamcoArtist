import {FlatList, StyleSheet, View, Text} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import VoucherReward from '../../components/molecule/Reward/reward';
import {widthResponsive} from '../../utils';
import {EmptyState, Gap, ModalInfoClaimCredit} from '../../components';
import {color, font} from '../../theme';
import {mvs} from 'react-native-size-matters';
import {useRewardHook} from '../../hooks/use-reward.hook';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {ItemMasterReward} from '../../interface/reward.interface';
import {useTranslation} from 'react-i18next';
import {RewardCardSkeleton} from '../../skeleton/Rewards/RewardCard';
import {useMutation} from 'react-query';
import {redeemRewards} from '../../api/reward.api';
import {profileStorage} from '../../hooks/use-storage.hook';

type Props = {
  creditReward: number;
};

const TabOneReward: FC<Props> = ({creditReward}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const {queryRewardMaster, queryProgressReward} = useRewardHook();
  const {data: dataRewardMaster, isLoading: isLoadingReward} =
    queryRewardMaster();
  const {data: dataProgressReward, refetch: refetchProgressReward} =
    queryProgressReward();

  const [freeCredit, setFreeCredit] = useState<number>(0);
  const [modalInfo, setModalInfo] = useState<boolean>(true);
  const [modalType, setModalType] = useState<'success' | 'failed'>('success');

  useFocusEffect(
    useCallback(() => {
      refetchProgressReward();
    }, []),
  );

  const setRedeemRewards = useMutation({
    mutationKey: ['claim-voucher'],
    mutationFn: redeemRewards,
    onSuccess(res) {
      if (res?.success) {
        setModalInfo(true);
        setModalType('success');
      } else {
        setModalInfo(true);
        setModalType('failed');
      }
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleRedeem = (freeCredit: number) => {
    setFreeCredit(freeCredit);
    setRedeemRewards.mutate({
      userId: profileStorage()?.uuid || '',
      credit: freeCredit,
    });
  };

  return (
    <View style={styles().container}>
      <Gap height={mvs(20)} />
      {isLoadingReward ? (
        <RewardCardSkeleton />
      ) : (
        <FlatList
          data={dataRewardMaster?.data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{alignSelf: 'center'}}
          numColumns={2}
          renderItem={({item}) => (
            <VoucherReward
              points={item.rewardTotal}
              image={item.image}
              freeCredit={item.freeCredit}
              containerStyle={styles().voucher}
              onPress={() => handleRedeem(item.freeCredit)}
              redeemable={creditReward >= item.rewardTotal}
              completed={
                (dataProgressReward?.data &&
                  dataProgressReward?.data.filter(
                    ar => ar.creditReward === item.freeCredit,
                  ).length > 0) ||
                false
              }
            />
          )}
          ListEmptyComponent={() => {
            return (
              <EmptyState
                text={t('Rewards.EmptyState.RewardTitle')}
                subtitle={t('Rewards.EmptyState.RewardSubtitle')}
                hideIcon
                containerStyle={{height: 300}}
              />
            );
          }}
        />
      )}

      <ModalInfoClaimCredit
        type={modalType}
        credit={freeCredit}
        modalVisible={modalInfo}
        onPressClose={() => setModalInfo(false)}
      />
    </View>
  );
};

export default TabOneReward;

const styles = (activeIndex?: number, index?: number) =>
  StyleSheet.create({
    container: {
      // backgroundColor: 'brown',
    },
    title: {
      fontSize: mvs(13),
      fontWeight: '700',
      color: color.Neutral[10],
      fontFamily: font.InterSemiBold,
    },
    voucher: {
      marginBottom: widthResponsive(16),
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
