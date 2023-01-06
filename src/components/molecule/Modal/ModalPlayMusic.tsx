import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {Portal} from '@gorhom/portal';
import Video from 'react-native-video';

import {
  elipsisText,
  heightPercentage,
  width,
  widthPercentage,
} from '../../../utils';
import {ListCard} from '../ListCard';
import {CloseIcon, PauseIcon, PlayIcon} from '../../../assets/icon';
import {color} from '../../../theme';
import {usePlayerHook} from '../../../hooks/use-player.hook';

interface ModalPlayMusicProps {
  onPressModal: () => void;
}

export const ModalPlayMusic: React.FC<ModalPlayMusicProps> = ({
  onPressModal,
}) => {
  const {
    musicData,
    visible: playerShow,
    currentProgress,
    duration,
    isPlay,
    setPlayerRef,
    hidePlayer,
    setDurationPlayer,
    setProgressPlayer,
    setPauseSong,
    setPlaySong,
  } = usePlayerHook();
  const playRef = useRef<Video | null>(null);

  useEffect(() => {
    if (playRef) {
      setPlayerRef(playRef);
    }
  }, [playRef]);

  const handleClose = () => {
    hidePlayer();
    setPauseSong();
  };

  const handlePlayPaused = () => {
    if (isPlay) {
      setPauseSong();
    } else {
      setPlaySong();
    }
  };

  const RightIcon = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={handlePlayPaused}>
          {isPlay ? (
            <PauseIcon fill={'#FFFFFF'} stroke={'#FFFFFF'} />
          ) : (
            <PlayIcon fill={'#FFFFFF'} stroke={'#FFFFFF'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: 30, marginRight: 20}}
          onPress={handleClose}>
          <CloseIcon
            width={widthPercentage(25)}
            height={widthPercentage(25)}
            fill={'#FFFFFF'}
            stroke={'#FFFFFF'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Portal>
      <View style={[styles.root, {display: playerShow ? 'flex' : 'none'}]}>
        <ListCard.MusicList
          rightIcon={true}
          rightIconComponent={<RightIcon />}
          onPressIcon={() => null}
          imgUri={musicData.albumImg}
          musicTitle={elipsisText(musicData.title, 22)}
          singerName={musicData.artist}
          onPressCard={onPressModal}
        />
      </View>
      <View
        style={[styles.containerLine, {display: playerShow ? 'flex' : 'none'}]}>
        <View
          style={[
            styles.greenLine,
            {width: `${(currentProgress / duration) * 100}%`},
          ]}
        />
        <View
          style={[
            styles.grayLine,
            {width: `${100 - (currentProgress / duration) * 100}%`},
          ]}
        />
      </View>
      <Video
        ref={playRef}
        source={{
          uri: 'https://storage.googleapis.com/media-ssu/uploads/22222/encoded/190ecdcb42f4/master.m3u8',
        }}
        onLoad={e => {
          setDurationPlayer(e.duration);
        }}
        onProgress={e => {
          setProgressPlayer(e.currentTime);
        }}
        paused={!isPlay}
        onEnd={() => {
          setPauseSong();
        }}
      />
    </Portal>
  );
};

const styles = StyleSheet.create({
  root: {
    width,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 84 : 64,
    alignItems: 'center',
    backgroundColor: '#3D1034',
    paddingHorizontal: widthPercentage(15),
    paddingVertical: heightPercentage(10),
  },
  containerLine: {
    width: '100%',
    height: heightPercentage(2),
    flexDirection: 'row',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 84 : 64,
  },
  greenLine: {
    height: heightPercentage(2),
    backgroundColor: color.Success[400],
  },
  grayLine: {
    height: heightPercentage(2),
    backgroundColor: color.Dark[400],
  },
});
