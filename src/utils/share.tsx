import {
  AnalyticPostData,
  DetailPostData,
  PostList,
} from '../interface/feed.interface';

export const imageShare = (
  selectedSharePost: PostList | DetailPostData | AnalyticPostData,
) => {
  if (selectedSharePost?.images?.length > 0) {
    return selectedSharePost?.images[0][2].image;
  } else if (selectedSharePost?.quoteToPost?.coverImage?.length > 0) {
    return selectedSharePost?.quoteToPost.coverImage[0]?.image !== undefined
      ? selectedSharePost?.quoteToPost.coverImage[0].image
      : '';
  } else if (selectedSharePost?.video?.coverImage?.length > 0) {
    return selectedSharePost?.video?.coverImage[0]?.image !== undefined
      ? selectedSharePost?.video?.coverImage[0].image
      : '';
  } else {
    return '';
  }
};
