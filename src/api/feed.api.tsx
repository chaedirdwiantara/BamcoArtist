import SsuAPI from './baseMusician';
import {
  CommentDetailResponseType,
  CommentResponseType,
  CommentUpdateResponseType,
  CreatePostProps,
  CreatePostResponseType,
  DetailPostResponseType,
  LikePostResponseType,
  ListCommentResponseType,
  ListPostResponseType,
  LoadMoreProps,
  PostPropsTypeA,
  PostPropsTypeB,
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

export const listMyPost = async (
  props?: ParamsProps,
): Promise<ListPostResponseType> => {
  const {data} = await SsuAPI().request<ListPostResponseType>({
    url: '/posts',
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
    url: `/comments/${props?.id}/list`,
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
  props?: PostPropsTypeB,
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
