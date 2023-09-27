import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {Gap} from '../../atom';
import {ButtonStatus} from './ButtonStatus';
import {color, typography} from '../../../theme';
import {MenuText} from '../../atom/MenuText/MenuText';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {ChevronDownIcon, ChevronUp, CopyIcon} from '../../../assets/icon';

interface WithdrawalCardProps {
  transactionAmount: string;
  conversionAmount: string;
  idMusician: string;
  date: string;
  status: string;
  notes: string;
  onPress: () => void;
  isOpen?: boolean;
  containerStyle?: ViewStyle;
}

export const WithdrawalCard: React.FC<WithdrawalCardProps> = ({
  transactionAmount,
  conversionAmount,
  idMusician,
  date,
  status,
  notes,
  isOpen,
  onPress,
  containerStyle,
}) => {
  const {t} = useTranslation();
  const newStatus =
    status === 'reject'
      ? 'TopUp.Withdrawal.Status.Rejected'
      : status === 'approve'
      ? 'TopUp.Withdrawal.Status.Success'
      : 'TopUp.Withdrawal.Status.Pending';

  const listContent = [
    {
      title: 'TopUp.Withdrawal.TransactionAmount',
      text: transactionAmount,
    },
    {
      title: 'TopUp.Withdrawal.ConversionAmount',
      text: conversionAmount,
    },
    {
      title: 'TopUp.Withdrawal.To',
      text: idMusician,
    },
    {
      title: 'TopUp.Withdrawal.Date',
      text: date,
    },
    {
      title: 'TopUp.Transaction.Detail.Status',
      text: newStatus,
    },
    {
      title: 'TopUp.Withdrawal.Notes',
      text: notes,
    },
  ];

  // check if title = status
  const isStatus = 'TopUp.Transaction.Detail.Status';
  // change color when card is opened
  const borderColor = isOpen ? color.Dark[200] : color.Dark[500];
  return (
    <View>
      <TouchableOpacity
        style={[styles.root, {borderColor}, containerStyle]}
        onPress={onPress}>
        <Text style={[typography.Button2, {color: color.Neutral[10]}]}>
          {transactionAmount}
        </Text>
        <Gap height={heightPercentage(2)} />
        <Text style={[typography.Button2, {color: color.Neutral[10]}]}>
          {date}
        </Text>
        <ButtonStatus label={t(newStatus)} />
        {isOpen ? <ChevronUp /> : <ChevronDownIcon />}
      </TouchableOpacity>

      {isOpen ? (
        <View style={styles.containerContent}>
          {listContent.map((val, i) => (
            <View key={i}>
              <MenuText.Withdrawal
                title={t(val.title) || ''}
                text={isStatus ? t(val.text) : val.text}
                showIcon={val.title === 'TopUp.Withdrawal.To'}
                isButton={val.title === isStatus}
                icon={
                  <CopyIcon
                    width={widthPercentage(20)}
                    height={widthPercentage(20)}
                  />
                }
              />
              <View
                style={[
                  styles.separator,
                  {height: i === listContent.length - 1 ? 0 : 1},
                ]}
              />
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    borderWidth: heightPercentage(1),
    borderColor: color.Dark[500],
    paddingHorizontal: widthPercentage(20),
    paddingVertical: mvs(15),
    marginVertical: mvs(5),
  },
  containerContent: {
    width: width * 0.9,
    backgroundColor: color.Dark[700],
    borderWidth: heightPercentage(1),
    borderColor: color.Dark[500],
    borderRadius: 4,
    marginVertical: mvs(5),
    paddingTop: mvs(15),
    paddingHorizontal: mvs(15),
  },
  separator: {
    width: width * 0.8,
    height: 1,
    backgroundColor: color.Dark[500],
    marginVertical: mvs(10),
    alignSelf: 'center',
  },
});
