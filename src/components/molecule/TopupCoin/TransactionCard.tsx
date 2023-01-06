import React from 'react';
import {StyleSheet, View, Text, ViewStyle} from 'react-native';

import {Gap} from '../../atom';
import {color, typography} from '../../../theme/';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface TransactionCardProps {
  title: string;
  date: string;
  containerStyle?: ViewStyle;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  title,
  date,
  containerStyle,
}) => {
  return (
    <View style={[styles.root, containerStyle]}>
      <Text style={[typography.Button2, {color: color.Neutral[10]}]}>
        {title}
      </Text>
      <Gap height={heightPercentage(2)} />
      <Text style={[typography.Overline, {color: color.Success[400]}]}>
        {date}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: width * 0.9,
    borderRadius: 4,
    borderWidth: heightPercentage(1),
    borderColor: color.Dark[500],
    paddingHorizontal: widthPercentage(20),
    paddingVertical: heightPercentage(15),
    marginTop: heightPercentage(20),
  },
});
