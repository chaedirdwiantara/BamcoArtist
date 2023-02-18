import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  heightPercentage,
  normalize,
  widthPercentage,
  kFormatter,
} from '../../../utils';
import {Gap} from '../../atom';
import {color, font} from '../../../theme';
import {DonateCoinIcon} from '../../../assets/icon';
import {mvs} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';

interface ListenersAndDonateProps {
  totalListener: number;
  onPress: () => void;
}

export const ListenersAndDonate: React.FC<ListenersAndDonateProps> = ({
  totalListener,
  onPress,
}) => {
  const {t} = useTranslation();
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <View style={styles.containerContent}>
        <Text style={styles.totalListener}>{kFormatter(totalListener)}</Text>
        <Gap width={widthPercentage(5)} />
        <Text style={styles.textListener}>{t('General.Listeners')}</Text>
      </View>
      <DonateCoinIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentage(12),
    marginTop: heightPercentage(20),
  },
  containerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalListener: {
    fontSize: mvs(13),
    color: color.Neutral[10],
    fontFamily: font.InterRegular,
  },
  textListener: {
    fontSize: mvs(12),
    color: color.Dark[50],
    fontFamily: font.InterRegular,
  },
});
