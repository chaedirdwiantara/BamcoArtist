import {
  Dimensions,
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
  Gap,
  ListCard,
  ModalDonate,
  ModalShare,
  ModalSuccessDonate,
  SsuToast,
  TopNavigation,
} from '../../components';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainTabParams, RootStackParams} from '../../navigations';
import {elipsisText, heightPercentage, widthResponsive} from '../../utils';
import {ms, mvs} from 'react-native-size-matters';
import CommentSection from './CommentSection';
import ImageModal from './ImageModal';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {dateFormat} from '../../utils/date-format';
import {
  CommentList,
  CommentList2,
  CommentList3,
  DetailPostData,
  PostList,
} from '../../interface/feed.interface';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {TickCircleIcon} from '../../assets/icon';
import {makeId} from './function';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import categoryNormalize from '../../utils/categoryNormalize';
import {DataDropDownType} from '../../data/dropdown';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {useTranslation} from 'react-i18next';
import {useCreditHook} from '../../hooks/use-credit.hook';
import {profileStorage} from '../../hooks/use-storage.hook';
import DetailChildrenCard from './DetailChildrenCard';
import {usePlayerStore} from '../../store/player.store';
import Clipboard from '@react-native-community/clipboard';
import {imageShare} from '../../utils/share';
import {useShareHook} from '../../hooks/use-share.hook';

export const {width} = Dimensions.get('screen');

type cmntToCmnt = {
  id: string;
  userName: string;
  commentLvl: number;
  parentID: string;
};

type PostDetailProps = NativeStackScreenProps<RootStackParams, 'PostDetail'>;

export const PostDetail: FC<PostDetailProps> = ({route}: PostDetailProps) => {
  const {t} = useTranslation();
  // ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const {
    dataPostDetail,
    dataLoadMore,
    feedIsLoading,
    dataComment,
    dataDeletePost,
    setDataLoadMore,
    setDataComment,
    setLikePost,
    setUnlikePost,
    setCommentToPost,
    setCommentToComment,
    getDetailPost,
    setLoadMore,
    setLikeComment,
    setUnlikeComment,
    setCommentDelete,
    setCommentUpdate,
    setDeletePost,
    sendLogShare,
  } = useFeedHook();

  const {
    seekPlayer,
    setPlaySong,
    setPauseSong,
    hidePlayer,
    isPlaying,
    playerProgress,
    addPlaylistFeed,
  } = usePlayerHook();

  const {
    dataUserCheck,
    setDataUserCheck,
    isLoading,
    getCheckUser,
    dataProfile,
    getProfileUser,
  } = useProfileHook();

  const {
    shareLink,
    getShareLink,
    successGetLink,
    setSelectedSharePost,
    selectedSharePost,
  } = useShareHook();

  const {creditCount, getCreditCount} = useCreditHook();

  const MyUuid = profileStorage()?.uuid;

  const data = route.params;

  const musicianName = data.musician.fullname;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigation2 = useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const {setWithoutBottomTab, show} = usePlayerStore();

  const [likePressed, setLikePressed] = useState<boolean>();
  const [readMore, setReadMore] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<number>(-1);
  const [dataProfileImg, setDataProfileImg] = useState<string>('');
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [idUserTonavigate, setIdUserTonavigate] = useState<string>();
  const [selectedMusicianId, setSelectedMusicianId] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // * VIEW MORE HOOKS
  const [viewMore, setViewMore] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [delStaticComment, setDelStaticComment] = useState<number>(-1);
  const [callLoadMoreApi, setCallLoadMoreApi] = useState<boolean>(false);
  const [dataParent, setDataParent] = useState<
    {parentId: string; value: number}[]
  >([]);
  const [activePage, setActivePage] = useState<number>(1);

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
  const [disallowStatic, setDisallowStatic] = useState<boolean>(false);
  const [staticId, setStaticId] = useState<string[]>([]);
  const [commentCountLvl1, setCommmentCountLvl1] = useState<number>(0);
  const [call6thCall, setCall6thStep] = useState<boolean>(true);

  // * LIKE / UNLIKE HOOKS
  const [likeCommentId, setLikeCommentId] = useState<string>('');
  const [unlikeCommentId, setUnlikeCommentId] = useState<string>('');

  // * UPDATE HOOKS
  const [idComment, setIdComment] = useState<string>();
  const [selectedMenu, setSelectedMenu] = useState<DataDropDownType>();
  const [selectedLvlComment, setSelectedLvlComment] = useState<number>();
  const [updateComment, setUpdateComment] = useState<boolean>(false);
  const [temporaryIds, setTemporaryIds] = useState<string>();
  const [parentIdDeletedComment, setParentIdDeletedComment] = useState<
    string[]
  >([]);
  const [parentIdAddComment, setParentIdAddComment] = useState<string[]>([]);

  // * UPDATE HOOKS POST
  const [selectedIdPost, setSelectedIdPost] = useState<string>();
  const [selectedMenuPost, setSelectedMenuPost] = useState<DataDropDownType>();

  //* MUSIC HOOKS
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [idNowPlaying, setIdNowPlaing] = useState<string>();

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

  useEffect(() => {
    if (modalDonate) getCreditCount();
  }, [modalDonate]);

  // ! FIRST LOAD when open the screen
  // ? Get Profile
  useEffect(() => {
    getProfileUser();
  }, []);

  // ? Set profile picture for profile img
  useEffect(() => {
    dataProfile?.data.imageProfileUrls.length !== 0 &&
    dataProfile?.data.imageProfileUrls !== undefined
      ? setDataProfileImg(dataProfile?.data.imageProfileUrls[0].image)
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
  }, [viewMore, value]);

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
          params: {page: activePage + 1, perPage: 10},
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
  }, [viewMore, activePage, dataParent, callLoadMoreApi]);

  // * 5TH call when data load received from api
  useEffect(() => {
    if (dataLoadMore) {
      dataLoadMore?.map((item: CommentList) => {
        if (item.commentLevel === 1 && commentLvl1 === undefined) {
          setCommentLvl1(dataLoadMore), setDataLoadMore(null);
        } else if (item.commentLevel === 1 && commentLvl1 !== undefined) {
          let mergedArray = [...commentLvl1, ...dataLoadMore];
          let filterDuplicate = mergedArray.filter(
            (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i,
          );
          setCommentLvl1(filterDuplicate);
          setDataLoadMore(null);
          setDelStaticComment(-1);
          setCall6thStep(false);
        } else if (item.commentLevel === 2 && commentLvl2 === undefined) {
          setCommentLvl2(dataLoadMore), setDataLoadMore(null);
        } else if (item.commentLevel === 2 && commentLvl2 !== undefined) {
          let mergedArray = [...commentLvl2, ...dataLoadMore];
          let filterDuplicate = mergedArray.filter(
            (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i,
          );
          setCommentLvl2(filterDuplicate);
          setDataLoadMore(null);
          setDelStaticComment(-1);
          setCall6thStep(false);
        } else if (item.commentLevel === 3 && commentLvl3 === undefined) {
          setCommentLvl3(dataLoadMore), setDataLoadMore(null);
        } else if (item.commentLevel === 3 && commentLvl3 !== undefined) {
          let mergedArray = [...commentLvl3, ...dataLoadMore];
          let filterDuplicate = mergedArray.filter(
            (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i,
          );
          setCommentLvl3(filterDuplicate);
          setDataLoadMore(null);
          setDelStaticComment(-1);
          setCall6thStep(false);
        }
      });
    }
  }, [dataLoadMore]);

  // * 6TH call, delete static comments when comment level reach certain value
  // TODO: need implement more logic to delete the static comments
  useEffect(() => {
    if (call6thCall) {
      if (dataLoadMore !== null && staticId.length > 0) {
        if (delStaticComment == 1 && commentLvl1?.length == 11) {
          for (var i = 0; i < commentLvl1.length; i++) {
            return setCommentLvl1(
              commentLvl1.filter((x: CommentList) => !staticId.includes(x.id)),
            );
          }
          setDataLoadMore(null);
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
          setDataLoadMore(null);
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
          setDataLoadMore(null);
        }
      }
      setCall6thStep(false);
    }
  }, [call6thCall, dataLoadMore, delStaticComment, commentLvl1]);
  // !END OF VIEW MORE

  // ! COMMENT AREA
  useEffect(() => {
    dataPostDetail && setCommmentCountLvl1(dataPostDetail.commentsCount);
  }, [dataPostDetail]);
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
      setInputCommentModal(true);
    }
  }, [cmntToCmnt]);

  // * 1ST Handler to decide whether hit api comment to Post or comment to Comment
  const handleReplyOnPress = () => {
    if (commentCaption.length > 0 && cmntToCmnt !== undefined) {
      if (updateComment) {
        setCommentUpdate({
          id: cmntToCmnt.id,
          content: {content: commentCaption},
        }),
          setCommentCaption('');
      } else
        setCommentToComment({
          id: cmntToCmnt.id,
          content: {content: commentCaption},
        }),
          setCommentCaption(''),
          cmntToCmnt.commentLvl !== 3
            ? setParentIdAddComment([...parentIdAddComment, cmntToCmnt.id])
            : setParentIdAddComment([
                ...parentIdAddComment,
                cmntToCmnt.parentID,
              ]);
    } else if (commentCaption.length > 0 && cmntToCmnt === undefined) {
      setCommentToPost({
        postId: musicianId,
        content: commentCaption,
      }),
        setCommentCaption(''),
        setCommmentCountLvl1(commentCountLvl1 + 1),
        dataPostDetail &&
          setParentIdAddComment([...parentIdAddComment, dataPostDetail.id]);
    } else null;
    if (updateComment) {
      handleUpdateStaticComment();
    } else {
      handleStaticComment();
    }
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
        parentID:
          cmntToCmnt?.id && cmntToCmnt?.commentLvl !== 3
            ? cmntToCmnt?.id
            : cmntToCmnt?.id && cmntToCmnt?.commentLvl === 3
            ? cmntToCmnt.parentID
            : '',
        commentsCount: 0,
        commentTotal: 0,
        commentLevel: cmntToCmnt?.commentLvl,
        createdAt: '',
        comments: [],
        isLiked: false,
        timeAgo: 'posting...',
        commentOwner: {
          UUID: dataProfile?.data.uuid ? dataProfile?.data.uuid : '',
          fullname: dataProfile?.data.fullname
            ? dataProfile?.data.fullname
            : '',
          username: dataProfile?.data.username
            ? dataProfile?.data.username
            : '',
          image: dataProfile?.data.imageProfileUrls
            ? dataProfile?.data.imageProfileUrls[0]?.image
            : '',
        },
      },
    ];
    setTemporaryIds(comment[0].id);

    if (dataComment === null) {
      if (cmntToCmntLvl0?.commentLvl === 0 && commentLvl1 !== undefined) {
        return (
          setCommentLvl1([...comment, ...commentLvl1]),
          setCmntToCmntLvl0(undefined),
          setStaticId([...staticId, comment[0].id])
        );
      } else if (
        cmntToCmntLvl0?.commentLvl === 0 &&
        commentLvl1 === undefined
      ) {
        return (
          setCommentLvl1(comment),
          setCmntToCmntLvl0(undefined),
          setStaticId([...staticId, comment[0].id])
        );
      } else if (cmntToCmnt?.commentLvl === 1 && commentLvl2 !== undefined) {
        return (
          setCommentLvl2([...comment, ...commentLvl2]),
          setStaticId([...staticId, comment[0].id])
        );
      } else if (cmntToCmnt?.commentLvl === 1 && commentLvl2 === undefined) {
        return (
          setCommentLvl2(comment), setStaticId([...staticId, comment[0].id])
        );
      } else if (cmntToCmnt?.commentLvl === 2 && commentLvl3 !== undefined) {
        return (
          setCommentLvl3([...comment, ...commentLvl3]),
          setStaticId([...staticId, comment[0].id])
        );
      } else if (cmntToCmnt?.commentLvl === 2 && commentLvl3 === undefined) {
        return (
          setCommentLvl3(comment), setStaticId([...staticId, comment[0].id])
        );
      } else if (cmntToCmnt?.commentLvl === 3 && commentLvl3 !== undefined) {
        return (
          setCommentLvl3([...comment, ...commentLvl3]),
          setStaticId([...staticId, comment[0].id])
        );
      } else if (cmntToCmnt?.commentLvl === 3 && commentLvl3 === undefined) {
        return (
          setCommentLvl3(comment), setStaticId([...staticId, comment[0].id])
        );
      }
    }
  };

  // * update dummy to real data
  useEffect(() => {
    if (dataComment !== null && temporaryIds) {
      if (dataComment.commentLevel === 1 && commentLvl1) {
        let theComment = commentLvl1;
        let theIndex = theComment?.findIndex((x: CommentList) =>
          temporaryIds.includes(x.id),
        );
        theIndex !== -1 && theComment?.splice(theIndex, 1, dataComment);
        theIndex !== -1
          ? setCommentLvl1(theComment)
          : setCommentLvl1([dataComment, ...commentLvl1]);
        setDataComment(null);
        setTemporaryIds(undefined);
      }
      if (dataComment.commentLevel === 2 && commentLvl2) {
        let theComment = commentLvl2;
        let theIndex = theComment?.findIndex((x: CommentList2) =>
          temporaryIds.includes(x.id),
        );
        theIndex !== -1 && theComment?.splice(theIndex, 1, dataComment);
        theIndex !== -1
          ? setCommentLvl2(theComment)
          : setCommentLvl2([dataComment, ...commentLvl2]);
        setDataComment(null);
        setTemporaryIds(undefined);
      }
      if (dataComment.commentLevel === 3 && commentLvl3) {
        let theComment = commentLvl3;
        let theIndex = theComment?.findIndex((x: CommentList3) =>
          temporaryIds.includes(x.id),
        );
        theIndex !== -1 && theComment?.splice(theIndex, 1, dataComment);
        theIndex !== -1
          ? setCommentLvl3(theComment)
          : setCommentLvl3([dataComment, ...commentLvl3]);
        setDataComment(null);
        setTemporaryIds(undefined);
        setDisallowStatic(true);
      }
    }
  }, [dataComment, temporaryIds]);

  // * reset all state when modal comment is closed
  const onModalCommentHide = () => {
    setCmntToCmnt(undefined);
    setIdComment(undefined);
    setSelectedMenu(undefined);
    setSelectedLvlComment(undefined);
    setUpdateComment(false);
    setCommentCaption('');
  };
  // ! End Of COMMENT AREA

  // ! UPDATE COMMENT AREA
  useEffect(() => {
    if (
      idComment !== undefined &&
      selectedMenu !== undefined &&
      selectedLvlComment !== undefined
    ) {
      // * delete/edit comment lvl1
      if (selectedLvlComment === 1 && commentLvl1) {
        let commentNow = commentLvl1.filter((x: CommentList) =>
          idComment.includes(x.id),
        )[0];
        if (t(selectedMenu.label) === 'Delete Reply') {
          setCommentLvl1(
            commentLvl1.filter((x: CommentList) => !idComment.includes(x.id)),
          );
          setCommentDelete({id: idComment});
          if (commentCountLvl1) {
            setCommmentCountLvl1(commentCountLvl1 - 1);
          }
          setParentIdDeletedComment([
            ...parentIdDeletedComment,
            commentNow.parentID,
          ]);
        }
        if (t(selectedMenu.label) === 'Edit Reply') {
          setCmntToCmnt({
            id: commentNow.id,
            userName: commentNow.commentOwner.username,
            commentLvl: selectedLvlComment,
            parentID: commentNow.parentID,
          });
          setCommentCaption(commentNow.caption);
          setUpdateComment(true);
          setDisallowStatic(false);
        }
      }

      // * delete/edit comment lvl2
      if (selectedLvlComment === 2 && commentLvl2) {
        let commentNow = commentLvl2.filter((x: CommentList2) =>
          idComment.includes(x.id),
        )[0];
        if (t(selectedMenu.label) === 'Delete Reply') {
          setCommentLvl2(
            commentLvl2.filter((x: CommentList2) => !idComment.includes(x.id)),
          );
          setCommentDelete({id: idComment});
          setParentIdDeletedComment([
            ...parentIdDeletedComment,
            commentNow.parentID,
          ]);
        }
        if (t(selectedMenu.label) === 'Edit Reply') {
          setCmntToCmnt({
            id: commentNow.id,
            userName: commentNow.commentOwner.username,
            commentLvl: selectedLvlComment,
            parentID: commentNow.parentID,
          });
          setCommentCaption(commentNow.caption);
          setUpdateComment(true);
          setDisallowStatic(false);
        }
      }
      // * delete/edit comment lvl3
      if (selectedLvlComment === 3 && commentLvl3) {
        let commentNow = commentLvl3.filter((x: CommentList3) =>
          idComment.includes(x.id),
        )[0];
        if (t(selectedMenu.label) === 'Delete Reply') {
          setCommentLvl3(
            commentLvl3.filter((x: CommentList3) => !idComment.includes(x.id)),
          );
          setCommentDelete({id: idComment});
          setParentIdDeletedComment([
            ...parentIdDeletedComment,
            commentNow.parentID,
          ]);
        }
        if (t(selectedMenu.label) === 'Edit Reply') {
          setCmntToCmnt({
            id: commentNow.id,
            userName: commentNow.commentOwner.username,
            commentLvl: selectedLvlComment,
            parentID: commentNow.parentID,
          });
          setCommentCaption(commentNow.caption);
          setUpdateComment(true);
          setDisallowStatic(false);
        }
      }
      // ? the call of update api will be handled on handleReplyOnPress
    }
  }, [idComment, selectedMenu, selectedLvlComment]);

  const handleUpdateStaticComment = () => {
    setDelStaticComment(-1);
    let commentUpdate = [
      {
        id: cmntToCmnt?.id ? cmntToCmnt?.id.toString() : '',
        caption: commentCaption,
        likesCount: 0,
        repliedTo: cmntToCmnt?.userName ? cmntToCmnt?.userName : '',
        parentID: cmntToCmnt?.parentID ? cmntToCmnt?.parentID : '',
        commentsCount: 0,
        commentTotal: 0,
        commentLevel: cmntToCmnt?.commentLvl,
        createdAt: '',
        comments: [],
        isLiked: false,
        timeAgo: 'posting...',
        commentOwner: {
          UUID: dataProfile?.data.uuid ? dataProfile?.data.uuid : '',
          fullname: dataProfile?.data.fullname
            ? dataProfile?.data.fullname
            : '',
          username: dataProfile?.data.username
            ? dataProfile?.data.username
            : '',
          image: dataProfile?.data.imageProfileUrls
            ? dataProfile?.data.imageProfileUrls[0]?.image
            : '',
        },
      },
    ];
    setTemporaryIds(commentUpdate[0].id);
    if (cmntToCmnt?.commentLvl === 1 && commentLvl1) {
      let theComment = commentLvl1;
      let theIndex = theComment?.findIndex((x: CommentList) =>
        cmntToCmnt.id.includes(x.id),
      );
      theComment?.splice(theIndex, 1, commentUpdate[0]);
      setCommentLvl1(theComment);
    }
    if (cmntToCmnt?.commentLvl === 2 && commentLvl2) {
      let theComment = commentLvl2;
      let theIndex = theComment?.findIndex((x: CommentList2) =>
        cmntToCmnt.id.includes(x.id),
      );
      theComment?.splice(theIndex, 1, commentUpdate[0]);
      setCommentLvl2(theComment);
    }
    if (
      cmntToCmnt?.commentLvl === 3 &&
      commentLvl3 &&
      disallowStatic === false
    ) {
      let theComment = commentLvl3;
      let theIndex = theComment?.findIndex((x: CommentList3) =>
        cmntToCmnt.id.includes(x.id),
      );
      theComment?.splice(theIndex, 1, commentUpdate[0]);
      setCommentLvl3(theComment);
    }

    setUpdateComment(false);
  };
  // ! END OF UPDATE COMMENT AREA

  // ! LIKE AREA
  // * Handle Like / Unlike on Post
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

  // * Handle Like / Unlike on Comment Section
  useEffect(() => {
    likeCommentId !== '' && setLikeComment({id: likeCommentId});
  }, [likeCommentId]);

  useEffect(() => {
    unlikeCommentId !== '' && setUnlikeComment({id: unlikeCommentId});
  }, [unlikeCommentId]);
  // ! End Of LIKE AREA

  // ! UPDATE POST AREA
  useEffect(() => {
    if (
      selectedIdPost !== undefined &&
      selectedMenuPost !== undefined &&
      dataPostDetail
    ) {
      if (t(selectedMenuPost.label) === 'Delete Post') {
        setDeletePost({id: selectedIdPost});
        setSelectedMenuPost(undefined);
      }
      if (t(selectedMenuPost.label) === 'Edit Post') {
        const toEditPost: PostList = {
          id: dataPostDetail.id,
          caption: dataPostDetail.caption,
          likesCount: dataPostDetail.likesCount,
          commentsCount: dataPostDetail.commentsCount,
          category: dataPostDetail.category,
          images: dataPostDetail.images,
          createdAt: dataPostDetail.createdAt,
          updatedAt: dataPostDetail.updatedAt,
          isPremiumPost: dataPostDetail.isPremium,
          musician: dataPostDetail.musician,
          isLiked: dataPostDetail.isLiked,
          quoteToPost: dataPostDetail.quoteToPost,
          video: dataPostDetail.video,
          timeAgo: dataPostDetail.timeAgo,
          isSubscribe: dataPostDetail.isSubscribe,
        };

        navigation.navigate('CreatePost', {postData: toEditPost});
        setSelectedMenuPost(undefined);
      }
    }
  }, [selectedIdPost, selectedMenuPost]);

  useEffect(() => {
    if (dataDeletePost) {
      show && setWithoutBottomTab(false);
      navigation.goBack();
    }
  }, [dataDeletePost, show]);
  // ! END OF UPDATE POST AREA

  // ! MUSIC AREA
  const onPressPlaySong = (val: PostList) => {
    let data = [val];
    addPlaylistFeed({
      dataSong: data,
      playSongId: Number(val.quoteToPost.targetId),
      isPlay: true,
    });
    setPlaySong();
    setPauseModeOn(true);
    setIdNowPlaing(val.id);
    hidePlayer();
  };

  const handlePausePlay = () => {
    if (isPlaying) {
      setPauseSong();
    } else {
      setPlaySong();
    }
  };
  // ! END OF MUSIC AREA

  // ? Credit onPress
  const tokenOnPress = () => {
    setModalDonate(true);
  };

  const shareOnPress = (
    musicianId: string,
    MyPost: boolean,
    content: DetailPostData,
  ) => {
    setModalShare(true);
    setSelectedSharePost(content);
    if (MyPost) {
      setSelectedMusicianId(musicianId);
    }
  };

  const onModalShareHide = () => {
    setToastVisible(true);
    setIsCopied(false);
  };

  const onPressCopy = () => {
    setIsCopied(true);
    if (Clipboard && Clipboard.setString) {
      Clipboard.setString(shareLink);
      sendLogShare({id: selectedMusicianId});
    }
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

  // ! Navigate to Fans / Musician Area
  const handleToDetailMusician = (id: string) => {
    navigation.navigate('MusicianProfile', {id});
  };
  const handleToDetailCommentator = (id: string) => {
    getCheckUser({id});
    setIdUserTonavigate(id);
  };

  useEffect(() => {
    if (idUserTonavigate && dataUserCheck !== '') {
      if (idUserTonavigate === MyUuid) {
        navigation2.navigate('Profile', {});
      } else if (dataUserCheck === 'Musician') {
        return (
          handleToDetailMusician(idUserTonavigate),
          setDataUserCheck(''),
          setIdUserTonavigate(undefined)
        );
      } else if (dataUserCheck === 'Fans') {
        return (
          navigation.navigate('OtherUserProfile', {id: idUserTonavigate}),
          setDataUserCheck(''),
          setIdUserTonavigate(undefined)
        );
      }
    }
  }, [dataUserCheck, idUserTonavigate]);
  // ! End of Navigate to Fans / Musician Area

  const handleBackAction = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  // SHARE LINK
  useEffect(() => {
    if (selectedSharePost) {
      getShareLink({
        scheme: `/feed/${selectedSharePost.id}`,
        image: imageShare(selectedSharePost),
        title: t('ShareLink.Feed.Title', {
          musician: selectedSharePost.musician.fullname,
        }),
        description: selectedSharePost.caption
          ? elipsisText(selectedSharePost.caption, 50)
          : t('ShareLink.Feed.Subtitle'),
      });
    }
  }, [selectedSharePost]);

  return (
    <View style={styles.root}>
      {/* Header Section */}
      <TopNavigation.Type1
        title={`${musicianName} ${t('Post.Title')}`}
        leftIconAction={handleBackAction}
        maxLengthTitle={40}
        itemStrokeColor={color.Neutral[10]}
      />
      {/* Post Detail Section */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContainer}>
          {dataPostDetail ? (
            <>
              <ListCard.PostList
                disabled
                toDetailOnPress={() =>
                  handleToDetailMusician(data.musician.uuid)
                }
                musicianName={musicianName}
                musicianId={`@${data.musician.username}`}
                imgUri={
                  data.musician.imageProfileUrls.length !== 0
                    ? data.musician.imageProfileUrls[0]?.image
                    : ''
                }
                postDate={
                  data?.timeAgo ? data.timeAgo : dateFormat(data.createdAt)
                }
                postDate2={data.createdAt}
                category={categoryNormalize(data.category)}
                onPress={() => {}}
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
                tokenOnPress={tokenOnPress}
                shareOnPress={() =>
                  shareOnPress(
                    data.id,
                    dataPostDetail.musician.uuid === dataProfile?.data.uuid,
                    dataPostDetail,
                  )
                }
                commentOnPress={() => commentOnPress(data.id, musicianName)}
                commentCount={commentCountLvl1}
                myPost={dataPostDetail.musician.uuid === dataProfile?.data.uuid}
                selectedMenu={setSelectedMenu}
                idPost={dataPostDetail.id}
                selectedIdPost={setSelectedIdPost}
                isPremium={data.isPremiumPost}
                disableComment={false}
                children={
                  <DetailChildrenCard
                    data={dataPostDetail}
                    onPress={onPressPlaySong}
                    isPlay={isPlaying}
                    playOrPause={handlePausePlay}
                    pauseModeOn={pauseModeOn}
                    currentProgress={playerProgress.position}
                    duration={playerProgress.duration}
                    seekPlayer={seekPlayer}
                    isIdNowPlaying={dataPostDetail.id === idNowPlaying}
                  />
                }
              />
              <Gap height={18} />
            </>
          ) : null}
        </View>

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
            toDetailOnPress={handleToDetailCommentator}
            selectedMenu={setSelectedMenu}
            selectedIdComment={setIdComment}
            selectedLvlComment={setSelectedLvlComment}
            profileUUID={dataProfile?.data.uuid ? dataProfile.data.uuid : ''}
            deletedCommentParentId={parentIdDeletedComment}
            addCommentParentId={parentIdAddComment}
          />
        ) : null}
        <ImageModal
          toggleModal={() => setModalVisible(!isModalVisible)}
          modalVisible={isModalVisible}
          imageIdx={imgUrl}
          dataImage={dataPostDetail?.images}
        />
        {/* // ! Modal Comment */}
        <CommentInputModal
          toggleModal={() => setInputCommentModal(!inputCommentModal)}
          modalVisible={inputCommentModal}
          name={userName}
          commentValue={commentCaption}
          onCommentChange={setCommentCaption}
          handleOnPress={handleReplyOnPress}
          onModalHide={onModalCommentHide}
          userAvatarUri={dataProfileImg}
        />
        <ModalShare
          url={shareLink}
          modalVisible={modalShare}
          onPressClose={() => setModalShare(false)}
          titleModal={t('General.Share.Feed')}
          hideMusic
          onPressCopy={onPressCopy}
          onModalHide={
            isCopied
              ? onModalShareHide
              : () => console.log(modalShare, 'modal is hide')
          }
          disabled={!successGetLink}
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
                {t('General.LinkCopied')}
              </Text>
            </View>
          }
          modalStyle={{marginHorizontal: widthResponsive(24)}}
        />
        <ModalDonate
          userId={data.musician.uuid}
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
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  bodyContainer: {
    width: '100%',
    marginTop: mvs(16),
  },
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
