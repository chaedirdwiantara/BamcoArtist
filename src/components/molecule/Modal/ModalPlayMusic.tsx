import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {Portal} from '@gorhom/portal';

import {
  elipsisText,
  heightPercentage,
  width,
  widthPercentage,
} from '../../../utils';
import {ListCard} from '../ListCard';
import {color} from '../../../theme';
import {storage} from '../../../hooks/use-storage.hook';
import {SetupService} from '../../../service/musicPlayer';
import {usePlayerHook} from '../../../hooks/use-player.hook';
import {CloseIcon, PauseIcon, PlayIcon} from '../../../assets/icon';

interface ModalPlayMusicProps {
  onPressModal: () => void;
}

export const ModalPlayMusic: React.FC<ModalPlayMusicProps> = ({
  onPressModal,
}) => {
  const {
    isPlaying,
    playerProgress,
    currentTrack,
    visible,
    hidePlayer,
    resetPlayer,
    setPauseSong,
    setPlaySong,
  } = usePlayerHook();

  useEffect(() => {
    async function run() {
      await SetupService();
    }

    run();
  }, []);

  const handleClose = async () => {
    hidePlayer();
    resetPlayer();
    storage.set('resetPlayer', true);
  };

  const handlePlayPaused = () => {
    if (isPlaying) {
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
          {isPlaying ? (
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

  const isWithoutBottomTab = storage.getBoolean('withoutBottomTab');
  const isWithoutBottomTabiOS = isWithoutBottomTab ? 0 : 84;
  const isWithoutBottomTabAndroid = isWithoutBottomTab ? 0 : 64;
  const bottom =
    Platform.OS === 'ios' ? isWithoutBottomTabiOS : isWithoutBottomTabAndroid;

  return (
    <Portal>
      <View style={[styles.root, {display: visible ? 'flex' : 'none', bottom}]}>
        <ListCard.MusicList
          rightIcon={true}
          rightIconComponent={<RightIcon />}
          onPressIcon={() => null}
          imgUri={(currentTrack?.artwork as string) ?? null}
          musicTitle={elipsisText(currentTrack?.title ?? '', 22)}
          singerName={currentTrack?.artist ?? ''}
          onPressCard={onPressModal}
        />
      </View>
      <View
        style={[
          styles.containerLine,
          {display: visible ? 'flex' : 'none', bottom},
        ]}>
        <View
          style={[
            styles.greenLine,
            {
              width: `${
                (playerProgress.position / playerProgress.duration) * 100
              }%`,
            },
          ]}
        />
        <View
          style={[
            styles.grayLine,
            {
              width: `${
                100 - (playerProgress.position / playerProgress.duration) * 100
              }%`,
            },
          ]}
        />
      </View>
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
