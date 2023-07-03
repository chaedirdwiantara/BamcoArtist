import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {widthResponsive} from '../../../../utils';
import {color, font} from '../../../../theme';
import {Gap} from '../../../../components';
import {mvs} from 'react-native-size-matters';

interface GenderPercentProps {
  bgColor: string;
  caption: string;
}

const GenderPercent: FC<GenderPercentProps> = (props: GenderPercentProps) => {
  const {bgColor, caption} = props;
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.genderColor,
          {backgroundColor: bgColor ?? color.Pink[200]},
        ]}
      />
      <Gap width={8} />
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
};

export default GenderPercent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderColor: {
    width: widthResponsive(16),
    height: widthResponsive(16),
    borderRadius: 2,
  },
  caption: {
    color: color.Neutral[10],
    fontSize: mvs(11),
    fontFamily: font.InterRegular,
    fontWeight: '500',
  },
});
