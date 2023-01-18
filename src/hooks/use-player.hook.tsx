import React from 'react';
import Video from 'react-native-video';
import {SongList} from '../interface/song.interface';
import {usePlayerStore} from '../store/player.store';

export const usePlayerHook = () => {
  const playerStore = usePlayerStore();

  const setPlayerRef = (ref: React.MutableRefObject<Video | null>) => {
    playerStore.setPlayerRef(ref);
  };

  const setMusicDataPlayer = ({
    id,
    title,
    artist,
    albumImg,
    musicUrl,
    musicianId,
  }: {
    id: number;
    title: string;
    artist: string;
    albumImg: string | null;
    musicUrl: string;
    musicianId: string;
  }) => {
    playerStore.setMusicData({
      id,
      title,
      artist,
      albumImg,
      musicUrl,
      musicianId,
    });
  };

  const showPlayer = () => {
    playerStore.setShow(true);
    setPlaySong();
  };

  const hidePlayer = () => {
    playerStore.setShow(false);
  };

  const setDurationPlayer = (duration: number) => {
    playerStore.setDuration(duration);
  };

  const setProgressPlayer = (progress: number) => {
    playerStore.setCurrentProgress(progress);
  };

  const setPlaySong = () => {
    playerStore.setPlay(true);
  };

  const setPauseSong = () => {
    playerStore.setPlay(false);
  };

  const seekPlayer = (second: number) => {
    playerStore.playerRef?.current?.seek(second);
  };

  const setPlaylistSong = (props: SongList[]) => {
    playerStore.setPlaylist(props);
  };

  const getShuffleTrack = (): number => {
    let randomIndex = Math.abs(
      Math.floor(Math.random() * playerStore.playlist.length - 1),
    );
    let idShuffle = playerStore.playlist[randomIndex].id;
    if (idShuffle === playerStore.musicData.id) {
      if (
        idShuffle < playerStore.playlist[playerStore.playlist.length - 1].id
      ) {
        idShuffle = idShuffle + 1;
        return idShuffle;
      } else {
        idShuffle = playerStore.playlist[0].id;
        return idShuffle;
      }
    } else {
      return idShuffle;
    }
  };

  const setNextPrevTrack = (type: 'next' | 'prev') => {
    let newSong: SongList | null = null;
    if (type === 'next') {
      if (playerStore.isShuffle) {
        // newSong = playerStore.playlist.filter(
        //   ar => ar.id === getShuffleTrack(),
        // )[0];
        // TODO: need to be fixed for getting the logic on shuffle
        newSong = playerStore.playlist.filter(
          ar => ar.id > playerStore.musicData.id,
        )[0];
      } else if (
        playerStore.musicData.id <
        playerStore.playlist[playerStore.playlist.length - 1].id
      ) {
        newSong = playerStore.playlist.filter(
          ar => ar.id > playerStore.musicData.id,
        )[0];
      } else {
        newSong = playerStore.playlist[0];
      }
    } else {
      if (playerStore.isShuffle) {
        newSong = playerStore.playlist.filter(
          ar => ar.id === getShuffleTrack(),
        )[0];
      } else if (playerStore.musicData.id > playerStore.playlist[0].id) {
        newSong = playerStore.playlist.filter(
          ar => ar.id === playerStore.musicData.id - 1,
        )[0];
      } else {
        newSong = playerStore.playlist[playerStore.playlist.length - 1];
      }
    }

    setMusicDataPlayer({
      id: newSong.id,
      title: newSong.title,
      artist: newSong.musicianName,
      albumImg: newSong.imageUrl,
      musicUrl: newSong.transcodedSongUrl[1].encodedHlsUrl,
      musicianId: newSong.musicianId,
    });
  };

  const setShufflePlayer = (props: boolean) => {
    playerStore.setShuffle(props);
  };

  const setRepeatPlayer = (props: 'off' | 'one' | 'all') => {
    playerStore.setRepeat(props);
  };

  return {
    playerRef: playerStore.playerRef,
    musicData: playerStore.musicData,
    visible: playerStore.show,
    duration: playerStore.duration,
    currentProgress: playerStore.currentProgress,
    isPlay: playerStore.play,
    playlist: playerStore.playlist,
    isShuffle: playerStore.isShuffle,
    repeat: playerStore.repeat,
    setPlayerRef,
    setMusicDataPlayer,
    showPlayer,
    hidePlayer,
    setDurationPlayer,
    setProgressPlayer,
    setPlaySong,
    setPauseSong,
    seekPlayer,
    setPlaylistSong,
    setNextPrevTrack,
    setShufflePlayer,
    setRepeatPlayer,
  };
};
