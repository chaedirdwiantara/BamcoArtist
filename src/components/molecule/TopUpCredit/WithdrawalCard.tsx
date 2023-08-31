import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
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
  const listContent = [
    {
      title: 'Transaction Amount',
      text: transactionAmount,
    },
    {
      title: 'Conversion Amount',
      text: conversionAmount,
    },
    {
      title: 'To',
      text: idMusician,
    },
    {
      title: 'Date',
      text: date,
    },
    {
      title: 'Transaction status',
      text: status,
    },
    {
      title: 'Notes',
      text: notes,
    },
  ];

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
        <ButtonStatus label={status} />
        {isOpen ? <ChevronUp /> : <ChevronDownIcon />}
      </TouchableOpacity>

      {isOpen ? (
        <View style={styles.containerContent}>
          {listContent.map((val, i) => (
            <View key={i}>
              <MenuText.Withdrawal
                title={val.title}
                text={val.text}
                showIcon={val.title === 'To'}
                isButton={val.title === 'Transaction status'}
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
