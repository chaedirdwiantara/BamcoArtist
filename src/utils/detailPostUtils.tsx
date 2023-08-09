import {DetailPostData, PostPropsTypeA} from '../interface/feed.interface';

export const getLikeCount = (
  likePressed: boolean | undefined,
  dataPostDetail: DetailPostData,
) => {
  let likeCount;
  if (likePressed === undefined) {
    likeCount = dataPostDetail.likesCount;
  } else if (likePressed) {
    likeCount = dataPostDetail.isLiked
      ? dataPostDetail.likesCount
      : dataPostDetail.likesCount + 1;
  } else {
    likeCount = dataPostDetail.isLiked
      ? dataPostDetail.likesCount - 1
      : dataPostDetail.likesCount;
  }
  return likeCount;
};

export const getLikePressedStatus = (
  likePressed: boolean | undefined,
  dataPostDetail: DetailPostData,
) => {
  let likePressedStatus;
  if (likePressed === undefined) {
    likePressedStatus = dataPostDetail.isLiked;
  } else {
    likePressedStatus = likePressed;
  }
  return likePressedStatus;
};

export const useLikeStatus = (
  id: string,
  isLiked: boolean,
  likePressed: boolean | undefined,
  setUnlikePost: (props?: PostPropsTypeA | undefined) => Promise<void>,
  setLikePost: (props?: PostPropsTypeA | undefined) => Promise<void>,
  setLikePressed: (value: React.SetStateAction<boolean | undefined>) => void,
) => {
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
