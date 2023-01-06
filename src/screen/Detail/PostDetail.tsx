import {LogBox, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {color, font} from '../../theme';
import {
  CommentInputModal,
  DetailPost,
  Gap,
  SsuDivider,
  TopNavigation,
} from '../../components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {SafeAreaView} from 'react-native-safe-area-context';
import {elipsisText, heightPercentage, widthResponsive} from '../../utils';
import {ms, mvs} from 'react-native-size-matters';
import CommentSection from './CommentSection';
import ImageModal from './ImageModal';
import ImageList from '../ListCard/ImageList';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {dateFormat} from '../../utils/date-format';
import {
  CommentList,
  CommentList2,
  CommentList3,
  DetailPostData,
} from '../../interface/feed.interface';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {duplicateFilter} from './function';

type PostDetailProps = NativeStackScreenProps<RootStackParams, 'PostDetail'>;

export const PostDetail: FC<PostDetailProps> = ({route}: PostDetailProps) => {
  // ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const {
    dataPostDetail,
    dataCmntToCmnt,
    dataLoadMore,
    setLikePost,
    setUnlikePost,
    setCommentToPost,
    setCommentToComment,
    getDetailPost,
    setLoadMore,
    setLikeComment,
    setUnlikeComment,
  } = useFeedHook();

  const {dataProfile, getProfileUser} = useProfileHook();

  const data = route.params;
  const musicianName = data.musician.fullname;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [likePressed, setLikePressed] = useState<boolean>();
  const [readMore, setReadMore] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [inputCommentModal, setInputCommentModal] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>('');
  const [musicianId, setMusicianId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [commentType, setCommentType] = useState<string>('');
  const [likeCommentId, setLikeCommentId] = useState<string>('');
  const [unlikeCommentId, setUnlikeCommentId] = useState<string>('');
  const [cmntToCmnt, setCmntToCmnt] = useState<{
    id: string;
    userName: string;
  }>();
  const [viewMore, setViewMore] = useState<string>('');
  const [dataMainComment, setDataMainComment] = useState<DetailPostData>();
  const [dataProfileImg, setDataProfileImg] = useState<string>('');
  const [commentLvl1, setCommentLvl1] = useState<CommentList[] | undefined>();
  const [commentLvl2, setCommentLvl2] = useState<CommentList2[] | undefined>();
  const [commentLvl3, setCommentLvl3] = useState<CommentList3[] | undefined>();
  const [perPage, setPerPage] = useState<number>(10);
  const [perPage2, setPerPage2] = useState<number>(1);
  const [activePage, setActivePage] = useState<number>(0);

  // ? Get Profile
  useEffect(() => {
    getProfileUser();
  }, []);

  useEffect(() => {
    dataProfile?.data.imageProfileUrl !== null &&
    dataProfile?.data.imageProfileUrl !== undefined
      ? setDataProfileImg(dataProfile?.data.imageProfileUrl)
      : '';
  }, [dataProfile]);

  //  ? Get Detail Post
  useFocusEffect(
    useCallback(() => {
      getDetailPost({id: data.id});
    }, []),
  );

  // ? Set Like / Unlike
  const likeOnPress = (id: string, isLiked: boolean) => {
    if (isLiked === true) {
      if (likePressed === true) {
        setUnlikePost({id});
        setLikePressed(false);
      } else if (likePressed === false) {
        setLikePost({id});
        setLikePressed(true);
      } else {
        setUnlikePost({id});
        setLikePressed(false);
      }
    } else if (isLiked === false) {
      if (likePressed === true) {
        setUnlikePost({id});
        setLikePressed(false);
      } else if (likePressed === false) {
        setLikePost({id});
        setLikePressed(true);
      } else {
        setLikePost({id});
        setLikePressed(true);
      }
    }
  };

  // ? Set LikeComment / UnlikeComment
  useEffect(() => {
    likeCommentId !== '' && setLikeComment({id: likeCommentId});
  }, [likeCommentId]);

  useEffect(() => {
    unlikeCommentId !== '' && setUnlikeComment({id: unlikeCommentId});
  }, [unlikeCommentId]);

  // !Comment Area
  // * First Condition
  useEffect(() => {
    if (dataPostDetail !== null) {
      if (commentLvl1 == undefined) {
        return setCommentLvl1(dataPostDetail?.comments);
      }
    }
  }, [dataPostDetail]);

  // * Load More Condition
  useEffect(() => {
    if (dataLoadMore !== null) {
      setViewMore('');
      dataLoadMore?.map((item: CommentList) => {
        if (item.commentLevel === 1) {
          return setCommentLvl1(dataLoadMore);
        } else if (item.commentLevel === 2 && commentLvl2 === undefined) {
          return setCommentLvl2(dataLoadMore);
        } else if (item.commentLevel === 2 && commentLvl2 !== undefined) {
          let dataX = duplicateFilter(dataLoadMore, commentLvl2);
          const mergedArray = [...commentLvl2, ...dataX];
          return setCommentLvl2(mergedArray);
        } else if (item.commentLevel === 3 && commentLvl3 === undefined) {
          return setCommentLvl3(dataLoadMore);
        } else if (item.commentLevel === 3 && commentLvl3 !== undefined) {
          let dataX = duplicateFilter(dataLoadMore, commentLvl3);
          const mergedArray = [...commentLvl3, ...dataX];
          return setCommentLvl3(mergedArray);
        }
      });
    }
  }, [dataLoadMore]);
  // !End of Comment

  useEffect(() => {
    dataPostDetail !== null ? setDataMainComment(dataPostDetail) : null;
  }, [dataPostDetail]);

  //? handle comment in commentsection & open modal comment
  useEffect(() => {
    if (cmntToCmnt !== undefined) {
      setUserName(cmntToCmnt.userName);
      setInputCommentModal(!inputCommentModal);
    }
  }, [cmntToCmnt]);

  useEffect(() => {
    dataCmntToCmnt !== null && viewMore === ''
      ? getDetailPost({id: data.id})
      : dataCmntToCmnt !== null && viewMore !== ''
      ? setLoadMore({
          id: viewMore,
          params: {page: 1, perPage: activePage === 1 ? perPage : perPage2},
        })
      : null;
  }, [dataCmntToCmnt, viewMore, activePage]);

  //? handle viewMore in commentsection & call the api list comment
  useEffect(() => {
    viewMore !== ''
      ? setLoadMore({id: viewMore, params: {page: 1, perPage: perPage}})
      : null;
  }, [viewMore]);

  const commentOnPress = (id: string, username: string) => {
    setInputCommentModal(!inputCommentModal);
    setMusicianId(id);
    setUserName(username);
  };

  const handleReplyOnPress = () => {
    commentType.length > 0 && cmntToCmnt !== undefined
      ? setCommentToComment({
          id: cmntToCmnt.id,
          content: {content: commentType},
        })
      : commentType.length > 0 && cmntToCmnt === undefined
      ? setCommentToPost({
          id: musicianId,
          content: {content: commentType},
        })
      : null;
    setInputCommentModal(false);
    setCommentType('');
  };

  const tokenOnPress = () => {
    console.log('token');
  };

  const shareOnPress = () => {
    console.log('share');
  };

  const readMoreOnPress = () => {
    setReadMore(!readMore);
  };

  const toggleModalOnPress = (uri: string) => {
    setModalVisible(!isModalVisible);
    setImgUrl(uri);
  };

  const handleSetPage = (value: number) => {
    if (value === 1) {
      return setActivePage(1), setPerPage(perPage + 3);
    } else {
      return setActivePage(2), setPerPage2(perPage2 + 3);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <TopNavigation.Type1
          title={`${musicianName} Post`}
          leftIconAction={() => navigation.goBack()}
          maxLengthTitle={40}
          itemStrokeColor={color.Neutral[10]}
        />
        {/* Post Detail Section */}
        <View style={styles.bodyContainer}>
          {dataPostDetail ? (
            <DetailPost
              musicianName={musicianName}
              musicianId={`@${data.musician.username}`}
              imgUri={data.musician.imageProfileUrl}
              postDate={dateFormat(data.updatedAt)}
              category={data.category}
              likeOnPress={() =>
                likeOnPress(dataPostDetail.id, dataPostDetail.isLiked)
              }
              likePressed={
                likePressed === undefined
                  ? dataPostDetail.isLiked
                  : likePressed === true
                  ? true
                  : false
              }
              likeCount={
                likePressed === undefined
                  ? dataPostDetail.likesCount
                  : likePressed === true && dataPostDetail.isLiked === true
                  ? dataPostDetail.likesCount
                  : likePressed === true && dataPostDetail.isLiked === false
                  ? dataPostDetail.likesCount + 1
                  : likePressed === false && dataPostDetail.isLiked === true
                  ? dataPostDetail.likesCount - 1
                  : likePressed === false && dataPostDetail.isLiked === false
                  ? dataPostDetail.likesCount
                  : dataPostDetail.likesCount
              }
              commentOnPress={() => commentOnPress(data.id, musicianName)}
              tokenOnPress={tokenOnPress}
              shareOnPress={shareOnPress}
              containerStyles={{
                marginTop: mvs(16),
                height: heightPercentage(40),
              }}
              commentCount={dataPostDetail.commentsCount}
              disabled={true}
              children={
                <View style={{width: '100%'}}>
                  {dataPostDetail ? (
                    dataPostDetail?.caption.length >= 250 &&
                    readMore == false ? (
                      <Text style={styles.childrenPostTitle}>
                        {elipsisText(dataPostDetail?.caption, 250)}
                        <Text style={styles.readMore} onPress={readMoreOnPress}>
                          {' '}
                          Read More
                        </Text>
                      </Text>
                    ) : dataPostDetail?.caption.length < 250 ? (
                      <Text style={styles.childrenPostTitle}>
                        {dataPostDetail?.caption}
                      </Text>
                    ) : (
                      <Text style={styles.childrenPostTitle}>
                        {dataPostDetail?.caption}
                        <Text style={styles.readMore} onPress={readMoreOnPress}>
                          {'\n'}
                          Read Less
                        </Text>
                      </Text>
                    )
                  ) : null}
                  <Gap height={4} />
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <ImageList
                      imgData={data.image}
                      disabled={false}
                      width={162}
                      height={79}
                      onPress={toggleModalOnPress}
                    />
                  </View>
                </View>
              }
            />
          ) : null}
        </View>
        <Gap height={12} />
        <SsuDivider />
        <Gap height={20} />

        {/* //! Comment Section Lvl 1 */}
        {dataPostDetail ? (
          <CommentSection
            dataLvl1={commentLvl1}
            dataLvl2={commentLvl2}
            dataLvl3={commentLvl3}
            onComment={setCmntToCmnt}
            onLike={setLikeCommentId}
            onUnlike={setUnlikeCommentId}
            onViewMore={setViewMore}
            onSetPage={handleSetPage}
            postCommentCount={dataPostDetail.commentsCount}
            postId={dataPostDetail.id}
          />
        ) : null}
        <ImageModal
          toggleModal={() => setModalVisible(!isModalVisible)}
          modalVisible={isModalVisible}
          image={imgUrl}
        />
        <CommentInputModal
          toggleModal={() => setInputCommentModal(!inputCommentModal)}
          modalVisible={inputCommentModal}
          name={userName}
          commentValue={commentType}
          onCommentChange={setCommentType}
          handleOnPress={handleReplyOnPress}
          onModalHide={() => setCmntToCmnt(undefined)}
          userAvatarUri={dataProfileImg}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  bodyContainer: {width: '100%', paddingHorizontal: widthResponsive(24)},
  childrenPostTitle: {
    flexShrink: 1,
    maxWidth: widthResponsive(288),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: ms(13),
    color: color.Neutral[10],
  },
  readMore: {
    color: color.Pink[100],
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: ms(13),
  },
  commentContainer: {
    width: '100%',
    paddingHorizontal: widthResponsive(24),
  },
});
