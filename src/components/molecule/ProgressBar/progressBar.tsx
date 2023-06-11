import {Animated, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import * as Progress from 'react-native-progress';
import {widthResponsive} from '../../../utils';
import {color, font} from '../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../atom';
import Video from 'react-native-video';
import {useScrollStore} from '../../../store/translateY.store';

interface ProgressBarProps {
  progress: number;
  caption: string;
  uri?: string;
  containerStyles?: ViewStyle;
}

const ProgressBar: FC<ProgressBarProps> = (props: ProgressBarProps) => {
  const {progress, caption, uri, containerStyles} = props;

  const {compCTranslateY} = useScrollStore();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: compCTranslateY
            ? [{translateY: compCTranslateY}]
            : undefined,
        },
        containerStyles,
      ]}>
      <View style={styles.childContainer}>
        <Video
          source={{
            uri: uri,
          }}
          style={styles.videoStyle}
          paused={true}
          poster={uri}
          resizeMode={'cover'}
        />

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
    </Animated.View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: widthResponsive(-24),
    borderTopWidth: 1,
    borderTopColor: color.Dark[500],
    paddingTop: widthResponsive(8),
    marginBottom: widthResponsive(16),
    zIndex: 4,
    backgroundColor: color.Dark[800],
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
  videoStyle: {
    height: widthResponsive(32),
    width: widthResponsive(32),
  },
});
