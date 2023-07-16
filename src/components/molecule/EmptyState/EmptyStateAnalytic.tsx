import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {widthResponsive} from '../../../utils';

interface EmptyStateProps {
  caption: string;
}

const EmptyStateAnalytic: FC<EmptyStateProps> = (props: EmptyStateProps) => {
  const {caption} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.emptyState}>{caption}</Text>
    </View>
  );
};

export default EmptyStateAnalytic;

const styles = StyleSheet.create({
  container: {
    height: widthResponsive(188),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '400',
    color: color.Neutral[10],
    lineHeight: mvs(14.52),
    textAlign: 'center',
  },
});
