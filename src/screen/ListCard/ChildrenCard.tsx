import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef, FC} from 'react';
import {elipsisText, widthResponsive} from '../../utils';
import {Gap} from '../../components';
import ImageList from './ImageList';
import MusicListPreview from '../../components/molecule/MusicPreview/MusicListPreview';
import {PostList} from '../../interface/feed.interface';
import {color, font} from '../../theme';
import {mvs} from 'react-native-size-matters';
import Video from 'react-native-video';
import VideoComp from '../../components/molecule/VideoPlayer/videoComp';

export const {width} = Dimensions.get('screen');

interface ChildrenCardProps {
  data: PostList;
  onPress: (val: PostList) => void;
  isPlay: boolean;
  playOrPause: () => void;
  pauseModeOn: boolean;
  currentProgress: number;
  duration: number;
  seekPlayer: (second: number) => void;
  isIdNowPlaying: boolean;
}

const ChildrenCard: FC<ChildrenCardProps> = (props: ChildrenCardProps) => {
  const {
    data,
    onPress,
    isPlay,
    playOrPause,
    pauseModeOn,
    currentProgress,
    duration,
    seekPlayer,
    isIdNowPlaying,
  } = props;

  const onPressPlaySong = (val: PostList) => {
    onPress?.(val);
  };

  return (
    <View style={{width: '100%'}}>
      <Text style={styles.childrenPostTitle}>
        {elipsisText(data.caption, 600)}
      </Text>
      {data.images !== null ? (
        <>
          <Gap height={6} />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{height: '100%', width: '100%'}}>
              <ImageList
                imgData={data.images}
                width={143}
                height={69.5}
                heightType2={142}
                widthType2={289}
                onPress={() => {}}
              />
              {data.images.length === 0 && data.quoteToPost.encodeHlsUrl ? (
                <MusicListPreview
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
                />
              ) : null}
              {data.video.encodeHlsUrl !== '' && (
                <TouchableOpacity>
                  <VideoComp
                    sourceUri={data.video.encodeHlsUrl}
                    onPress={() => {}}
                    buttonIconsStyle={{
                      position: 'absolute',
                      bottom: widthResponsive(-5),
                      width: width - widthResponsive(84),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    videoContainer={{
                      width: '100%',
                      height: width - widthResponsive(84),
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default ChildrenCard;

const styles = StyleSheet.create({
  childrenPostTitle: {
    flexShrink: 1,
    maxWidth: widthResponsive(288),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(13),
    color: color.Neutral[10],
  },
  videoStyle: {
    width: '100%',
    height: 300,
  },
});
