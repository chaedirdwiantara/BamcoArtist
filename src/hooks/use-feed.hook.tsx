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
  listPostExclusive,
  loadMore,
  unlikeComment,
  unlikePost,
} from '../api/feed.api';
import {ParamsProps} from '../interface/base.interface';
import {
  CommentDetailData,
  CommentList,
  DataComment,
  DetailPostData,
  LoadMoreProps,
  PostList,
  PostPropsTypeA,
  PostPropsTypeB,
} from '../interface/feed.interface';

export const useFeedHook = () => {
  const [feedIsLoading, setFeedIsLoading] = useState(false);
  const [dataPostList, setDataPostList] = useState<PostList[]>([]);
  const [dataPostDetail, setDataPostDetail] = useState<DetailPostData>();
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
  const [dataCmntToCmnt, setDataCmntToCmnt] = useState<DataComment | null>(
    null,
  );
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
      setDataCmntToCmnt(null);
    }
  };

  const setCommentToPost = async (props?: PostPropsTypeB) => {
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
      setDataCmntToCmnt(response.data);
    } catch (error) {
      console.log(error);
      setDataCmntToCmnt(null);
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
    dataCmntToCmnt,
    dataLikeComment,
    likeCommentLoading,
    setDataCmntToCmnt,
    getListDataPost,
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
  };
};
