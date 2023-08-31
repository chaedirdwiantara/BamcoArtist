import {
  Dimensions,
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {elipsisText, widthResponsive} from '../../utils';
import {Gap, VoteCard} from '../../components';
import ImageList from '../ListCard/ImageList';
import MusicListPreview from '../../components/molecule/MusicPreview/MusicListPreview';
import {DetailPostData, PostList} from '../../interface/feed.interface';
import {color, font} from '../../theme';
import {mvs} from 'react-native-size-matters';
import VideoComp from '../../components/molecule/VideoPlayer/videoComp';
import ImageModal from '../Detail/ImageModal';
import {useVoteHook} from '../../hooks/use-vote.hook';

export const {width} = Dimensions.get('screen');

interface ChildrenCardProps {
  data: DetailPostData;
  onPress: (val: PostList) => void;
  isPlay: boolean;
  playOrPause: () => void;
  pauseModeOn: boolean;
  currentProgress: number;
  duration: number;
  seekPlayer: (second: number) => void;
  isIdNowPlaying: boolean;
  blurModeOn?: boolean;
}

const DetailChildrenCard: FC<ChildrenCardProps> = (
  props: ChildrenCardProps,
) => {
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
    blurModeOn,
  } = props;

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<number>(-1);

  const {voteIsLoading, voteIsError, dataVote, setVotePost} = useVoteHook();

  // ignore warning
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  const onPressPlaySong = (val: PostList) => {
    onPress?.(val);
  };

  const toggleModalOnPress = (index: number) => {
    setModalVisible(!isModalVisible);
    setImgUrl(index);
  };

  const toggleImageModal = () => {
    setImgUrl(-1);
    setModalVisible(!isModalVisible);
  };

  const dataPost: PostList = {
    id: data.id,
    caption: data.caption,
    likesCount: data.likesCount,
    commentsCount: data.commentsCount,
    category: data.category,
    images: data.images,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    isPremiumPost: data.isPremiumPost,
    musician: data.musician,
    isLiked: data.isLiked,
    quoteToPost: data.quoteToPost,
    video: data.video,
    timeAgo: data.timeAgo,
    viewsCount: data.viewsCount,
    shareCount: data.shareCount,
    isSubscribe: data.isSubscribe,
    isPolling: data.isPolling,
    pollingOptions: data.pollingOptions,
    pollDuration: data.pollDuration,
    pollCount: data.pollCount,
    isOwner: data.isOwner,
    isVoted: data.isVoted,
    pollTimeLeft: data.pollTimeLeft,
  };

  const setGiveVote = (optionId: string) => {
    setVotePost({postId: data.id, optionId: optionId});
  };

  const isCurrentVote = dataVote && dataVote.id === data.id;

  const pollingOptions = isCurrentVote
    ? dataVote?.pollingOptions
    : data.pollingOptions;
  const pollTimeLeft = isCurrentVote
    ? dataVote?.pollTimeLeft
    : data.pollTimeLeft;
  const pollCount = isCurrentVote ? dataVote?.pollCount : data.pollCount;
  const isOwner = isCurrentVote ? dataVote?.isOwner : data.isOwner;
  const isVoted = isCurrentVote ? dataVote?.isVoted : data.isVoted;

  return (
    <View style={{width: '100%'}}>
      <Text style={styles.childrenPostTitle}>
        {blurModeOn
          ? '[ You are not eligible to view this content, subscribe to view this content ]'
          : elipsisText(data.caption, 600)}
      </Text>
      {data.images !== null ? (
        <>
          <Gap height={8} />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: '100%',
                width: '100%',
              }}>
              <ImageList
                imgData={data.images}
                height={69.5}
                heightType2={142}
                onPress={blurModeOn ? () => {} : toggleModalOnPress}
                blurModeOn={blurModeOn}
                disabled={false}
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
                  postList={dataPost}
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
                    id={data.id}
                    dataVideo={data.video}
                    sourceUri={data.video.encodeHlsUrl}
                    onPress={() => {}}
                    buttonIconsStyle={{
                      position: 'absolute',
                      bottom: widthResponsive(-5),
                      width: width - widthResponsive(104),
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    videoContainer={{
                      width: '100%',
                      height: width - widthResponsive(150),
                    }}
                    blurModeOn={blurModeOn}
                  />
                </TouchableOpacity>
              )}
              {data.isPolling && (
                <VoteCard
                  pollingOptions={pollingOptions}
                  pollTimeLeft={pollTimeLeft}
                  pollCount={pollCount}
                  isOwner={isOwner}
                  isVoted={isVoted}
                  setGiveVote={setGiveVote}
                />
              )}
            </View>
          </View>
        </>
      ) : null}
      <ImageModal
        toggleModal={toggleImageModal}
        modalVisible={isModalVisible}
        imageIdx={imgUrl}
        dataImage={data?.images}
      />
    </View>
  );
};

export default DetailChildrenCard;

const styles = StyleSheet.create({
  childrenPostTitle: {
    flexShrink: 1,
    maxWidth: widthResponsive(288),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(13),
    color: color.Neutral[10],
    lineHeight: mvs(18.2),
  },
  videoStyle: {
    width: '100%',
    height: 300,
  },
});
