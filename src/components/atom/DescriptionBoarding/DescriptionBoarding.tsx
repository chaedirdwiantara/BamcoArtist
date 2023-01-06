import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {mvs} from 'react-native-size-matters';
import Color from '../../../theme/Color';
import {widthPercentage} from '../../../utils';
import Typography from '../../../theme/Typography';

interface Props {
  title?: string;
  subtitle?: string;
}

const DescriptionBoarding: React.FC<Props> = ({title, subtitle}) => {
  return (
    <View style={styles.root}>
      <Text style={[Typography.Heading4, styles.title]}>{title}</Text>
      <Text style={[Typography.Body2, styles.subtitle]}>{subtitle}</Text>
    </View>
  );
};

export default DescriptionBoarding;

const styles = StyleSheet.create({
  root: {
    maxWidth: widthPercentage(287),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  title: {
    color: Color.Neutral[10],
    textAlign: 'center',
    marginTop: mvs(10),
  },
  subtitle: {
    color: Color.Neutral[10],
    textAlign: 'center',
    marginTop: mvs(10),
    marginVertical: mvs(15),
  },
});
