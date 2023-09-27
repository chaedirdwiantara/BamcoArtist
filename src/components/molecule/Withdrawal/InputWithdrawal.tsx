import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  TextInput,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {Gap} from '../../atom';
import {color, font} from '../../../theme';
import {CoinDIcon, ErrorIcon} from '../../../assets/icon';
import {width, widthPercentage} from '../../../utils';

interface InputWithdrawalProps {
  totalCredit: string;
  setTotalCredit: (val: string) => void;
  containerStyles?: ViewStyle;
}

export const InputWithdrawal: React.FC<InputWithdrawalProps> = ({
  totalCredit,
  setTotalCredit,
  containerStyles,
}) => {
  const {t} = useTranslation();
  const [focusInput, setFocusInput] = useState<boolean>(false);

  // active border color, when focus is true
  const activeColor = focusInput ? color.Pink[200] : color.Dark[500];

  // minimum credit amount = 5000
  const isError = Number(totalCredit) < 5000 && Number(totalCredit) > 0;
  return (
    <View style={containerStyles}>
      <Text style={styles.textLabelInput}>
        {t('Withdrawal.InputWithdrawal.InputWithdrawalAmount')}
      </Text>
      <View style={[styles.containerInput, {borderColor: activeColor}]}>
        <View style={{width: '10%'}}>
          <CoinDIcon style={styles.coin} />
        </View>
        <TextInput
          style={styles.input}
          value={totalCredit}
          keyboardType={'number-pad'}
          textAlign="right"
          placeholder={t('Withdrawal.InputWithdrawal.InputAmount') || ''}
          placeholderTextColor={color.Dark[300]}
          onFocus={() => {
            setFocusInput(true);
          }}
          onBlur={() => {
            setFocusInput(false);
          }}
          onChangeText={value => {
            // only accept number without leading zeros
            if (value !== '0') setTotalCredit(value.replace(/[^0-9]/g, ''));
          }}
        />
      </View>
      {isError ? (
        <View style={styles.containerErrorMsg}>
          <ErrorIcon fill={color.Error[400]} />
          <Gap width={widthPercentage(4)} />
          <Text style={styles.errorMsg}>
            {t('Withdrawal.InputWithdrawal.ErrorMsg')}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  textLabelInput: {
    color: color.Dark[50],
    fontFamily: font.InterRegular,
    marginBottom: mvs(10),
    fontSize: mvs(12),
  },
  containerInput: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: mvs(1),
    paddingHorizontal: widthPercentage(15),
    paddingVertical: Platform.OS === 'ios' ? mvs(10) : 0,
    borderRadius: mvs(4),
  },
  input: {
    width: '90%',
    color: color.Neutral[10],
  },
  coin: {
    width: widthPercentage(18),
    height: mvs(18),
  },
  containerErrorMsg: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: mvs(4),
    alignItems: 'center',
  },
  errorMsg: {
    color: color.Error[400],
    fontFamily: font.InterRegular,
    fontSize: mvs(11),
    lineHeight: mvs(12),
    maxWidth: '90%',
  },
});
