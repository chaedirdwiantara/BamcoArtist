import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../../atom';
import MusicListPreview from '../../MusicPreview/MusicListPreview';

const MostPlayed = () => {
  return (
    <View>
      <Text style={styles.textComp}>Most Played</Text>
      <Gap height={16} />
      {/* <MusicListPreview
                  hideClose
                  targetId={data.quoteToPost.targetId}
                  targetType={data.quoteToPost.targetType}
                  title={data.quoteToPost.title}
                  musician={data.quoteToPost.musician}
                  coverImage={
                    data.quoteToPost.coverImage[1]?.image !== undefined
                      ? data.quoteToPost.coverImage[1].image
                      : ''
                  }
                  encodeDashUrl={data.quoteToPost.encodeDashUrl}
                  encodeHlsUrl={data.quoteToPost.encodeHlsUrl}
                  startAt={data.quoteToPost.startAt}
                  endAt={data.quoteToPost.endAt}
                  postList={data}
                  onPress={onPressPlaySong}
                  isPlay={isPlay}
                  playOrPause={playOrPause}
                  pauseModeOn={pauseModeOn}
                  currentProgress={currentProgress}
                  duration={duration}
                  seekPlayer={seekPlayer}
                  isIdNowPlaying={isIdNowPlaying}
                /> */}
    </View>
  );
};

export default MostPlayed;

const styles = StyleSheet.create({
  textComp: {
    fontFamily: font.InterRegular,
    fontSize: mvs(16),
    fontWeight: '600',
    color: color.Neutral[10],
  },
});
