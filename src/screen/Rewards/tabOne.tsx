import {FlatList, StyleSheet, View, Text} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import VoucherReward from '../../components/molecule/Reward/reward';
import {widthResponsive} from '../../utils';
import {EmptyState, Gap} from '../../components';
import {color, font} from '../../theme';
import {mvs} from 'react-native-size-matters';
import {useRewardHook} from '../../hooks/use-reward.hook';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {ItemMasterReward} from '../../interface/reward.interface';
import {useTranslation} from 'react-i18next';
import {RewardCardSkeleton} from '../../skeleton/Rewards/RewardCard';

type Props = {
  creditReward: number;
};

const TabOneReward: FC<Props> = ({creditReward}) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [activeIndex, setactiveIndex] = useState<number>(0);

  const onPressMenu = (index: number) => {
    setactiveIndex(index);
  };

  const {queryRewardMaster, queryProgressReward} = useRewardHook();
  const {data: dataRewardMaster, isLoading: isLoadingReward} =
    queryRewardMaster();
  const {data: dataProgressReward, refetch: refetchProgressReward} =
    queryProgressReward();

  useFocusEffect(
    useCallback(() => {
      refetchProgressReward();
    }, []),
  );

  const goToDetailVoucher = (data: ItemMasterReward) => {
    const claimedRewards = dataProgressReward?.data;
    const completed =
      (claimedRewards &&
        claimedRewards?.filter(
          (val: {creditReward: number}) => val.creditReward === data.freeCredit,
        ).length > 0) ||
      false;

    navigation.navigate('DetailVoucherRewards', {
      dataDetail: data,
      redeemable: creditReward >= data.rewardTotal,
      completed,
    });
  };

  return (
    <View style={styles().container}>
      <Text style={styles().title}>{t('Rewards.AchievementRewards')}</Text>
      <Gap height={mvs(20)} />
      {isLoadingReward ? (
        <RewardCardSkeleton />
      ) : (
        <FlatList
          data={dataRewardMaster?.data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <VoucherReward
              points={item.rewardTotal}
              voucherTitle={'Free Credit'}
              freeCredit={item.freeCredit}
              voucherAvail={1}
              onPress={() => goToDetailVoucher(item)}
              containerStyle={styles().voucher}
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
                text="All Voucher is Already Claimed"
                subtitle="Voucher limit reached. Keep an eye out for 
      future opportunities!"
                hideIcon
                containerStyle={{height: 300}}
              />
            );
          }}
        />
      )}
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
