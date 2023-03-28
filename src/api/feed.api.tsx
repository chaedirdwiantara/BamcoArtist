import SsuAPI from './baseMusician';
import SsuAPIPublic from './basePublic';
import SsuAPINew from './baseRinjaniNew';
import {
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
  PostPropsTypeA,
  PostPropsTypeB,
  PostPropsTypeC,
  UnlikePostResponseType,
} from '../interface/feed.interface';
import {ParamsProps} from '../interface/base.interface';

// => List Post Area
export const listPost = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/post/public',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listTopPost = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/post/top-post',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listMyPost = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/post',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listPostExclusive = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/posts/premium',
    method: 'GET',
    params: props,
  });

  return data;
};

export const listPostSimilar = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPINew().request<ListPostResponseType>({
    url: '/posts/similar-post',
    method: 'GET',
    params: props,
  });

  return data;
};

// => Detail Post Area
export const detailPost = async (
  props?: PostPropsTypeA,
): Promise<DetailPostResponseType> => {
  const {data} = await SsuAPI().request<DetailPostResponseType>({
    url: `/post/find/${props?.id}`,
    method: 'GET',
  });

  return data;
};

// => like / Unlike Area
export const likePost = async (
  props?: PostPropsTypeA,
): Promise<LikePostResponseType> => {
  const {data} = await SsuAPI().request<LikePostResponseType>({
    url: `/post/like/${props?.id}`,
    method: 'POST',
  });

  return data;
};

export const unlikePost = async (
  props?: PostPropsTypeA,
): Promise<UnlikePostResponseType> => {
  const {data} = await SsuAPI().request<UnlikePostResponseType>({
    url: `/post/unlike/${props?.id}`,
    method: 'POST',
  });

  return data;
};

// => Comment Area
export const likeComment = async (
  props?: PostPropsTypeA,
): Promise<LikePostResponseType> => {
  const {data} = await SsuAPI().request<LikePostResponseType>({
    url: `/comment/like/${props?.id}`,
    method: 'POST',
  });

  return data;
};

export const unlikeComment = async (
  props?: PostPropsTypeA,
): Promise<UnlikePostResponseType> => {
  const {data} = await SsuAPI().request<UnlikePostResponseType>({
    url: `/comment/unlike/${props?.id}`,
    method: 'POST',
  });

  return data;
};

export const loadMore = async (
  props?: LoadMoreProps,
): Promise<ListCommentResponseType> => {
  const {data} = await SsuAPI().request<ListCommentResponseType>({
    url: `/comment/list/${props?.id}`,
    method: 'GET',
    params: props?.params,
  });

  return data;
};

export const commentDetail = async (
  props?: PostPropsTypeA,
): Promise<CommentDetailResponseType> => {
  const {data} = await SsuAPI().request<CommentDetailResponseType>({
    url: `/comments/${props?.id}`,
    method: 'GET',
  });

  return data;
};

export const commmentToPost = async (
  props?: PostPropsTypeC,
): Promise<CommentResponseType> => {
  const {data} = await SsuAPI().request<CommentResponseType>({
    url: `/post/comment/create`,
    method: 'POST',
    data: props,
  });

  return data;
};

export const commmentToComment = async (
  props?: PostPropsTypeB,
): Promise<CommentResponseType> => {
  const {data} = await SsuAPI().request<CommentResponseType>({
    url: `/comment/create/${props?.id}`,
    method: 'POST',
    data: props?.content,
  });

  return data;
};

export const commmentUpdate = async (
  props?: PostPropsTypeB,
): Promise<CommentUpdateResponseType> => {
  const {data} = await SsuAPI().request<CommentUpdateResponseType>({
    url: `/comment/update/${props?.id}`,
    method: 'PATCH',
    data: props?.content,
  });

  return data;
};

export const commmentDelete = async (
  props?: PostPropsTypeA,
): Promise<CommentResponseType> => {
  const {data} = await SsuAPI().request<CommentResponseType>({
    url: `/comment/delete/${props?.id}`,
    method: 'DELETE',
  });

  return data;
};

export const createPost = async (
  props?: CreatePostProps,
): Promise<CreatePostResponseType> => {
  const {data} = await SsuAPI().request<CreatePostResponseType>({
    url: `/post/create`,
    method: 'POST',
    data: props,
  });

  return data;
};

export const updatePost = async (
  props?: CreatePostProps,
): Promise<CreatePostResponseType> => {
  const {data} = await SsuAPI().request<CreatePostResponseType>({
    url: `/post/update/${props?.id}`,
    method: 'POST',
    data: props,
  });

  return data;
};

export const deletePost = async (
  props?: PostPropsTypeA,
): Promise<DeletePostResponseType> => {
  const {data} = await SsuAPI().request<DeletePostResponseType>({
    url: `/post/delete/${props?.id}`,
    method: 'DELETE',
  });

  return data;
};
