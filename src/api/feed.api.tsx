import SsuAPI from './base';
import {
  CommentDetailResponseType,
  CommentResponseType,
  CommentUpdateResponseType,
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
    url: '/posts',
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

// => Detail Post Area
export const detailPost = async (
  props?: PostPropsTypeA,
): Promise<DetailPostResponseType> => {
  const {data} = await SsuAPI().request<DetailPostResponseType>({
    url: `/posts/${props?.id}`,
    method: 'GET',
  });

  return data;
};

// => like / Unlike Area
export const likePost = async (
  props?: PostPropsTypeA,
): Promise<LikePostResponseType> => {
  const {data} = await SsuAPI().request<LikePostResponseType>({
    url: `/posts/${props?.id}/like`,
    method: 'POST',
  });

  return data;
};

export const unlikePost = async (
  props?: PostPropsTypeA,
): Promise<UnlikePostResponseType> => {
  const {data} = await SsuAPI().request<UnlikePostResponseType>({
    url: `/posts/${props?.id}/unlike`,
    method: 'POST',
  });

  return data;
};

// => Comment Area
export const likeComment = async (
  props?: PostPropsTypeA,
): Promise<LikePostResponseType> => {
  const {data} = await SsuAPI().request<LikePostResponseType>({
    url: `/comments/${props?.id}/like`,
    method: 'POST',
  });

  return data;
};

export const unlikeComment = async (
  props?: PostPropsTypeA,
): Promise<UnlikePostResponseType> => {
  const {data} = await SsuAPI().request<UnlikePostResponseType>({
    url: `/comments/${props?.id}/unlike`,
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
    url: `/posts/${props?.id}/comments/create`,
    method: 'POST',
    data: props?.content,
  });

  return data;
};

export const commmentToComment = async (
  props?: PostPropsTypeB,
): Promise<CommentResponseType> => {
  const {data} = await SsuAPI().request<CommentResponseType>({
    url: `/comments/${props?.id}/create`,
    method: 'POST',
    data: props?.content,
  });

  return data;
};

export const commmentUpdate = async (
  props?: PostPropsTypeB,
): Promise<CommentUpdateResponseType> => {
  const {data} = await SsuAPI().request<CommentUpdateResponseType>({
    url: `/comments/${props?.id}/update`,
    method: 'PATCH',
    data: props?.content,
  });

  return data;
};

export const commmentDelete = async (
  props?: PostPropsTypeA,
): Promise<CommentResponseType> => {
  const {data} = await SsuAPI().request<CommentResponseType>({
    url: `/comments/${props?.id}/delete`,
    method: 'DELETE',
  });

  return data;
};
