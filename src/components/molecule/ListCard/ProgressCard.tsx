import React from 'react';
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {Gap} from '../../atom';
import {color, font} from '../../../theme';
import {width, widthPercentage} from '../../../utils';
import {CircularProgress} from '../../atom/CircularProgress';

export interface ProgressCardProps {
  percentage: string | undefined;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

export const ProgressCard: React.FC<ProgressCardProps> = (
  props: ProgressCardProps,
) => {
  const {t} = useTranslation();
  const {percentage = '0%', onPress, containerStyle} = props;
  const convertToNumber = parseFloat(percentage);

  return (
    <TouchableOpacity
      style={[styles.containerContent, containerStyle]}
      activeOpacity={onPress ? 0 : 1}
      onPress={onPress}>
      <CircularProgress percentage={convertToNumber} />
      <Gap width={widthPercentage(10)} />
      <View>
        <Text style={styles.title}>{t('ProfileProgress.Card.Title')}</Text>
        <Text style={styles.subtitle}>
          {t('ProfileProgress.Card.Subtitle')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerContent: {
    width: width * 0.9,
    paddingVertical: mvs(10),
    flexDirection: 'row',
    backgroundColor: '#223149',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: mvs(4),
  },
  title: {
    fontSize: mvs(14),
    fontFamily: font.InterMedium,
    fontWeight: '600',
    color: color.Neutral[10],
    maxWidth: width * 0.7,
  },
  subtitle: {
    fontSize: mvs(11),
    fontFamily: font.InterMedium,
    fontWeight: '500',
    color: '#718BBA',
    maxWidth: width * 0.7,
  },
});
