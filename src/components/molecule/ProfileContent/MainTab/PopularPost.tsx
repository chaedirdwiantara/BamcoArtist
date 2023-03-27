import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, font} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {ListCard} from '../../ListCard';
import {Gap} from '../../../atom';

const PopularPost = () => {
  return (
    <View>
      <Text style={styles.textComp}>Popular Post</Text>
      <Gap height={16} />
      {/* <ListCard.PostList
                  toDetailOnPress={() =>
                    handleToDetailMusician(item.musician.uuid)
                  }
                  musicianName={item.musician.fullname}
                  musicianId={`@${item.musician.username}`}
                  imgUri={
                    item.musician.imageProfileUrls.length !== 0
                      ? item.musician.imageProfileUrls[0]?.image
                      : ''
                  }
                  postDate={
                    item?.timeAgo ? item.timeAgo : dateFormat(item.createdAt)
                  }
                  postDate2={item.createdAt}
                  category={categoryNormalize(item.category)}
                  onPress={() => cardOnPress(item)}
                  likeOnPress={() => likeOnPress(item.id, item.isLiked)}
                  likePressed={
                    selectedId === undefined
                      ? item.isLiked
                      : selectedId.includes(item.id) &&
                        recorder.includes(item.id)
                      ? true
                      : !selectedId.includes(item.id) &&
                        recorder.includes(item.id)
                      ? false
                      : !selectedId.includes(item.id) &&
                        !recorder.includes(item.id)
                      ? item.isLiked
                      : item.isLiked
                  }
                  likeCount={
                    selectedId === undefined
                      ? item.likesCount
                      : selectedId.includes(item.id) &&
                        recorder.includes(item.id) &&
                        item.isLiked === true
                      ? item.likesCount
                      : selectedId.includes(item.id) &&
                        recorder.includes(item.id) &&
                        item.isLiked === false
                      ? item.likesCount + 1
                      : !selectedId.includes(item.id) &&
                        recorder.includes(item.id) &&
                        item.isLiked === true
                      ? item.likesCount - 1
                      : !selectedId.includes(item.id) &&
                        recorder.includes(item.id) &&
                        item.isLiked === false
                      ? item.likesCount
                      : item.likesCount
                  }
                  tokenOnPress={tokenOnPress}
                  shareOnPress={shareOnPress}
                  commentCount={item.commentsCount}
                  myPost={item.musician.uuid === MyUuid}
                  selectedMenu={setSelectedMenu}
                  idPost={item.id}
                  selectedIdPost={setSelectedIdPost}
                  isPremium={item.isPremiumPost}
                  children={
                    <ChildrenCard
                      data={item}
                      onPress={onPressPlaySong}
                      isPlay={isPlaying}
                      playOrPause={handlePausePlay}
                      pauseModeOn={pauseModeOn}
                      currentProgress={playerProgress.position}
                      duration={playerProgress.duration}
                      seekPlayer={seekPlayer}
                      isIdNowPlaying={item.id === idNowPlaying}
                    />
                  }
                /> */}
    </View>
  );
};

export default PopularPost;

const styles = StyleSheet.create({
  textComp: {
    fontFamily: font.InterRegular,
    fontSize: mvs(16),
    fontWeight: '600',
    color: color.Neutral[10],
  },
});
