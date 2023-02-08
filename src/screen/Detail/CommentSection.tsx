import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import {elipsisText, heightResponsive, widthResponsive} from '../../utils';
import {Gap, PostComment} from '../../components';
import CommentLvlTwo from '../../components/molecule/DetailPost/CommentLvlTwo';
import CommentLvlThree from '../../components/molecule/DetailPost/CommentLvlThree';
import {color, font} from '../../theme';
import {
  CommentList,
  CommentList2,
  CommentList3,
} from '../../interface/feed.interface';
import {ms, mvs} from 'react-native-size-matters';
import {filterParentID} from './function';
import {DataDropDownType} from '../../data/dropdown';
interface CommentSectionType {
  postCommentCount: number;
  postId: string;
  onComment: ({
    id,
    userName,
    commentLvl,
    parentID,
  }: {
    id: string;
    userName: string;
    commentLvl: number;
    parentID: string;
  }) => void;
  onLike?: (id: string) => void;
  onUnlike?: (id: string) => void;
  onViewMore: (id: string) => void;
  onSetPage: (value: number) => void;
  dataLvl1: CommentList[] | undefined;
  dataLvl2: CommentList2[] | undefined;
  dataLvl3: CommentList3[] | undefined;
  toDetailOnPress: (id: string) => void;
  selectedMenu: (value: DataDropDownType) => void;
  selectedIdComment: (idComment: string) => void;
  selectedLvlComment: (lvl: number) => void;
  profileUUID: string;
}

const CommentSection: FC<CommentSectionType> = (props: CommentSectionType) => {
  const {
    dataLvl1,
    dataLvl2,
    dataLvl3,
    onComment,
    onViewMore,
    onSetPage,
    onLike,
    onUnlike,
    postCommentCount,
    postId,
    toDetailOnPress,
    selectedMenu,
    selectedIdComment,
    selectedLvlComment,
    profileUUID,
  } = props;
  const [recorder, setRecorder] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>();

  const likeOnPress = (id: string, isLiked: boolean) => {
    if (isLiked === true && selectedId === undefined) {
      onUnlike?.(id);
      setSelectedId([]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (!isLiked && selectedId === undefined) {
      onLike?.(id);
      setSelectedId([id]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === true &&
      !selectedId?.includes(id) &&
      !recorder.includes(id)
    ) {
      onUnlike?.(id);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === false &&
      !selectedId?.includes(id) &&
      !recorder.includes(id)
    ) {
      onLike?.(id);
      setSelectedId(selectedId ? [...selectedId, id] : [id]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === true &&
      !selectedId?.includes(id) &&
      recorder.includes(id)
    ) {
      onLike?.(id);
      setSelectedId(selectedId ? [...selectedId, id] : [id]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === false &&
      !selectedId?.includes(id) &&
      recorder.includes(id)
    ) {
      onLike?.(id);
      setSelectedId(selectedId ? [...selectedId, id] : [id]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (isLiked === true && selectedId?.includes(id) && recorder.includes(id)) {
      onUnlike?.(id);
      setSelectedId(selectedId.filter((x: string) => x !== id));
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === false &&
      selectedId?.includes(id) &&
      recorder.includes(id)
    ) {
      onUnlike?.(id);
      setSelectedId(selectedId.filter((x: string) => x !== id));
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
  };

  const commentOnPress = (
    id: string,
    userName: string,
    commentLvl: number,
    parentID: string,
  ) => {
    onComment?.({id, userName, commentLvl, parentID});
  };

  const handleToDetail = (id: string) => {
    toDetailOnPress?.(id);
  };

  const viewMoreOnPress = (id: string, value: number) => {
    onViewMore?.(id);
    onSetPage?.(value);
  };

  const handleSelectedLvl1 = (value: DataDropDownType) => {
    selectedMenu(value);
    selectedLvlComment?.(1);
  };

  const handleSelectedLvl2 = (value: DataDropDownType) => {
    selectedMenu(value);
    selectedLvlComment?.(2);
  };

  const handleSelectedLvl3 = (value: DataDropDownType) => {
    selectedMenu(value);
    selectedLvlComment?.(3);
  };

  const CommentChildrenLvl3 = (props: CommentList3) => {
    const {
      id,
      caption,
      likesCount,
      commentsCount,
      repliedTo,
      isLiked,
      timeAgo,
      commentOwner,
      commentLevel,
      parentID,
    } = props;
    return (
      <CommentLvlThree
        toDetailOnPress={() => handleToDetail(commentOwner.UUID)}
        imgUriLvl3={commentOwner.image}
        userNameLvl3={commentOwner.fullname}
        userIdLvl3={commentOwner.username}
        postDateLvl3={timeAgo}
        userCommentedIdLvl3={repliedTo}
        commentCaptionLvl3={caption}
        commentOnPressLvl3={() =>
          commentOnPress(id, commentOwner.username, 3, parentID)
        }
        likeOnPressLvl3={() => likeOnPress(id, isLiked)}
        likePressedLvl3={
          selectedId === undefined
            ? isLiked
            : selectedId.includes(id) && recorder.includes(id)
            ? true
            : !selectedId.includes(id) && recorder.includes(id)
            ? false
            : !selectedId.includes(id) && !recorder.includes(id)
            ? isLiked
            : isLiked
        }
        likeCountLvl3={
          selectedId === undefined
            ? likesCount
            : selectedId.includes(id) &&
              recorder.includes(id) &&
              isLiked === true
            ? likesCount
            : selectedId.includes(id) &&
              recorder.includes(id) &&
              isLiked === false
            ? likesCount + 1
            : !selectedId.includes(id) &&
              recorder.includes(id) &&
              isLiked === true
            ? likesCount - 1
            : !selectedId.includes(id) &&
              recorder.includes(id) &&
              isLiked === false
            ? likesCount
            : likesCount
        }
        commentCountLvl3={commentsCount}
        selectedMenu={handleSelectedLvl3}
        idComment={id}
        selectedIdComment={selectedIdComment}
        showEdit={profileUUID === commentOwner.UUID}
      />
    );
  };

  const CommentChildrenLvl2 = (props: CommentList2) => {
    const {
      id,
      caption,
      likesCount,
      commentsCount,
      comments,
      repliedTo,
      isLiked,
      timeAgo,
      commentOwner,
      commentLevel,
      parentID,
    } = props;
    return (
      <CommentLvlTwo
        toDetailOnPress={() => handleToDetail(commentOwner.UUID)}
        imgUriLvl2={commentOwner.image}
        userNameLvl2={commentOwner.fullname}
        userIdLvl2={commentOwner.username}
        postDateLvl2={timeAgo}
        userCommentedId={repliedTo}
        commentCaptionLvl2={caption}
        commentOnPressLvl2={() =>
          commentOnPress(id, commentOwner.username, 2, parentID)
        }
        likeOnPressLvl2={() => likeOnPress(id, isLiked)}
        likePressedLvl2={
          selectedId === undefined
            ? isLiked
            : selectedId.includes(id) && recorder.includes(id)
            ? true
            : !selectedId.includes(id) && recorder.includes(id)
            ? false
            : !selectedId.includes(id) && !recorder.includes(id)
            ? isLiked
            : isLiked
        }
        likeCountLvl2={
          selectedId === undefined
            ? likesCount
            : selectedId.includes(id) &&
              recorder.includes(id) &&
              isLiked === true
            ? likesCount
            : selectedId.includes(id) &&
              recorder.includes(id) &&
              isLiked === false
            ? likesCount + 1
            : !selectedId.includes(id) &&
              recorder.includes(id) &&
              isLiked === true
            ? likesCount - 1
            : !selectedId.includes(id) &&
              recorder.includes(id) &&
              isLiked === false
            ? likesCount
            : likesCount
        }
        commentCountLvl2={commentsCount}
        selectedMenu={handleSelectedLvl2}
        idComment={id}
        selectedIdComment={selectedIdComment}
        showEdit={profileUUID === commentOwner.UUID}
        childrenLvl2={
          <>
            {/* Comment Section Lvl 3 */}
            <Gap height={12} />
            {dataLvl3 !== undefined ? (
              <>
                <FlatList
                  data={filterParentID(dataLvl3, id)}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({item}) => (
                    <>
                      <CommentChildrenLvl3
                        id={item.id}
                        caption={item.caption}
                        likesCount={item.likesCount}
                        commentsCount={item.commentsCount}
                        repliedTo={item.repliedTo}
                        parentID={item?.parentID}
                        isLiked={item.isLiked}
                        timeAgo={item.timeAgo}
                        commentOwner={item.commentOwner}
                        commentLevel={item.commentLevel}
                      />
                      <Gap height={12} />
                    </>
                  )}
                />
              </>
            ) : null}
            {commentsCount > 0 &&
              (dataLvl3 === undefined ? (
                <TouchableOpacity>
                  <Text
                    style={styles.viewMore}
                    onPress={() => viewMoreOnPress(id, 3)}>
                    View more reply
                  </Text>
                </TouchableOpacity>
              ) : dataLvl3 !== undefined &&
                filterParentID(dataLvl3, id).length != commentsCount ? (
                <TouchableOpacity>
                  <Text
                    style={styles.viewMore}
                    onPress={() => viewMoreOnPress(id, 3)}>
                    View more reply
                  </Text>
                </TouchableOpacity>
              ) : null)}
          </>
        }
      />
    );
  };

  return (
    <View style={styles.commentContainer}>
      <FlatList
        data={dataLvl1}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <PostComment
            toDetailOnPress={() => handleToDetail(item.commentOwner.UUID)}
            imgUri={item.commentOwner.image}
            fullName={elipsisText(item.commentOwner.fullname, 21)}
            userName={`@${elipsisText(item.commentOwner.username, 10)}`}
            postDate={item.timeAgo}
            artistPostId={item.repliedTo}
            commentCaption={item.caption}
            likeOnPress={() => likeOnPress(item.id, item.isLiked)}
            likePressed={
              selectedId === undefined
                ? item.isLiked
                : selectedId.includes(item.id) && recorder.includes(item.id)
                ? true
                : !selectedId.includes(item.id) && recorder.includes(item.id)
                ? false
                : !selectedId.includes(item.id) && !recorder.includes(item.id)
                ? item.isLiked
                : item.isLiked
              //1 && 2 = true
              // !1 && 2 = false
              // !1 && !2 = isLiked
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
            commentOnPress={() =>
              commentOnPress(
                item.id,
                item.commentOwner.username,
                1,
                item?.parentID,
              )
            }
            commentCount={item.commentsCount}
            selectedMenu={handleSelectedLvl1}
            idComment={item.id}
            selectedIdComment={selectedIdComment}
            showEdit={profileUUID === item.commentOwner.UUID}
            children={
              <>
                {/* Comment Section Lvl 2 */}
                <Gap height={12} />
                {dataLvl2 !== undefined ? (
                  <>
                    <FlatList
                      data={filterParentID(dataLvl2, item.id)}
                      showsVerticalScrollIndicator={false}
                      scrollEnabled={false}
                      keyExtractor={(_, index) => index.toString()}
                      renderItem={({item}) => (
                        <CommentChildrenLvl2
                          id={item.id}
                          caption={item.caption}
                          likesCount={item.likesCount}
                          commentsCount={item.commentsCount}
                          // @ts-ignore
                          comments={item.comments}
                          repliedTo={item.repliedTo}
                          parentID={item?.parentID}
                          isLiked={item.isLiked}
                          timeAgo={item.timeAgo}
                          commentOwner={item.commentOwner}
                          commentLevel={item.commentLevel}
                        />
                      )}
                    />
                  </>
                ) : null}
                {item.commentsCount > 0 &&
                  (dataLvl2 === undefined ? (
                    <TouchableOpacity
                      onPress={() => viewMoreOnPress(item.id, 2)}>
                      <Text style={styles.viewMore}>View more reply</Text>
                    </TouchableOpacity>
                  ) : dataLvl2 !== undefined &&
                    filterParentID(dataLvl2, item.id).length !=
                      item.commentsCount ? (
                    <TouchableOpacity
                      onPress={() => viewMoreOnPress(item.id, 2)}>
                      <Text style={styles.viewMore}>View more reply</Text>
                    </TouchableOpacity>
                  ) : null)}
              </>
            }
          />
        )}
      />
      {postCommentCount >= 10 && dataLvl1?.length != postCommentCount ? (
        <TouchableOpacity onPress={() => viewMoreOnPress(postId, 1)}>
          <Text
            style={[
              styles.viewMore,
              {
                marginBottom: mvs(20),
              },
            ]}>
            View more reply
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  commentContainer: {
    width: '100%',
    paddingHorizontal: widthResponsive(24),
    paddingBottom: heightResponsive(10),
  },
  viewMore: {
    color: color.Pink[100],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: ms(12),
    marginBottom: heightResponsive(12),
  },
});
