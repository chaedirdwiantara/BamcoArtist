import SsuAPI from './baseRinjani';
import SsuSemeruPublic from './baseSemeru';
import {
  AnalyticPostResponseType,
  CommentDetailResponseType,
  CommentResponseType,
  CommentUpdateResponseType,
  CreatePostProps,
  CreatePostResponseType,
  DeletePostResponseType,
  DetailPostResponseType,
  LikePostResponseType,
  ListCommentResponseType,
  ListPostResponseType,
  LoadMoreProps,
  MostPlayedSongResponseType,
  PostPropsTypeA,
  PostPropsTypeB,
  PostPropsTypeC,
  SetViewsCountResponseType,
  UnlikePostResponseType,
} from '../interface/feed.interface';
import {ParamsProps} from '../interface/base.interface';

// => List Post Area
export const listPost = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/musician-app/post/public',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listTopPost = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/musician-app/post/top-post',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listPostProfile = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/musician-app/post/feeds',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listMyPost = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/musician-app/post/my-post',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listPostExclusive = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/musician-app/posts/premium',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listPostSimilar = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/posts/similar-post',
    method: 'GET',
    params: props,
  });

  return data;
};

export const AnalyticPost = async (
  props?: ParamsProps,
): Promise<AnalyticPostResponseType> => {
  const {data} = await SsuAPI().request<AnalyticPostResponseType>({
    url: `/musician-app/post/my-top-post/${props?.interval}`,
    method: 'GET',
  });

  return data;
};

// => Detail Post Area
export const detailPost = async (
  props?: PostPropsTypeA,
): Promise<DetailPostResponseType> => {
  const {data} = await SsuAPI().request<DetailPostResponseType>({
    url: `/musician-app/post/find/${props?.id}`,
    method: 'GET',
  });

  return data;
};

// => like / Unlike Area
export const likePost = async (
  props?: PostPropsTypeA,
): Promise<LikePostResponseType> => {
  const {data} = await SsuAPI().request<LikePostResponseType>({
    url: `/musician-app/post/like/${props?.id}`,
    method: 'POST',
  });

  return data;
};

export const unlikePost = async (
  props?: PostPropsTypeA,
): Promise<UnlikePostResponseType> => {
  const {data} = await SsuAPI().request<UnlikePostResponseType>({
    url: `/musician-app/post/unlike/${props?.id}`,
    method: 'POST',
  });

  return data;
};

// => Comment Area
export const likeComment = async (
  props?: PostPropsTypeA,
): Promise<LikePostResponseType> => {
  const {data} = await SsuAPI().request<LikePostResponseType>({
    url: `/musician-app/comment/like/${props?.id}`,
    method: 'POST',
  });

  return data;
};

export const unlikeComment = async (
  props?: PostPropsTypeA,
): Promise<UnlikePostResponseType> => {
  const {data} = await SsuAPI().request<UnlikePostResponseType>({
    url: `/musician-app/comment/unlike/${props?.id}`,
    method: 'POST',
  });

  return data;
};

export const loadMore = async (
  props?: LoadMoreProps,
): Promise<ListCommentResponseType> => {
  const {data} = await SsuAPI().request<ListCommentResponseType>({
    url: `/musician-app/comment/list/${props?.id}`,
    method: 'GET',
    params: props?.params,
  });

  return data;
};

export const commentDetail = async (
  props?: PostPropsTypeA,
): Promise<CommentDetailResponseType> => {
  const {data} = await SsuAPI().request<CommentDetailResponseType>({
    url: `/musician-app/comments/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const commmentToPost = async (
  props?: PostPropsTypeC,
): Promise<CommentResponseType> => {
  const {data} = await SsuAPI().request<CommentResponseType>({
    url: '/musician-app/post/comment/create',
    method: 'POST',
    data: props,
  });

  return data;
};

export const commmentToComment = async (
  props?: PostPropsTypeB,
): Promise<CommentResponseType> => {
  const {data} = await SsuAPI().request<CommentResponseType>({
    url: `/musician-app/comment/create/${props?.id}`,
    method: 'POST',
    data: props?.content,
  });

  return data;
};

export const commmentUpdate = async (
  props?: PostPropsTypeB,
): Promise<CommentUpdateResponseType> => {
  const {data} = await SsuAPI().request<CommentUpdateResponseType>({
    url: `/musician-app/comment/update/${props?.id}`,
    method: 'PATCH',
    data: props?.content,
  });

  return data;
};

export const commmentDelete = async (
  props?: PostPropsTypeA,
): Promise<CommentResponseType> => {
  const {data} = await SsuAPI().request<CommentResponseType>({
    url: `/musician-app/comment/delete/${props?.id}`,
    method: 'DELETE',
  });

  return data;
};

export const createPost = async (
  props?: CreatePostProps,
): Promise<CreatePostResponseType> => {
  const {data} = await SsuAPI().request<CreatePostResponseType>({
    url: '/musician-app/post/create',
    method: 'POST',
    data: props,
  });

  return data;
};

export const updatePost = async (
  props?: CreatePostProps,
): Promise<CreatePostResponseType> => {
  const {data} = await SsuAPI().request<CreatePostResponseType>({
    url: `/musician-app/post/update/${props?.id}`,
    method: 'POST',
    data: props,
  });

  return data;
};

export const deletePost = async (
  props?: PostPropsTypeA,
): Promise<DeletePostResponseType> => {
  const {data} = await SsuAPI().request<DeletePostResponseType>({
    url: `/musician-app/post/delete/${props?.id}`,
    method: 'DELETE',
  });

  return data;
};

export const mostPlayedSong = async (
  props?: PostPropsTypeA,
): Promise<MostPlayedSongResponseType> => {
  const {data} = await SsuSemeruPublic().request<MostPlayedSongResponseType>({
    url: `/songs/most-play-song/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const viewsCount = async (
  props?: PostPropsTypeA,
): Promise<SetViewsCountResponseType> => {
  const {data} = await SsuAPI().request<SetViewsCountResponseType>({
    url: `/posts/${props?.id}/watch-video`,
    method: 'POST',
  });

  return data;
};
