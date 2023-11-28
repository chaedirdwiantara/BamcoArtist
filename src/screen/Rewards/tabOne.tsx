import {FlatList, StyleSheet, View} from 'react-native';
import React, {FC, useState} from 'react';
import VoucherReward from '../../components/molecule/Reward/reward';
import {widthResponsive} from '../../utils';
import {Button, EmptyState, Gap} from '../../components';
import {color, font} from '../../theme';
import {mvs} from 'react-native-size-matters';
import {rewardMenu} from '../../data/reward';

type Props = {
  onClaimVoucher: (id: number) => void;
};

const TabOneReward: FC<Props> = ({onClaimVoucher}) => {
  const [activeIndex, setactiveIndex] = useState<number>(0);

  const onPressMenu = (index: number) => {
    setactiveIndex(index);
  };

  const dummyData = [
    {
      id: 1,
      points: 4,
      voucherTitle: 'Black Ping',
      voucherSubtitle: 'Bottle Sake 750',
      voucherAvail: 1,
      voucherDesc: '',
      claimable: true,
      redeemable: false,
      completed: false,
    },
    {
      id: 2,
      points: 8,
      voucherTitle: 'Black Mamba',
      voucherSubtitle: 'Drink Voucher',
      voucherAvail: 2,
      voucherDesc: '',
      claimable: false,
      redeemable: false,
      completed: false,
    },
    {
      id: 3,
      points: 7,
      voucherTitle: 'Beamco Event',
      voucherSubtitle: 'Band Maid',
      voucherAvail: 4,
      voucherDesc: '',
      claimable: true,
      redeemable: false,
      completed: false,
    },
    {
      id: 4,
      points: 10,
      voucherTitle: 'VIP Ticket',
      voucherSubtitle: 'Sawadee',
      voucherAvail: 4,
      voucherDesc: '@ Wonderland',
      claimable: true,
      redeemable: false,
      completed: false,
    },
  ];

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

      {dummyData.length > 0 && (
        <FlatList
          data={dummyData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: widthResponsive(16),
          }}
          renderItem={({item}) => (
            <VoucherReward
              points={item.points}
              voucherTitle={item.voucherTitle}
              voucherSubtitle={item.voucherSubtitle}
              voucherDesc={item.voucherDesc}
              voucherAvail={item.voucherAvail}
              onPress={() => onClaimVoucher(item.id)}
              containerStyle={styles().voucher}
              claimable={item.claimable}
              redeemable={item.redeemable}
              completed={item.completed}
            />
          )}
        />
      )}
      {/* FOR AVAILABLE VOCHER */}
      {dummyData.length == 0 && (
        <EmptyState
          text="All Voucher is Already Claimed"
          subtitle="Voucher limit reached. Keep an eye out for 
      future opportunities!"
          hideIcon
          containerStyle={{height: 300}}
        />
      )}
      {/* FOR MY VOCHER */}
      {/* {dummyData.length == 0 && (
        <EmptyState
          text="No Voucher Available"
          subtitle="Claim on Voucher on Available Voucher or 
          Someone gift the Voucher."
          hideIcon
          containerStyle={{height: 300}}
        />
      )} */}
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
