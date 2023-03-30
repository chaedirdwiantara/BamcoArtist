import {Slider} from '@miblanchard/react-native-slider';
import React, {createRef, FC, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';
import {
  CloseCircleIcon,
  NormalScreenIcon,
  PauseIcon2,
  PlayVideoIcon,
  VolumeIcon,
} from '../../../assets/icon';
import {useFeedHook} from '../../../hooks/use-feed.hook';
import {VideoResponseType} from '../../../interface/feed.interface';
import {color, font} from '../../../theme';
import {heightPercentage, widthResponsive} from '../../../utils';
import {timeToString} from '../../../utils/date-format';
import {Gap} from '../../atom';

export const {width} = Dimensions.get('screen');

interface VideoProps {
  toggleModal: () => void;
  modalVisible: boolean;
  sourceUri: string;
  buttonIconsStyle?: ViewStyle;
  videoContainer?: ViewStyle;
  blurModeOn?: boolean;
  dataVideo?: VideoResponseType;
  id?: string;
  currentTimeProp: number;
  modalCurrentTime: (data: number) => void;
}

const FullScreenVideo: FC<VideoProps> = (props: VideoProps) => {
  const {
    toggleModal,
    modalVisible,
    sourceUri,
    buttonIconsStyle,
    videoContainer,
    blurModeOn,
    dataVideo,
    id,
    currentTimeProp,
    modalCurrentTime,
  } = props;

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);

  const videoRef = createRef<any>();

  const {dataViewsCount, setViewCount} = useFeedHook();

  useEffect(() => {
    if (currentTimeProp) {
      onSeek(currentTimeProp), setIsPlaying(true);
    }
  }, [currentTimeProp]);

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
    if (!blurModeOn) {
      setIsPlaying(true), setPaused(false);
    }
  };

  const onEnd = () => {
    setCurrentTime(0);
    setPaused(true);
    setIsPlaying(false);
    if (id) {
      setViewCount({id: id});
    }
  };

  const handleClose = () => {
    toggleModal?.();
    modalCurrentTime(currentTime);
  };

  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={1}
      backdropColor={color.Dark[800]}
      style={{marginHorizontal: 0}}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      onBackButtonPress={handleClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerIcon}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <CloseCircleIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.mainContainer}>
          <View>
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
              <View style={styles.durationTimeTextCotainer}>
                <View style={styles.durationTimeText}>
                  <Text style={styles.durationText}>
                    {timeToString(duration)}
                  </Text>
                </View>
                <Gap width={7} />
                {dataVideo && (
                  <View style={styles.durationTimeText}>
                    <Text style={styles.durationText}>
                      {dataVideo.views} Views
                    </Text>
                  </View>
                )}
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
                <View
                  style={[styles.durationTimeTextPlaying, buttonIconsStyle]}>
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
                    <TouchableOpacity onPress={handleClose}>
                      <NormalScreenIcon />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default FullScreenVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginTop: heightPercentage(24),
    marginLeft: widthResponsive(24),
    marginBottom: widthResponsive(-50),
    zIndex: 10000,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  containerIcon: {
    zIndex: 10000,
  },
  videoStyle: {
    width: '100%',
    height: width,
  },
  uploadingText: {
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: 12,
    color: color.Neutral[10],
  },
  durationTimeTextCotainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: widthResponsive(12),
    left: widthResponsive(12),
  },
  durationTimeText: {
    backgroundColor: 'rgba(0, 0, 0,0.5)',
    paddingVertical: widthResponsive(4),
    paddingHorizontal: widthResponsive(2),
    borderRadius: 4,
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
    width: '100%',
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
