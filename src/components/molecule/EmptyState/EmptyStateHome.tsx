import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import {mvs} from 'react-native-size-matters';

import {EmptyState} from './EmptyState';
import {color, font} from '../../../theme';
import {heightPercentage} from '../../../utils';
import HorizontalCard from '../ListCard/HorizontalCard';

export interface EmptyStateHomeProps {
  title: string;
  onPress: () => void;
  emptyText?: string;
  containerStyle?: ViewStyle;
}

const EmptyStateHome: React.FC<EmptyStateHomeProps> = (
  props: EmptyStateHomeProps,
) => {
  const {t} = useTranslation();
  const {title, emptyText, onPress, containerStyle} = props;

  const children = () => {
    return (
      <EmptyState
        text={emptyText ? emptyText : t('Home.ComingSoon.EmptyState')}
        containerStyle={styles.containerEmpty}
        textStyle={styles.emptyText}
        hideIcon={true}
      />
    );
  };

  return (
    <HorizontalCard
      title={title}
      children={children()}
      onPress={onPress}
      containerStyle={containerStyle}
    />
  );
};

export default EmptyStateHome;

const styles = StyleSheet.create({
  containerEmpty: {
    alignSelf: 'center',
    marginVertical: heightPercentage(30),
  },
  emptyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    textAlign: 'center',
    color: color.Neutral[10],
    lineHeight: mvs(16),
  },
});
