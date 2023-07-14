import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import {heightResponsive} from '../../../../utils';

const Merch = () => {
  const {t} = useTranslation();
  return (
    <View>
      <Text style={styles.textComp}>Merch</Text>
      <Text style={styles.emptyState}>{t('EmptyState.Merch')}</Text>
    </View>
  );
};

export default Merch;

const styles = StyleSheet.create({
  textComp: {
    fontFamily: font.InterRegular,
    fontSize: mvs(16),
    fontWeight: '600',
    color: color.Neutral[10],
  },
  emptyState: {
    color: color.Neutral[10],
    paddingVertical: heightResponsive(60),
    textAlign: 'center',
  },
});
