import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {Gap} from '../../../atom';
import MusicListPreview from '../../MusicPreview/MusicListPreview';
import {usePlayerHook} from '../../../../hooks/use-player.hook';
import {useFeedHook} from '../../../../hooks/use-feed.hook';
import {PostList, QuoteToPost} from '../../../../interface/feed.interface';

interface MostPlayedProps {
  uuidMusician: string;
}

const MostPlayed: FC<MostPlayedProps> = (props: MostPlayedProps) => {
  const {uuidMusician} = props;

  const {mostPlayedLoading, dataMostPlayed, mostPlayedError, getMostPlayed} =
    useFeedHook();

  const {
    seekPlayer,
    setPlaySong,
    setPauseSong,
    hidePlayer,
    isPlaying,
    playerProgress,
    addPlaylistFeed,
    addPlaylistMostPlayed,
  } = usePlayerHook();

  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [idNowPlaying, setIdNowPlaing] = useState<string>();

  useEffect(() => {
    getMostPlayed({
      id: uuidMusician,
    });
  }, [uuidMusician]);

  // ! MUSIC AREA
  const onPressPlaySong = (val: QuoteToPost[]) => {
    let data = val;
    addPlaylistMostPlayed({
      dataSong: data,
      playSongId: Number(dataMostPlayed?.targetId),
      isPlay: true,
    });
    setPlaySong();
    setPauseModeOn(true);
    setIdNowPlaing(val[0]?.targetId);
    hidePlayer();
  };

  const handlePausePlay = () => {
    if (isPlaying) {
      setPauseSong();
    } else {
      setPlaySong();
    }
  };
  // ! END OF MUSIC AREA

  return (
    <View>
      <Text style={styles.textComp}>Most Played</Text>
      <Gap height={16} />
      {dataMostPlayed && (
        <MusicListPreview
          hideClose
          targetId={dataMostPlayed.targetId}
          targetType={''}
          title={dataMostPlayed.title}
          musician={dataMostPlayed.musician}
          coverImage={
            // dataMostPlayed.imageUrl?.length !== null
            //   ? dataMostPlayed.imageUrl[0]?.image
            //   : ''
            ''
          }
          encodeDashUrl={dataMostPlayed.encodeDashUrl}
          encodeHlsUrl={dataMostPlayed.encodeHlsUrl}
          startAt={dataMostPlayed.startAt}
          endAt={dataMostPlayed.endAt}
          postList={dataMostPlayed}
          onPress={onPressPlaySong}
          isPlay={isPlaying}
          playOrPause={handlePausePlay}
          pauseModeOn={pauseModeOn}
          currentProgress={playerProgress.position}
          duration={playerProgress.duration}
          seekPlayer={seekPlayer}
          // isIdNowPlaying={isIdNowPlaying}
        />
      )}
      <Gap height={16} />
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
