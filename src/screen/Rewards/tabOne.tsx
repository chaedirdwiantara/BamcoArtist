import {FlatList, StyleSheet, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import VoucherReward from '../../components/molecule/Reward/reward';
import {widthResponsive} from '../../utils';
import {Button, EmptyState, Gap} from '../../components';
import {color, font} from '../../theme';
import {mvs} from 'react-native-size-matters';
import {rewardMenu} from '../../data/reward';
import {useRewardHook} from '../../hooks/use-reward.hook';

type Props = {
  onClaimVoucher: (id: number) => void;
};

const TabOneReward: FC<Props> = ({onClaimVoucher}) => {
  const [activeIndex, setactiveIndex] = useState<number>(0);

  const onPressMenu = (index: number) => {
    setactiveIndex(index);
  };

  const {queryRewardMaster, queryProgressReward} = useRewardHook();
  const {data: dataRewardMaster} = queryRewardMaster();
  const {data: dataProgressReward} = queryProgressReward();
  useEffect(() => {
    console.log(dataRewardMaster);
  }, [dataRewardMaster]);

  useEffect(() => {
    console.log(dataProgressReward);
  }, [dataProgressReward]);

  return (
    <View style={styles().container}>
      <View style={styles().menuStyle}>
        {rewardMenu.map((data, index) => {
          return (
            <>
              <Button
                label={data.label}
                containerStyles={styles(activeIndex, index).btnClaim}
                textStyles={styles().textButton}
                onPress={() => onPressMenu(index)}
              />
              <Gap width={8} />
            </>
          );
        })}
      </View>

      <Gap height={16} />

      <FlatList
        data={dataRewardMaster?.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: widthResponsive(16),
        }}
        renderItem={({item}) => (
          <VoucherReward
            points={item.rewardTotal}
            voucherTitle={'Free Credit'}
            freeCredit={item.freeCredit}
            voucherAvail={1}
            onPress={() => onClaimVoucher(item.id)}
            containerStyle={styles().voucher}
            claimable={true}
            redeemable={true}
            completed={true}
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
    </View>
  );
};

export default TabOneReward;

const styles = (activeIndex?: number, index?: number) =>
  StyleSheet.create({
    container: {
      // backgroundColor: 'brown',
    },
    voucher: {
      width: widthResponsive(156),
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
