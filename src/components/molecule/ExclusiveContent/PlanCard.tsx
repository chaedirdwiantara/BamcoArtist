import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Text,
  View,
} from 'react-native';

import {color, typography} from '../../../theme';
import {RadioButton} from '../RadioButton/RadioButton';
import {heightPercentage, width, widthPercentage} from '../../../utils';
import {ErrorIcon} from '../../../assets/icon';
import {Gap} from '../../atom';
import {useTranslation} from 'react-i18next';

interface PlanCard {
  title: string;
  subtitle: string;
  coin: string;
  time: string;
  selected: boolean;
  isError?: boolean;
  onPressError?: () => void;
  onPressSelected: () => void;
  containerStyle?: ViewStyle;
}

export const PlanCard: React.FC<PlanCard> = ({
  title,
  subtitle,
  coin,
  time,
  selected,
  isError,
  onPressError,
  onPressSelected,
}) => {
  const {t} = useTranslation();
  const newBorderColor = selected ? color.Success[400] : color.Dark[500];
  return (
    <View>
      <TouchableOpacity
        style={[styles.root, {borderColor: newBorderColor}]}
        onPress={onPressSelected}>
        <View style={styles.containerTitle}>
          <RadioButton
            text={t(title)}
            selected={selected}
            onPress={onPressSelected}
          />
          <Text style={[typography.Subtitle2, {color: color.Success[400]}]}>
            {coin}
            {t(time)}
          </Text>
        </View>
        <View style={styles.subtitle}>
          <Text style={[typography.Caption, {color: color.Neutral[10]}]}>
            {subtitle}
          </Text>
        </View>
      </TouchableOpacity>

      {isError && (
        <View style={styles.containerCoin}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ErrorIcon fill={color.Error[400]} />
            <Gap width={widthPercentage(4)} />
            <Text style={[typography.Body4, {color: color.Error[400]}]}>
              {t('ExclusiveContent.ErrorCoinSubs')}
            </Text>
          </View>

          <TouchableOpacity onPress={onPressError}>
            <Text style={[typography.Body4, {color: color.Pink[2]}]}>
              + {t('Setting.Tips.Label.AddMoreCoin')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: width * 0.9,
    borderRadius: 5,
    borderWidth: heightPercentage(1),
    paddingHorizontal: widthPercentage(12),
    paddingVertical: heightPercentage(12),
    marginTop: heightPercentage(15),
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    flexDirection: 'row',
    marginTop: heightPercentage(10),
    marginLeft: widthPercentage(24),
  },
  containerCoin: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 4,
  },
});
