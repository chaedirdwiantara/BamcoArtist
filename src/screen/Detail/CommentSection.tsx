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
import {filterParentIDLvl2, filterParentIDLvl3} from './function';
import {DataDropDownType} from '../../data/dropdown';
import {dummyProfile} from '../../data/image';
import {useTranslation} from 'react-i18next';
import {blockUserRecorded} from '../../store/blockUser.store';
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
  selectedUserUuid: (uuid: string) => void;
  selectedUserName: (name: string) => void;
  profileUUID: string;
  deletedCommentParentId: string[];
  addCommentParentId: string[];
  isBanned: boolean;
  modalBanned: (value: boolean) => void;
}

const CommentSection: FC<CommentSectionType> = (props: CommentSectionType) => {
  const {t} = useTranslation();
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
    selectedUserUuid,
    selectedUserName,
    profileUUID,
    deletedCommentParentId,
    addCommentParentId,
    isBanned,
    modalBanned,
  } = props;

  const {uuidBlocked} = blockUserRecorded();

  const [recorder, setRecorder] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>();

  const likeOnPress = (id: string, isLiked: boolean) => {
    if (isBanned) {
      modalBanned?.(true);
    } else {
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
      if (
        isLiked === true &&
        selectedId?.includes(id) &&
        recorder.includes(id)
      ) {
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
    }
  };

  const commentOnPress = (
    id: string,
    userName: string,
    commentLvl: number,
    parentID: string,
  ) => {
    if (isBanned) {
      modalBanned?.(true);
    } else {
      userName === 'accountdeactivated'
        ? console.log('deleted account detected')
        : onComment?.({id, userName, commentLvl, parentID});
    }
  };

  const handleToDetail = (id: string, userName: string) => {
    userName === 'accountdeactivated'
      ? console.log('deleted account detected')
      : toDetailOnPress?.(id);
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

  // ! LVL 3 AREA
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
      blockIs,
      isBlock,
    } = props;
    return (
      <CommentLvlThree
        toDetailOnPress={() =>
          handleToDetail(commentOwner.UUID, commentOwner.username)
        }
        imgUriLvl3={commentOwner.image}
        userNameLvl3={commentOwner.fullname}
        userIdLvl3={commentOwner.username}
        postDateLvl3={timeAgo}
        userCommentedIdLvl3={repliedTo}
        commentCaptionLvl3={caption}
        commentOnPressLvl3={() =>
          commentOnPress(id, commentOwner.username, 3, parentID)
        }
        likeOnPressLvl3={
          commentOwner.username !== 'accountdeactivated'
            ? () => likeOnPress(id, isLiked)
            : () => {}
        }
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
        myComment={profileUUID === commentOwner.UUID}
        commentOwnerUuid={commentOwner.UUID}
        selectedUserUuid={selectedUserUuid}
        selectedUserName={selectedUserName}
        isBlock={uuidBlocked.includes(commentOwner.UUID) ? true : isBlock!}
        blockIs={blockIs ? true : false}
      />
    );
  };

  // ! LVL 2 AREA
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
      commentTotal,
      isBlock,
      blockIs,
    } = props;
    return (
      <CommentLvlTwo
        toDetailOnPress={() =>
          handleToDetail(commentOwner.UUID, commentOwner.username)
        }
        imgUriLvl2={commentOwner.image}
        userNameLvl2={commentOwner.fullname}
        userIdLvl2={commentOwner.username}
        postDateLvl2={timeAgo}
        userCommentedId={repliedTo}
        commentCaptionLvl2={caption}
        commentOnPressLvl2={() =>
          commentOnPress(id, commentOwner.username, 2, parentID)
        }
        likeOnPressLvl2={
          commentOwner.username !== 'accountdeactivated'
            ? () => likeOnPress(id, isLiked)
            : () => {}
        }
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
        commentCountLvl2={
          commentsCount -
          deletedCommentParentId.filter(x => x == id).length +
          addCommentParentId.filter(x => x == id).length
        }
        selectedMenu={handleSelectedLvl2}
        idComment={id}
        selectedIdComment={selectedIdComment}
        myComment={profileUUID === commentOwner.UUID}
        commentOwnerUuid={commentOwner.UUID}
        selectedUserUuid={selectedUserUuid}
        selectedUserName={selectedUserName}
        isBlock={uuidBlocked.includes(commentOwner.UUID) ? true : isBlock!}
        blockIs={blockIs ? true : false}
        childrenLvl2={
          <>
            {/* Comment Section Lvl 3 */}
            <Gap height={12} />
            {dataLvl3 !== undefined ? (
              <>
                <FlatList
                  data={filterParentIDLvl3(dataLvl3, id)}
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
                        isBlock={
                          uuidBlocked.includes(item.commentOwner.UUID)
                            ? true
                            : item.isBlock
                        }
                        blockIs={item.blockIs}
                      />
                      <Gap height={12} />
                    </>
                  )}
                />
              </>
            ) : null}
            {commentTotal > 0 &&
              (dataLvl3 === undefined ? (
                <TouchableOpacity onPress={() => viewMoreOnPress(id, 3)}>
                  <Text style={styles.viewMore}>
                    {t('Post.Label.ViewMoreReply')}
                  </Text>
                </TouchableOpacity>
              ) : dataLvl3 !== undefined &&
                filterParentIDLvl3(dataLvl3, id).length !==
                  commentTotal -
                    deletedCommentParentId.filter(x => x == id).length +
                    addCommentParentId.filter(x => x == id).length ? (
                <TouchableOpacity onPress={() => viewMoreOnPress(id, 3)}>
                  <Text style={styles.viewMore}>
                    {t('Post.Label.ViewMoreReply')}
                  </Text>
                </TouchableOpacity>
              ) : null)}
          </>
        }
      />
    );
  };

  // ! LVL 1 START AREA
  return (
    <View style={styles.commentContainer}>
      <FlatList
        data={dataLvl1}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <PostComment
            toDetailOnPress={
              item.commentOwner !== null
                ? () =>
                    handleToDetail(
                      item.commentOwner.UUID,
                      item.commentOwner.username,
                    )
                : () => {
                    console.log('something error happened');
                  }
            }
            imgUri={
              item.commentOwner !== null
                ? item.commentOwner.image
                : dummyProfile
            }
            fullName={elipsisText(
              item.commentOwner !== null ? item.commentOwner.fullname : '',
              21,
            )}
            userName={
              item.commentOwner !== null ? item.commentOwner.username : ''
            }
            postDate={item.timeAgo}
            artistPostId={item.repliedTo}
            commentCaption={item.caption}
            likeOnPress={
              item.commentOwner.username !== 'accountdeactivated'
                ? () => likeOnPress(item.id, item.isLiked)
                : () => {}
            }
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
            commentCount={
              item.commentsCount -
              deletedCommentParentId.filter(x => x == item.id).length +
              addCommentParentId.filter(x => x == item.id).length
            }
            selectedMenu={handleSelectedLvl1}
            idComment={item.id}
            selectedIdComment={selectedIdComment}
            myComment={profileUUID === item.commentOwner.UUID}
            commentOwnerUuid={item.commentOwner.UUID}
            selectedUserUuid={selectedUserUuid}
            selectedUserName={selectedUserName}
            isBlock={
              uuidBlocked.includes(item.commentOwner.UUID)
                ? true
                : item.isBlock!
            }
            blockIs={item.blockIs ? true : false}
            children={
              <>
                {/* Comment Section Lvl 2 */}
                <Gap height={12} />
                {dataLvl2 !== undefined ? (
                  <>
                    <FlatList
                      data={filterParentIDLvl2(dataLvl2, item.id)}
                      showsVerticalScrollIndicator={false}
                      scrollEnabled={false}
                      keyExtractor={(_, index) => index.toString()}
                      renderItem={({item}: {item: CommentList2}) => (
                        <CommentChildrenLvl2
                          id={item.id}
                          caption={item.caption}
                          likesCount={item.likesCount}
                          commentsCount={item.commentsCount}
                          comments={item.comments}
                          repliedTo={item.repliedTo}
                          parentID={item?.parentID}
                          isLiked={item.isLiked}
                          timeAgo={item.timeAgo}
                          commentOwner={item.commentOwner}
                          commentLevel={item.commentLevel}
                          commentTotal={item.commentTotal}
                          isBlock={
                            uuidBlocked.includes(item.commentOwner.UUID)
                              ? true
                              : item.isBlock
                          }
                          blockIs={item.blockIs}
                        />
                      )}
                    />
                  </>
                ) : null}
                {item.commentsCount > 0 &&
                  (dataLvl2 === undefined ? (
                    <TouchableOpacity
                      onPress={() => viewMoreOnPress(item.id, 2)}>
                      <Text style={styles.viewMore}>
                        {t('Post.Label.ViewMoreReply')}
                      </Text>
                    </TouchableOpacity>
                  ) : dataLvl2 !== undefined &&
                    filterParentIDLvl2(dataLvl2, item.id).length !=
                      item.commentsCount -
                        deletedCommentParentId.filter(x => x == item.id)
                          .length +
                        addCommentParentId.filter(x => x == item.id).length ? (
                    <TouchableOpacity
                      onPress={() => viewMoreOnPress(item.id, 2)}>
                      <Text style={styles.viewMore}>
                        {t('Post.Label.ViewMoreReply')}
                      </Text>
                    </TouchableOpacity>
                  ) : null)}
              </>
            }
          />
        )}
      />
      {postCommentCount > 10 &&
      dataLvl1?.length !=
        postCommentCount -
          deletedCommentParentId.filter(x => x == postId).length +
          addCommentParentId.filter(x => x == postId).length ? (
        <TouchableOpacity onPress={() => viewMoreOnPress(postId, 1)}>
          <Text
            style={[
              styles.viewMore,
              {
                marginBottom: mvs(20),
              },
            ]}>
            {t('Post.Label.ViewMoreReply')}
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
