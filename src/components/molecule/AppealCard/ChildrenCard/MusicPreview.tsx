import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {mvs} from 'react-native-size-matters';
import {Gap, SquareImage, SsuDivider} from '../../../atom';
import {PlayIcon} from '../../../../assets/icon';
import {color, font} from '../../../../theme';
import {widthResponsive} from '../../../../utils';

interface MusicPreviewAppealProps {
  title: string;
  musician: string;
  coverImage: string;
  duration: string;
  containerStyle?: ViewStyle;
}

const MusicPreviewAppeal: FC<MusicPreviewAppealProps> = (
  props: MusicPreviewAppealProps,
) => {
  const {title, musician, coverImage, duration, containerStyle} = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.imageContainer}>
        <SquareImage imgUri={coverImage} size={widthResponsive(80)} />
        <View style={styles.iconOnPress}>
          <PlayIcon stroke={color.Neutral[10]} />
        </View>
      </View>
      <Gap width={10} />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text numberOfLines={2} style={styles.songTitle}>
            {title}
          </Text>
          <Gap height={6} />
          <Text numberOfLines={1} style={styles.musicianName}>
            {musician}
          </Text>
        </View>
        <View style={styles.sliderStyle}>
          <SsuDivider
            lineStyle={{height: 2, backgroundColor: color.Dark[600]}}
          />
          <Gap height={3} />
          <View style={styles.progresTextContainer}>
            <Text style={styles.progresText}>0:00</Text>
            <Text style={styles.progresText}>{duration ?? '0:00'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MusicPreviewAppeal;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: color.RedVelvet[100],
    flexDirection: 'row',
    borderRadius: 4,
  },
  iconOnPress: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songTitle: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(13),
    color: color.Neutral[10],
    maxWidth: '100%',
  },
  musicianName: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(11),
    color: color.Dark[100],
    maxWidth: '75%',
  },
  sliderStyle: {
    width: '100%',
  },
  progresTextContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progresText: {
    fontFamily: font.InterRegular,
    fontWeight: '600',
    fontSize: mvs(10),
    color: color.Neutral[10],
  },
  imageContainer: {
    width: widthResponsive(80),
    height: widthResponsive(80),
    borderRadius: 4,
  },
});
