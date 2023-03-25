import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {createRef, FC, useState} from 'react';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import {widthResponsive} from '../../../utils';
import {Slider} from '@miblanchard/react-native-slider';
import {color, font} from '../../../theme';
import {timeToString} from '../../../utils/date-format';
import {
  CloseIcon,
  FullScreenIcon,
  PauseIcon2,
  PlayVideoIcon,
  VolumeIcon,
} from '../../../assets/icon';
import {ms} from 'react-native-size-matters';
import {Gap} from '../../atom';

export const {width} = Dimensions.get('screen');

interface VideoProps {
  sourceUri: string;
  withCloseIcon?: boolean;
  onPress: (uri: number) => void;
  dontShowText?: boolean;
  buttonIconsStyle?: ViewStyle;
  videoContainer?: ViewStyle;
}

const VideoComp: FC<VideoProps> = (props: VideoProps) => {
  const {
    sourceUri,
    onPress,
    withCloseIcon,
    dontShowText,
    buttonIconsStyle,
    videoContainer,
  } = props;

  const [duration, setDuration] = useState(0);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);

  const videoRef = createRef<any>();

  const onSeek = (data: number) => {
    videoRef.current.seek(data);
    setCurrentTime(data);
  };

  const onProgress = (data: OnProgressData) => {
    setCurrentTime(data.currentTime);
  };

  const onLoadEnd = (data: OnLoadData) => {
    setDuration(data.duration);
    setCurrentTime(data.currentTime);
  };

  const handlePlaying = () => {
    setPaused(false), setIsPlaying(true);
  };

  const onEnd = () => {
    setCurrentTime(0);
    setPaused(true);
    setIsPlaying(false);
  };

  return (
    <View>
      <View>
        {withCloseIcon && (
          <View style={styles.closeIcon}>
            <Text style={[styles.uploadingText]}>
              {dontShowText &&
                'Uploading is in progress, it will take few second'}
            </Text>
            <TouchableOpacity onPress={() => onPress(0)}>
              <CloseIcon stroke={color.Neutral[10]} />
            </TouchableOpacity>
          </View>
        )}
        <Video
          source={{
            uri: sourceUri,
          }}
          style={[styles.videoStyle, videoContainer]}
          ref={videoRef}
          volume={10}
          fullscreenAutorotate={true}
          playInBackground={false}
          paused={paused}
          resizeMode={'cover'}
          poster={sourceUri}
          onProgress={onProgress}
          onLoad={onLoadEnd}
          onEnd={onEnd}
          repeat={true}
          muted={mute}
          // fullscreen={fullScreen}
        />

        {!isPlaying && (
          <View style={styles.durationTimeText}>
            <Text style={styles.durationText}>{timeToString(duration)}</Text>
          </View>
        )}
        <View style={styles.playPausedVideo}>
          {paused && (
            <TouchableOpacity onPress={handlePlaying}>
              <PlayVideoIcon />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isPlaying && (
        <View>
          <Slider
            animateTransitions={true}
            animationType={'timing'}
            value={currentTime}
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor={color.Success[400]}
            maximumTrackTintColor={color.Dark[400]}
            thumbTintColor={color.Success[400]}
            onSlidingComplete={e => {
              const seekDuration = e as number[];
              onSeek(seekDuration[0]);
            }}
            thumbStyle={{width: 8, height: 8}}
            containerStyle={{
              marginTop: widthResponsive(-50),
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <View style={[styles.durationTimeTextPlaying, buttonIconsStyle]}>
              <TouchableOpacity
                onPress={() => setPaused(true)}
                style={{marginHorizontal: widthResponsive(10)}}>
                {!paused && <PauseIcon2 width={10} height={13} />}
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: widthResponsive(10),
                }}>
                <TouchableOpacity onPress={() => setMute(!mute)}>
                  <VolumeIcon />
                </TouchableOpacity>

                <Gap width={8} />
                <Text style={styles.durationText}>
                  {timeToString(duration - currentTime)}
                </Text>
                <Gap width={10} />
                <TouchableOpacity onPress={() => {}}>
                  <FullScreenIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default VideoComp;

const styles = StyleSheet.create({
  videoStyle: {
    width: '100%',
    height: width - widthResponsive(48),
  },
  closeIcon: {
    position: 'absolute',
    top: ms(8),
    zIndex: 10000,
    width: width - widthResponsive(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthResponsive(10),
  },
  uploadingText: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: 12,
    color: color.Neutral[10],
  },
  durationTimeText: {
    position: 'absolute',
    bottom: widthResponsive(16),
    left: widthResponsive(20),
  },
  playPausedVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationTimeTextPlaying: {
    position: 'absolute',
    bottom: widthResponsive(-5),
    width: width - widthResponsive(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  durationText: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: 12,
    color: color.Neutral[10],
  },
});
