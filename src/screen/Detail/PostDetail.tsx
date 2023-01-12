import {
  InteractionManager,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {color, font, typography} from '../../theme';
import {
  CommentInputModal,
  DetailPost,
  Gap,
  ModalDonate,
  ModalShare,
  ModalSuccessDonate,
  SsuDivider,
  SsuToast,
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
import {TickCircleIcon} from '../../assets/icon';
import {makeId} from './function';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import categoryNormalize from '../../utils/categoryNormalize';

type cmntToCmnt = {
  id: string;
  userName: string;
  commentLvl: number;
  parentID: string;
};

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
    feedIsLoading,
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
  const [imgUrl, setImgUrl] = useState<number>(-1);
  const [likeCommentId, setLikeCommentId] = useState<string>('');
  const [unlikeCommentId, setUnlikeCommentId] = useState<string>('');
  const [dataProfileImg, setDataProfileImg] = useState<string>('');
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);

  // * VIEW MORE HOOKS
  const [viewMore, setViewMore] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [delStaticComment, setDelStaticComment] = useState<number>(-1);
  const [callLoadMoreApi, setCallLoadMoreApi] = useState<boolean>(false);
  const [dataParent, setDataParent] = useState<
    {parentId: string; value: number}[]
  >([]);
  const [activePage, setActivePage] = useState<number>(0);

  // * COMMENT HOOKS
  const [inputCommentModal, setInputCommentModal] = useState<boolean>(false);
  const [musicianId, setMusicianId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [cmntToCmnt, setCmntToCmnt] = useState<cmntToCmnt>();
  const [cmntToCmntLvl0, setCmntToCmntLvl0] = useState<cmntToCmnt>();
  const [commentCaption, setCommentCaption] = useState<string>('');
  const [commentLvl1, setCommentLvl1] = useState<CommentList[]>();
  const [commentLvl2, setCommentLvl2] = useState<CommentList2[]>();
  const [commentLvl3, setCommentLvl3] = useState<CommentList3[]>();
  const [staticId, setStaticId] = useState<string[]>([]);

  // ! FIRST LOAD when open the screen
  // ? Get Profile
  useEffect(() => {
    getProfileUser();
  }, []);

  // ? Set profile picture for profile img
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

  // ? Set data comment lvl 1 when dataPostDetail is there
  useEffect(() => {
    if (dataPostDetail !== null) {
      if (commentLvl1 == undefined) {
        return setCommentLvl1(dataPostDetail?.comments);
      }
    }
  }, [dataPostDetail]);
  // ! End of FIRST LOAD

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

  // ! VIEW MORE AREA
  // * 1ST call with viewMore when view more reply onPress
  const handleSetPage = (value: number) => {
    setValue(value);
    setDelStaticComment(value);
  };

  //  * 2ND call after viewMore not empty string
  useEffect(() => {
    if (viewMore !== '' && value !== 0) {
      return handleViewMore();
    }
  }, [viewMore]);

  // * 3RD call call by viewMore hook
  const handleViewMore = () => {
    if (value === 1) {
      return setCallLoadMoreApi(true);
    } else if (value > 1) {
      let viewMoreInit = {parentId: viewMore, value: 1};
      let objIndex = dataParent.findIndex(obj => obj.parentId == viewMore);
      if (objIndex !== -1) {
        let viewMoreX = {
          parentId: viewMore,
          value: dataParent[objIndex].value + 1,
        };
        let dataParentX = dataParent.filter(obj => obj.parentId !== viewMore);
        return (
          setDataParent([...dataParentX, viewMoreX]), setCallLoadMoreApi(true)
        );
      } else {
        return (
          setDataParent([...dataParent, viewMoreInit]), setCallLoadMoreApi(true)
        );
      }
    }
  };

  // * 4TH call LoadMore api when callLoadMoreApi === true
  useEffect(() => {
    callLoadMoreApi === true && value === 1
      ? (setLoadMore({
          id: viewMore,
          params: {page: activePage + 1, perPage: 3},
        }),
        setActivePage(activePage + 1),
        setCallLoadMoreApi(false),
        setValue(0),
        setViewMore(''))
      : callLoadMoreApi === true && value > 1 && dataParent.length !== 0
      ? (setLoadMore({
          id: viewMore,
          params: {
            page: dataParent[
              dataParent.findIndex(obj => obj.parentId == viewMore)
            ]?.value,
            perPage: 3,
          },
        }),
        setCallLoadMoreApi(false),
        setValue(0),
        setViewMore(''))
      : null;
  }, [dataCmntToCmnt, viewMore, activePage, dataParent, callLoadMoreApi]);

  // * 5TH call when data load received from api
  useEffect(() => {
    if (dataLoadMore !== null) {
      dataLoadMore?.map((item: CommentList) => {
        if (item.commentLevel === 1 && commentLvl1 === undefined) {
          return setCommentLvl1(dataLoadMore);
        } else if (item.commentLevel === 1 && commentLvl1 !== undefined) {
          return setCommentLvl2([...commentLvl1, ...dataLoadMore]);
        } else if (item.commentLevel === 2 && commentLvl2 === undefined) {
          return setCommentLvl2(dataLoadMore);
        } else if (item.commentLevel === 2 && commentLvl2 !== undefined) {
          const mergedArray = [...commentLvl2, ...dataLoadMore];
          return setCommentLvl2(mergedArray);
        } else if (item.commentLevel === 3 && commentLvl3 === undefined) {
          return setCommentLvl3(dataLoadMore);
        } else if (item.commentLevel === 3 && commentLvl3 !== undefined) {
          const mergedArray = [...commentLvl3, ...dataLoadMore];
          return setCommentLvl3(mergedArray);
        }
      });
    }
  }, [dataLoadMore]);

  // * 6TH call, delete static comments when comment level reach certain value
  // TODO: need implement more logic to delete the static comments
  useEffect(() => {
    if (dataLoadMore !== null) {
      if (delStaticComment == 1 && commentLvl1?.length == 11) {
        for (var i = 0; i < commentLvl1.length; i++) {
          return setCommentLvl1(
            commentLvl1.filter((x: CommentList) => !staticId.includes(x.id)),
          );
        }
      } else if (
        delStaticComment == 2 &&
        commentLvl2 &&
        commentLvl2?.length >= 1 &&
        commentLvl2?.length <= 4
      ) {
        for (var i = 0; i < commentLvl2.length; i++) {
          return setCommentLvl2(
            commentLvl2.filter((x: CommentList2) => !staticId.includes(x.id)),
          );
        }
      } else if (
        delStaticComment == 3 &&
        commentLvl3 &&
        commentLvl3?.length >= 1 &&
        commentLvl3?.length <= 4
      ) {
        for (var i = 0; i < commentLvl3.length; i++) {
          return setCommentLvl3(
            commentLvl3.filter((x: CommentList3) => !staticId.includes(x.id)),
          );
        }
      }
    }
  }, [dataLoadMore, delStaticComment, commentLvl1]);
  // !END OF VIEW MORE

  // ! COMMENT AREA
  // ? Handle Comment To Post
  const commentOnPress = (id: string, username: string) => {
    setInputCommentModal(true);
    setMusicianId(id);
    setUserName(username);
    setCmntToCmntLvl0({
      id: makeId(5),
      userName: dataProfile?.data.fullname ? dataProfile.data.fullname : '',
      commentLvl: 0,
      parentID: dataPostDetail?.id ? dataPostDetail.id : '0',
    });
  };

  // ? Handle Comment To Comment
  // * hook to detect comment onPress, Open Comment Modal
  useEffect(() => {
    if (cmntToCmnt !== undefined) {
      setUserName(cmntToCmnt.userName);
      setInputCommentModal(!inputCommentModal);
    }
  }, [cmntToCmnt]);

  // * 1ST Handler to decide whether hit api comment to Post or comment to Comment
  const handleReplyOnPress = () => {
    commentCaption.length > 0 && cmntToCmnt !== undefined
      ? (setCommentToComment({
          id: cmntToCmnt.id,
          content: {content: commentCaption},
        }),
        setCommentCaption(''))
      : commentCaption.length > 0 && cmntToCmnt === undefined
      ? (setCommentToPost({
          postId: musicianId,
          content: commentCaption,
        }),
        setCommentCaption(''))
      : null;
    handleStaticComment();
    setInputCommentModal(false);
  };

  // * 2ND handle static comment to show it at screen in real time
  const handleStaticComment = () => {
    setDelStaticComment(-1);
    let comment = [
      {
        id: makeId(5),
        caption: commentCaption,
        likesCount: 0,
        repliedTo: cmntToCmnt?.userName ? cmntToCmnt?.userName : '',
        parentID: cmntToCmnt?.id ? cmntToCmnt?.id : '',
        commentsCount: 0,
        commentLevel: cmntToCmnt?.commentLvl,
        createdAt: '',
        comments: [],
        isLiked: false,
        timeAgo: 'just now',
        commentOwner: {
          UUID: dataProfile?.data.uuid ? dataProfile?.data.uuid : '',
          fullname: dataProfile?.data.fullname
            ? dataProfile?.data.fullname
            : '',
          username: dataProfile?.data.username
            ? dataProfile?.data.username
            : '',
          image: dataProfile?.data.imageProfileUrl
            ? dataProfile?.data.imageProfileUrl
            : '',
        },
      },
    ];
    if (cmntToCmntLvl0?.commentLvl === 0 && commentLvl1 !== undefined) {
      return (
        setCommentLvl1([...commentLvl1, ...comment]),
        setCmntToCmntLvl0(undefined),
        setStaticId([...staticId, comment[0].id])
      );
    } else if (cmntToCmntLvl0?.commentLvl === 0 && commentLvl1 === undefined) {
      return (
        setCommentLvl1(comment),
        setCmntToCmntLvl0(undefined),
        setStaticId([...staticId, comment[0].id])
      );
    } else if (cmntToCmnt?.commentLvl === 1 && commentLvl2 !== undefined) {
      return (
        setCommentLvl2([...commentLvl2, ...comment]),
        setStaticId([...staticId, comment[0].id])
      );
    } else if (cmntToCmnt?.commentLvl === 1 && commentLvl2 === undefined) {
      return setCommentLvl2(comment), setStaticId([...staticId, comment[0].id]);
    } else if (cmntToCmnt?.commentLvl === 2 && commentLvl3 !== undefined) {
      return (
        setCommentLvl3([...commentLvl3, ...comment]),
        setStaticId([...staticId, comment[0].id])
      );
    } else if (cmntToCmnt?.commentLvl === 2 && commentLvl3 === undefined) {
      return setCommentLvl3(comment), setStaticId([...staticId, comment[0].id]);
    } else if (cmntToCmnt?.commentLvl === 3 && commentLvl3 !== undefined) {
      return (
        setCommentLvl3([...commentLvl3, ...comment]),
        setStaticId([...staticId, comment[0].id])
      );
    } else if (cmntToCmnt?.commentLvl === 3 && commentLvl3 === undefined) {
      return setCommentLvl3(comment), setStaticId([...staticId, comment[0].id]);
    }
  };
  // ! End Of Comment area

  //? Credit onPress
  const tokenOnPress = () => {
    setModalDonate(true);
  };

  const shareOnPress = () => {
    setModalShare(true);
  };

  const readMoreOnPress = () => {
    setReadMore(!readMore);
  };

  const toggleModalOnPress = (index: number) => {
    setModalVisible(!isModalVisible);
    setImgUrl(index);
  };

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
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
              category={categoryNormalize(data.category)}
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
                    {data.image !== null ? (
                      <ImageList
                        imgData={data.image}
                        disabled={false}
                        width={162}
                        height={79}
                        onPress={toggleModalOnPress}
                      />
                    ) : null}
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
          imageIdx={imgUrl}
          dataImage={dataPostDetail?.image}
        />
        <CommentInputModal
          toggleModal={() => setInputCommentModal(!inputCommentModal)}
          modalVisible={inputCommentModal}
          name={userName}
          commentValue={commentCaption}
          onCommentChange={setCommentCaption}
          handleOnPress={handleReplyOnPress}
          onModalHide={() => setCmntToCmnt(undefined)}
          userAvatarUri={dataProfileImg}
        />
        <ModalShare
          url={
            'https://open.ssu.io/track/19AiJfAtRiccvSU1EWcttT?si=36b9a686dad44ae0'
          }
          modalVisible={modalShare}
          onPressClose={() => setModalShare(false)}
          titleModal={'Share Feed'}
          hideMusic
          onPressCopy={() =>
            InteractionManager.runAfterInteractions(() => setToastVisible(true))
          }
        />
        <SsuToast
          modalVisible={toastVisible}
          onBackPressed={() => setToastVisible(false)}
          children={
            <View style={[styles.modalContainer]}>
              <TickCircleIcon
                width={widthResponsive(21)}
                height={heightPercentage(20)}
                stroke={color.Neutral[10]}
              />
              <Gap width={widthResponsive(7)} />
              <Text style={[typography.Button2, styles.textStyle]}>
                Link have been copied to clipboard!
              </Text>
            </View>
          }
          modalStyle={{marginHorizontal: widthResponsive(24)}}
        />
        <ModalDonate
          totalCoin={'1000'}
          onPressDonate={onPressDonate}
          modalVisible={modalDonate}
          onPressClose={() => setModalDonate(false)}
          onModalHide={() => setModalSuccessDonate(true)}
        />

        <ModalSuccessDonate
          modalVisible={modalSuccessDonate && trigger2ndModal}
          toggleModal={onPressSuccess}
        />
        <ModalLoading visible={feedIsLoading} />
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
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  textStyle: {
    color: color.Neutral[10],
  },
});
