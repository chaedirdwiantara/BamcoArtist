import TrackPlayer, {
  Track,
  TrackType,
  usePlaybackState,
  State,
  useProgress,
  Event,
  useTrackPlayerEvents,
  RepeatMode,
} from 'react-native-track-player';
import {SongList} from '../interface/song.interface';
import {usePlayerStore} from '../store/player.store';

export const usePlayerHook = () => {
  const playerStore = usePlayerStore();
  const playerState = usePlaybackState();
  const isPlaying = playerState === State.Playing;
  const isPaused = playerState === State.Paused;
  const isConnecting = playerState === State.Connecting;
  const isBuffering = playerState === State.Buffering;
  const playerProgress = useProgress();

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      playerStore.setCurrentTrack(track);
    }
  });

  const addSong = async (val: SongList) => {
    const track: Track = {
      url: val.transcodedSongUrl[1].encodedHlsUrl,
      title: val.title,
      artist: val.musicianName,
      type: TrackType.HLS,
      artwork: val.imageUrl ? val.imageUrl : undefined,
      id: val.id,
      musicianId: val.musicianId,
    };
    await TrackPlayer.add(track);
  };

  const addPlaylist = async ({
    dataSong,
    playSongId,
    isPlay = false,
  }: {
    dataSong: SongList[];
    playSongId?: number;
    isPlay?: boolean;
  }) => {
    try {
      await TrackPlayer.reset();
      const track: Track[] = dataSong
        .filter(ar => ar.id !== 14)
        .map(item => {
          return {
            url: item.transcodedSongUrl[1].encodedHlsUrl,
            title: item.title,
            artist: item.musicianName,
            type: TrackType.HLS,
            artwork: item.imageUrl ? item.imageUrl : undefined,
            id: item.id,
            musicianId: item.musicianId,
          };
        });
      if (playSongId) {
        let indexPlaySong = track.findIndex(ar => ar.id === playSongId);
        if (indexPlaySong > -1) {
          let newTrack = track.splice(indexPlaySong);
          newTrack = newTrack.concat(track.splice(0, indexPlaySong));
          await TrackPlayer.add(newTrack);
          if (isPlay) {
            setPlaySong();
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showPlayer = () => {
    playerStore.setShow(true);
    setPlaySong();
  };

  const hidePlayer = () => {
    playerStore.setShow(false);
  };

  const setPlaySong = () => {
    TrackPlayer.play();
  };

  const setPauseSong = () => {
    TrackPlayer.pause();
  };

  const seekPlayer = (second: number) => {
    TrackPlayer.seekTo(second);
  };

  const resetPlayer = async () => {
    await TrackPlayer.reset();
  };

  const setPlaylistSong = (props: SongList[]) => {
    playerStore.setPlaylist(props);
  };

  const setNextPrevTrack = async (type: 'next' | 'prev') => {
    try {
      const track = await TrackPlayer.getCurrentTrack();
      const queue = await TrackPlayer.getQueue();
      let isShuffle = playerStore.isShuffle;
      if (isShuffle) {
        let nextTrack = track;
        while (nextTrack === track) {
          nextTrack = Math.floor(Math.random() * (queue.length - 1));
        }
        console.log('nextTrack', nextTrack);
        if (nextTrack) {
          await TrackPlayer.skip(nextTrack);
        }
      } else {
        if (type === 'next') {
          if (track === queue.length - 1) {
            await TrackPlayer.skip(0);
          } else {
            await TrackPlayer.skipToNext();
          }
        } else if (type === 'prev') {
          if (track === 0) {
            await TrackPlayer.skip(queue.length - 1);
          } else {
            await TrackPlayer.skipToPrevious();
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setShufflePlayer = (props: boolean) => {
    playerStore.setShuffle(props);
  };

  const getRepeatPlayer = async (): Promise<RepeatMode> => {
    let _repeat = RepeatMode.Off;
    try {
      const res = await TrackPlayer.getRepeatMode();
      _repeat = res;
    } catch (err) {
      console.log(err);
    } finally {
      return _repeat;
    }
  };

  const setRepeatPlayer = (props: RepeatMode, callback?: () => void) => {
    try {
      TrackPlayer.setRepeatMode(props);
    } catch (err) {
      console.log(err);
    } finally {
      if (callback) {
        callback();
      }
    }
  };

  return {
    playerRef: playerStore.playerRef,
    visible: playerStore.show,
    playlist: playerStore.playlist,
    isShuffle: playerStore.isShuffle,
    repeat: RepeatMode,
    isPlaying,
    isPaused,
    isConnecting,
    isBuffering,
    playerProgress,
    currentTrack: playerStore.currentTrack,
    addSong,
    addPlaylist,
    showPlayer,
    hidePlayer,
    setPlaySong,
    setPauseSong,
    seekPlayer,
    resetPlayer,
    setPlaylistSong,
    setNextPrevTrack,
    setShufflePlayer,
    getRepeatPlayer,
    setRepeatPlayer,
  };
};
