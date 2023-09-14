import {useState} from 'react';
import {
  commentDetail,
  commmentDelete,
  commmentToComment,
  commmentToPost,
  commmentUpdate,
  detailPost,
  likeComment,
  likePost,
  listPost,
  listMyPost,
  loadMore,
  unlikeComment,
  unlikePost,
  createPost,
  listPostExclusive,
  listPostSimilar,
  listTopPost,
  updatePost,
  deletePost,
  listPostProfile,
  mostPlayedSong,
  viewsCount,
  AnalyticPost,
} from '../api/feed.api';
import {ParamsProps} from '../interface/base.interface';
import {
  AnalyticPostData,
  CommentDetailData,
  CommentList,
  CreatePostProps,
  CreatePostResponseData,
  DataComment,
  DetailPostData,
  LoadMoreProps,
  PostList,
  PostPropsTypeA,
  PostPropsTypeB,
  PostPropsTypeC,
  QuoteToPost,
  ViewsCount,
} from '../interface/feed.interface';
import {sendShareLogEP, sendViewLogEP} from '../api/analytics.api';
import {LogData} from '../interface/analythic.interface';

export const useFeedHook = () => {
  const [feedIsLoading, setFeedIsLoading] = useState(true);
  const [dataPostList, setDataPostList] = useState<PostList[]>([]);
  const [dataPostDetail, setDataPostDetail] = useState<DetailPostData>();
  const [dataTopPost, setDataTopPost] = useState<PostList[]>([]);
  const [feedIsError, setFeedIsError] = useState<boolean>(false);
  const [feedMessage, setFeedMessage] = useState<string>('');

  const getListDataPost = async (props?: ParamsProps) => {
    setFeedIsLoading(true);
    setFeedIsError(false);
    try {
      const response = await listPost(props);
      setDataPostList(response.data);
      setFeedMessage(response.message);
    } catch (error) {
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };
  const getListDataPostQuery = async (props?: ParamsProps) => {
    try {
      const response = await listPost(props);
      return {
        data: response?.data,
        meta: response?.meta,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getListProfilePost = async (props?: ParamsProps) => {
    setFeedIsLoading(true);
    try {
      const response = await listPostProfile(props);
      setDataPostList(response.data);
      setFeedMessage(response.message);
    } catch (error) {
      console.log(error);
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };

  const getListTopPost = async (props?: ParamsProps) => {
    setFeedIsLoading(true);
    setFeedIsError(false);
    try {
      const response = await listTopPost(props);
      setDataTopPost(response.data);
      setFeedMessage(response.message);
    } catch (error) {
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };

  const getListDataMyPost = async (props?: ParamsProps) => {
    setFeedIsLoading(true);
    setFeedIsError(false);
    try {
      const response = await listMyPost(props);
      setDataPostList(response.data);
      setFeedMessage(response.message);
    } catch (error) {
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };
  const getListDataMyPostQuery = async (props?: ParamsProps) => {
    try {
      const response = await listMyPost(props);
      return {
        data: response?.data,
        meta: response?.meta,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getListDataExclusivePost = async (props?: ParamsProps) => {
    setFeedIsLoading(true);
    setFeedIsError(false);
    try {
      const response = await listPostExclusive(props);
      setDataPostList(response.data);
      setFeedMessage(response.message);
    } catch (error) {
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };
  const getListDataExclusiveQuery = async (props?: ParamsProps) => {
    try {
      const response = await listPostExclusive(props);
      return {
        data: response?.data,
        meta: response?.meta,
        message: response?.message,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getListSimilarPost = async (props?: ParamsProps) => {
    setFeedIsLoading(true);
    setFeedIsError(false);
    try {
      const response = await listPostSimilar(props);
      setDataPostList(response.data);
      setFeedMessage(response.message);
    } catch (error) {
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };

  const getDetailPost = async (props?: PostPropsTypeA) => {
    setFeedIsLoading(true);
    setFeedIsError(false);
    try {
      const response = await detailPost(props);
      setDataPostDetail(response.data);
    } catch (error) {
      setFeedIsError(true);
    } finally {
      setFeedIsLoading(false);
    }
  };

  // Analytics area
  const [analyticPostLoading, setAnalyticPostLoading] = useState(true);
  const [analyticPostError, setAnalyticPostError] = useState<boolean>(false);
  const [analyticPostMessage, setAnalyticPostMessage] = useState<string>('');
  const [analyticPostData, setAnalyticPostData] = useState<AnalyticPostData>();

  const getAnalyticPopularPost = async (props?: ParamsProps) => {
    setAnalyticPostLoading(true);
    setAnalyticPostError(false);
    try {
      const response = await AnalyticPost(props);
      setAnalyticPostData(response.data);
      setAnalyticPostMessage(response.message);
    } catch (error) {
      setAnalyticPostError(true);
    } finally {
      setAnalyticPostLoading(false);
    }
  };

  // Like Unlike Area
  const [likePostLoading, setLikePostLoading] = useState(false);
  const [dataLike, setDataLike] = useState<string | null>(null);
  const setLikePost = async (props?: PostPropsTypeA) => {
    setLikePostLoading(true);
    try {
      const response = await likePost(props);
      setDataLike(response.data);
    } catch (error) {
      console.log(error);
      setDataLike(null);
    } finally {
      setLikePostLoading(false);
    }
  };

  const setUnlikePost = async (props?: PostPropsTypeA) => {
    setLikePostLoading(true);
    try {
      const response = await unlikePost(props);
      setDataLike(response.data);
    } catch (error) {
      console.log(error);
      setDataLike(null);
    } finally {
      setLikePostLoading(false);
    }
  };

  // Comment Area
  const [commentLoading, setCommentLoading] = useState(false);
  const [LoadMoreLoading, setLoadMoreLoading] = useState(false);
  const [commentDetailLoading, setCommentDetailLoading] = useState(false);
  const [commentUpdateLoading, setCommentUpdateLoading] = useState(false);
  const [commentDeleteLoading, setCommentDeleteLoading] = useState(false);
  const [dataComment, setDataComment] = useState<DataComment | null>(null);
  const [dataLoadMore, setDataLoadMore] = useState<CommentList[] | null>(null);
  const [dataCommentDetail, setDataCommentDetail] =
    useState<CommentDetailData | null>(null);
  const [dataLikeComment, setDataLikeComment] = useState<string | null>(null);
  const [likeCommentLoading, setLikeCommentLoading] = useState(false);

  const setLikeComment = async (props?: PostPropsTypeA) => {
    setLikeCommentLoading(true);
    try {
      const response = await likeComment(props);
      setDataLikeComment(response.data);
    } catch (error) {
      console.log(error);
      setDataLikeComment(null);
    } finally {
      setLikeCommentLoading(false);
    }
  };

  const setUnlikeComment = async (props?: PostPropsTypeA) => {
    setLikeCommentLoading(true);
    try {
      const response = await unlikeComment(props);
      setDataLikeComment(response.data);
    } catch (error) {
      console.log(error);
      setDataLikeComment(null);
    } finally {
      setLikeCommentLoading(false);
    }
  };

  const setLoadMore = async (props?: LoadMoreProps) => {
    setLoadMoreLoading(true);
    try {
      const response = await loadMore(props);
      setDataLoadMore(response.data);
    } catch (error) {
      console.log(error);
      setDataLoadMore(null);
    } finally {
      setLoadMoreLoading(false);
    }
  };

  const setCommentDetail = async (props?: PostPropsTypeA) => {
    setCommentDetailLoading(true);
    try {
      const response = await commentDetail(props);
      setDataCommentDetail(response.data);
    } catch (error) {
      console.log(error);
      setDataCommentDetail(null);
    } finally {
      setCommentDetailLoading(false);
    }
  };

  const setCommentToPost = async (props?: PostPropsTypeC) => {
    setCommentLoading(true);
    try {
      const response = await commmentToPost(props);
      setDataComment(response.data);
    } catch (error) {
      console.log(error);
      setDataComment(null);
    } finally {
      setCommentLoading(false);
    }
  };

  const setCommentToComment = async (props?: PostPropsTypeB) => {
    setCommentLoading(true);
    try {
      const response = await commmentToComment(props);
      setDataComment(response.data);
    } catch (error) {
      console.log(error);
      setDataComment(null);
    } finally {
      setCommentLoading(false);
    }
  };

  const setCommentUpdate = async (props?: PostPropsTypeB) => {
    setCommentUpdateLoading(true);
    try {
      const response = await commmentUpdate(props);
      setDataComment(response.data);
    } catch (error) {
      console.log(error);
      setDataComment(null);
    } finally {
      setCommentUpdateLoading(false);
    }
  };

  const setCommentDelete = async (props?: PostPropsTypeA) => {
    setCommentDeleteLoading(true);
    try {
      const response = await commmentDelete(props);
      setDataComment(response.data);
    } catch (error) {
      console.log(error);
      setDataComment(null);
    } finally {
      setCommentDeleteLoading(false);
    }
  };

  // CREATE POST AREA
  const [dataCreatePost, setDataCreatePost] =
    useState<CreatePostResponseData | null>(null);
  const [createPostLoading, setCreatePostLoading] = useState<boolean>(false);
  const [createPostError, setCreatePostError] = useState<boolean>(false);

  const setCreatePost = async (props?: CreatePostProps) => {
    setCreatePostLoading(true);
    try {
      const response = await createPost(props);
      setDataCreatePost(response.data);
    } catch (error) {
      console.log(error);
      setDataCreatePost(null);
      setCreatePostError(true);
    } finally {
      setCreatePostLoading(false);
    }
  };

  // UPDATE POST AREA
  const [dataUpdatePost, setDataUpdatePost] =
    useState<CreatePostResponseData | null>(null);
  const setUpdatePost = async (props?: CreatePostProps) => {
    setCreatePostLoading(true);
    try {
      const response = await updatePost(props);
      setDataUpdatePost(response.data);
    } catch (error) {
      console.log(error);
      setDataUpdatePost(null);
      setCreatePostError(true);
    } finally {
      setCreatePostLoading(false);
    }
  };

  // DELETE POST AREA
  const [deletePostLoading, setDeletePostLoading] = useState<boolean>(false);
  const [dataDeletePost, setDataDeletePost] = useState<string>();
  const [deletePostError, setDeletePostError] = useState<boolean>();
  const setDeletePost = async (props?: PostPropsTypeA) => {
    setDeletePostLoading(true);
    try {
      const response = await deletePost(props);
      setDataDeletePost(response.data);
      getListDataMyPost();
    } catch (error) {
      console.log(error);
      setDataDeletePost(undefined);
      setDeletePostError(true);
    } finally {
      setDeletePostLoading(false);
    }
  };

  // GET MOST PLAY MUSIC
  const [mostPlayedLoading, setMostPlayedLoading] = useState<boolean>(false);
  const [dataMostPlayed, setDataMostPlayed] = useState<QuoteToPost>();
  const [mostPlayedError, setMostPlayedError] = useState<boolean>();

  const getMostPlayed = async (props?: PostPropsTypeA) => {
    setMostPlayedLoading(true);
    try {
      const response = await mostPlayedSong(props);
      setDataMostPlayed(response.data);
    } catch (error) {
      setMostPlayedError(true);
    } finally {
      setMostPlayedLoading(false);
    }
  };

  // GET MOST PLAY MUSIC
  const [viewCountLoading, setViewCountLoading] = useState<boolean>(false);
  const [dataViewsCount, setDataViewCount] = useState<ViewsCount>();
  const [viewCountError, setViewCountError] = useState<boolean>();

  const setViewCount = async (props?: PostPropsTypeA) => {
    setViewCountLoading(true);
    try {
      const response = await viewsCount(props);
      setDataViewCount(response.data);
    } catch (error) {
      setViewCountError(true);
    } finally {
      setViewCountLoading(false);
    }
  };

  const [dataLog, setDataLog] = useState<LogData>();
  const [dataLogIsError, setDataLogIsError] = useState<boolean>(false);

  const sendLogView = async (props?: ParamsProps) => {
    try {
      const response = await sendViewLogEP(props);
      setDataLog(response.data);
    } catch (error) {
      setDataLogIsError(true);
    }
  };

  const sendLogShare = async (props?: ParamsProps) => {
    try {
      const response = await sendShareLogEP(props);
      setDataLog(response.data);
    } catch (error) {
      setDataLogIsError(true);
    }
  };

  return {
    feedIsLoading,
    likePostLoading,
    commentLoading,
    LoadMoreLoading,
    commentDetailLoading,
    dataLoadMore,
    feedIsError,
    feedMessage,
    dataPostList,
    dataLike,
    dataComment,
    dataCommentDetail,
    commentUpdateLoading,
    commentDeleteLoading,
    dataPostDetail,
    dataLikeComment,
    likeCommentLoading,
    dataCreatePost,
    createPostLoading,
    createPostError,
    dataTopPost,
    dataUpdatePost,
    deletePostLoading,
    dataDeletePost,
    deletePostError,
    mostPlayedLoading,
    dataMostPlayed,
    mostPlayedError,
    viewCountLoading,
    dataViewsCount,
    viewCountError,
    analyticPostLoading,
    analyticPostError,
    analyticPostMessage,
    analyticPostData,
    dataLog,
    dataLogIsError,
    setDataLoadMore,
    setDataComment,
    setDataCreatePost,
    setDeletePost,
    getListDataPost,
    getListDataMyPost,
    getListDataExclusivePost,
    setLikePost,
    setUnlikePost,
    setCommentToPost,
    setCommentToComment,
    setLoadMore,
    setCommentDetail,
    setCommentUpdate,
    setCommentDelete,
    getDetailPost,
    setLikeComment,
    setUnlikeComment,
    setCreatePost,
    getListTopPost,
    setUpdatePost,
    getListProfilePost,
    getMostPlayed,
    getListSimilarPost,
    setViewCount,
    getListDataPostQuery,
    getListDataExclusiveQuery,
    getListDataMyPostQuery,
    setCreatePostError,
    setDataUpdatePost,
    getAnalyticPopularPost,
    sendLogView,
    sendLogShare,
  };
};
