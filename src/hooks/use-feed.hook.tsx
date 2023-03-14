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
  listTopPost,
  updatePost,
  deletePost,
} from '../api/feed.api';
import {ParamsProps} from '../interface/base.interface';
import {
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
} from '../interface/feed.interface';

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
    setDataLoadMore,
    setDataComment,
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
  };
};
