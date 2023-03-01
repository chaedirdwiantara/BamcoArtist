import TrackPlayer, {Event, RepeatMode, State} from 'react-native-track-player';
import {listenerLogSong} from '../api/playlist.api';
import {ListenerLogPropsType} from '../interface/playlist.interface';
import {usePlayerStore} from '../store/player.store';

let wasPausedByDuck = false;

export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('Event.RemotePlay');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log('Event.RemoteNext');
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log('Event.RemotePrevious');
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteJumpForward, async event => {
    console.log('Event.RemoteJumpForward', event);
    const position = (await TrackPlayer.getPosition()) + event.interval;
    TrackPlayer.seekTo(position);
  });

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async event => {
    console.log('Event.RemoteJumpBackward', event);
    const position = (await TrackPlayer.getPosition()) - event.interval;
    TrackPlayer.seekTo(position);
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, event => {
    console.log('Event.RemoteSeek', event);
    TrackPlayer.seekTo(event.position);
  });

  TrackPlayer.addEventListener(
    Event.RemoteDuck,
    async ({permanent, paused}) => {
      console.log('Event.RemoteDuck');
      if (permanent) {
        TrackPlayer.pause();
        return;
      }
      if (paused) {
        const playerState = await TrackPlayer.getState();
        wasPausedByDuck = playerState !== State.Paused;
        TrackPlayer.pause();
      } else {
        if (wasPausedByDuck) {
          TrackPlayer.play();
          wasPausedByDuck = false;
        }
      }
    },
  );

  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, event => {
    // console.log('Event.PlaybackQueueEnded', event);
  });

  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async event => {
    const currentIndex = await TrackPlayer.getCurrentTrack();
    if (currentIndex) {
      const track = await TrackPlayer.getTrack(currentIndex);
      let payload: ListenerLogPropsType = {
        songId: track?.id,
        start: '0',
        end: Math.round(event.position).toString(),
      };
      await listenerLogSong(payload);
    }
  });

  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async event => {
    const track = await TrackPlayer.getCurrentTrack();
    const isShuffle = usePlayerStore.getState().isShuffle;
    if (
      isShuffle &&
      event.duration - event.position < 1 &&
      track === event.track
    ) {
      try {
        const _repeat = await TrackPlayer.getRepeatMode();
        if (_repeat !== RepeatMode.Track) {
          const currentIndex = await TrackPlayer.getCurrentTrack();
          if (currentIndex !== null) {
            const queue = await TrackPlayer.getQueue();
            let nextIndex = currentIndex;
            while (nextIndex === currentIndex) {
              nextIndex = Math.floor(Math.random() * queue.length);
            }
            TrackPlayer.skip(nextIndex);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
}
