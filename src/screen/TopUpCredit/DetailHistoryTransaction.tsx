import React, {FC} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ms, mvs} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  CopyIcon,
  CoinDIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '../../assets/icon';
import {
  dateFormatFullYear,
  dateFormatHoursMinutes,
} from '../../utils/date-format';
import {color, font} from '../../theme';
import {RootStackParams} from '../../navigations';
import {Gap, TopNavigation} from '../../components';
import {elipsisText, toCurrency, width} from '../../utils';

type TransactionProps = NativeStackScreenProps<
  RootStackParams,
  'DetailHistoryTransaction'
>;
export const DetailHistoryTransactionScreen: FC<TransactionProps> = ({
  navigation,
  route,
}: TransactionProps) => {
  const {t} = useTranslation();
  const {dataDetail} = route.params;
  const newData = [
    {
      title: 'TopUp.Transaction.Detail.ReferenceNumber',
      value: dataDetail.id,
    },
    {
      title: 'TopUp.Transaction.Detail.Status',
      value:
        dataDetail.trxStatus === 1
          ? 'TopUp.Transaction.Detail.Success'
          : 'TopUp.Transaction.Detail.Failed',
    },
    {
      title: 'TopUp.Transaction.Detail.Date',
      value: dateFormatFullYear(dataDetail.createdAt),
    },
    {
      title: 'TopUp.Transaction.Detail.Time',
      value: dateFormatHoursMinutes(dataDetail.createdAt),
    },
    {
      title: 'TopUp.Transaction.Detail.PaymentMethods',
      value: dataDetail.trxMethodString,
    },
    {
      title: 'TopUp.Transaction.Detail.Total',
      value: dataDetail.packagePrice,
    },
    {
      title: 'TopUp.Transaction.Detail.Credit',
      value: toCurrency(dataDetail.credit, {withFraction: false}),
    },
    {
      title: 'TopUp.Transaction.Detail.Bonus',
      value: 0,
    },
  ];

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const MailTo = () => {
    return Linking.openURL(
      'mailto:team@thebeam.co?subject=Need Help About Transaction Details',
    );
  };

  const ListDetail = ({
    title,
    value,
  }: {
    title: string;
    value: string | number;
  }) => {
    // check some special case
    const isReference =
      title === 'TopUp.Transaction.Detail.ReferenceNumber' &&
      typeof value === 'string';
    const isStatus =
      title === 'TopUp.Transaction.Detail.Status' && typeof value === 'string';

    return (
      <View style={styles.containerHelp}>
        <Text style={styles.valueText}>{t(title)}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.valueText, {color: color.Neutral[10]}]}>
            {isReference ? elipsisText(value, 20) : isStatus ? t(value) : value}
          </Text>
          {/* // show copy icon if title = reference number */}
          {isReference && (
            <>
              <Gap width={ms(5)} />
              <CopyIcon />
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <TopNavigation.Type1
        title={t('TopUp.Transaction.Detail.Title')}
        leftIcon={<ArrowLeftIcon />}
        itemStrokeColor={color.Neutral[10]}
        leftIconAction={onPressGoBack}
        containerStyles={{
          marginBottom: mvs(10),
          paddingHorizontal: ms(15),
        }}
      />

      {/* // Card Credit */}
      <View style={styles.containerCardCredit}>
        <Text style={styles.statusInfo}>
          {t('TopUp.Transaction.Detail.StatusInfo')}
        </Text>
        <View style={styles.containerContentCard}>
          <CoinDIcon style={styles.coinIcon} />
          <Gap width={ms(7)} />
          <Text style={styles.credit}>
            +{toCurrency(dataDetail.credit, {withFraction: false})}
          </Text>
        </View>
      </View>

      {/* // List Detail */}
      <View style={styles.separator} />
      {newData.map((val, i) => (
        <ListDetail key={i} title={val.title} value={val.value} />
      ))}
      <View style={styles.separator} />

      {/* // Help Menu */}
      <TouchableOpacity style={styles.containerHelp} onPress={MailTo}>
        <View>
          <Text style={styles.needHelp}>
            {t('TopUp.Transaction.Detail.NeedHelp')}
          </Text>
          <Text style={styles.contact}>
            {t('TopUp.Transaction.Detail.ContactSupport')}
          </Text>
        </View>
        <ArrowRightIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  containerCardCredit: {
    width: width * 0.9,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: mvs(1),
    borderColor: color.Dark[500],
    paddingVertical: mvs(20),
    marginTop: mvs(10),
    marginBottom: mvs(5),
  },
  containerContentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: mvs(5),
  },
  statusInfo: {
    fontSize: mvs(14),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    lineHeight: mvs(16),
    fontWeight: '600',
  },
  credit: {
    fontSize: mvs(27),
    color: color.Success[400],
    fontFamily: font.InterRegular,
    lineHeight: mvs(36),
    fontWeight: '600',
  },
  coinIcon: {
    width: ms(24),
    height: ms(24),
  },
  containerHelp: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: mvs(15),
  },
  valueText: {
    fontSize: mvs(13),
    color: color.Neutral[50],
    fontFamily: font.InterRegular,
    lineHeight: mvs(16),
    fontWeight: '500',
  },
  needHelp: {
    fontSize: mvs(13),
    marginBottom: mvs(3),
    color: color.Pink[2],
    fontFamily: font.InterRegular,
    lineHeight: mvs(16),
  },
  contact: {
    fontSize: mvs(12),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
    lineHeight: mvs(15),
  },
  separator: {
    width,
    height: 1,
    backgroundColor: color.Dark[500],
    marginTop: mvs(15),
  },
});
