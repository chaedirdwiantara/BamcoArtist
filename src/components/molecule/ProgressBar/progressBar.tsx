import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import * as Progress from 'react-native-progress';
import {heightResponsive, widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap, SquareImage} from '../../atom';

interface ProgressBarProps {
  progress: number;
  caption: string;
  uri?: string;
}

const ProgressBar: FC<ProgressBarProps> = (props: ProgressBarProps) => {
  const {progress, caption, uri} = props;

  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <SquareImage size={32} imgUri={uri} />
        <Gap width={8} />
        <Text style={styles.textStyles}>{caption}</Text>
      </View>

      <Progress.Bar
        progress={progress}
        width={widthResponsive(375)}
        height={widthResponsive(2)}
        animated={true}
        borderWidth={0}
        color={color.Pink[200]}
        unfilledColor={color.Dark[300]}
        borderRadius={0}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: widthResponsive(-24),
    borderTopWidth: 1,
    borderTopColor: color.Dark[500],
    paddingTop: widthResponsive(8),
    marginBottom: widthResponsive(16),
  },
  childContainer: {
    flexDirection: 'row',
    paddingHorizontal: widthResponsive(24),
    marginBottom: widthResponsive(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyles: {
    fontFamily: font.InterRegular,
    fontSize: mvs(12),
    fontWeight: '400',
    color: color.Neutral[10],
  },
});
