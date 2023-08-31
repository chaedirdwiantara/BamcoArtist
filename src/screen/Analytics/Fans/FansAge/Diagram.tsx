import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import * as Progress from 'react-native-progress';
import {widthResponsive} from '../../../../utils';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../../../components';

interface DiagramProps {
  value: number;
  caption: string;
}

const Diagram: FC<DiagramProps> = (props: DiagramProps) => {
  const {value, caption} = props;
  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <Text style={styles.textOne}>{caption}</Text>
        <Text style={styles.textTwo}>{value}%</Text>
      </View>
      <Gap height={8} />
      <Progress.Bar
        progress={value / 100}
        width={null}
        height={widthResponsive(6)}
        animated={true}
        borderWidth={0}
        color={color.Pink[200]}
        unfilledColor={color.Dark[300]}
        borderRadius={0}
      />
    </View>
  );
};

export default Diagram;

const styles = StyleSheet.create({
  container: {
    marginBottom: widthResponsive(12),
  },
  topPart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textOne: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  textTwo: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    fontWeight: '500',
    color: color.Neutral[50],
  },
});
