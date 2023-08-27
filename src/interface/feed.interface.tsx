import {PaginationType} from './base.interface';
import {dataVoteProps} from './vote.interface';

export type PostPropsTypeA = {
  id: string;
};

export type PostPropsTypeB = {
  id: string;
  content: {content: string};
};

export type PostPropsTypeC = {
  postId: string;
  content: string;
};

export type LoadMoreProps = {
  id: string;
  params: {
    page: number;
    perPage: number;
  };
};

export type CreatePostProps = {
  id?: string;
  caption: string;
  category: string;
  image?: string[];
  isPremium: boolean;
  quoteToPost?: {
    targetId: string;
    targetType: string;
    title: string;
    musician: string;
    coverImage: string;
    encodeDashUrl: string;
    encodeHlsUrl: string;
    startAt?: string;
    endAt?: string;
  };
  video?: {
    targetType: string;
    coverImage: string;
    encodeDashUrl: string;
    encodeHlsUrl: string;
    duration: number;
  };
  isPolling?: boolean;
  pollingOptions?: dataVoteProps[];
  pollDuration?: number;
};

export type DataComment = {
  id: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  commentTotal: number;
  commentLevel: number;
  created_at: string;
  comments: [];
  isLiked: boolean;
  timeAgo: string;
  commentOwner: {
    UUID: string;
    fullname: string;
    username: string;
    image: string;
  };
  repliedTo: string;
  parentID: string;
};

// => PostList Area

export type imageTypes = {
  image: string;
  presetName: string;
};

export type MusicianData = {
  uuid: string;
  username: string;
  fullname: string;
  email: string;
  isFollowed: boolean;
  imageProfileUrls: imageTypes[];
  followers: number;
};

export type QuoteToPost = {
  targetId: string;
  targetType: string;
  title: string;
  musician: string;
  coverImage: imageTypes[];
  encodeDashUrl: string;
  encodeHlsUrl: string;
  startAt: string;
  endAt: string;
  lyrics: string;
  originalSongUrl: string;
  musicianId?: string;
};

export type VideoResponseType = {
  coverImage: imageTypes[];
  encodeDashUrl: string;
  encodeHlsUrl: string;
  views: number;
  duration: string;
};

export type PollingOptions = {
  id: string;
  text: string;
  votes: number;
  isVoted: boolean;
  percent: number;
};

export type PostList = {
  id: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  category: string;
  images: imageTypes[][];
  createdAt: string;
  updatedAt: string;
  isPremiumPost: boolean;
  isSubscribe: boolean;
  musician: MusicianData;
  isLiked: boolean;
  quoteToPost: QuoteToPost;
  video: VideoResponseType;
  timeAgo: string;
  viewsCount: number;
  shareCount: number;
  reportSent?: boolean;
  isPolling: boolean;
  pollingOptions: PollingOptions[];
  pollDuration: number;
  pollCount: number;
  isOwner: boolean;
  isVoted: boolean;
  pollTimeLeft: string;
};

export type ListPostResponseType = {
  code: number;
  data: PostList[];
  message: string;
  meta: PaginationType;
  status: number;
};

export type AnalyticPostData = {
  caption: string;
  category: string;
  comments: [];
  commentsCount: number;
  createdAt: string;
  id: string;
  images: imageTypes[][];
  isLiked: boolean;
  isPremiumPost: boolean;
  likesCount: number;
  musician: MusicianData;
  quoteToPost: QuoteToPost;
  shareCount: number;
  timeAgo: string;
  updatedAt: string;
  video: VideoResponseType;
  viewsCount: number;
};

export type AnalyticPostResponseType = {
  code: number;
  data: AnalyticPostData;
  message: string;
  meta: PaginationType;
  status: number;
};

export type DetailPostData = {
  id: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  category: string;
  images: imageTypes[][];
  createdAt: string;
  updatedAt: string;
  comments: CommentList[];
  musician: MusicianData;
  isLiked: boolean;
  quoteToPost: QuoteToPost;
  isPremiumPost: boolean;
  video: VideoResponseType;
  timeAgo: string;
  isSubscribe: boolean;
  viewsCount: number;
  shareCount: number;
  reportSent: boolean;
};

export type DetailPostResponseType = {
  code: number;
  data: DetailPostData;
  message: string;
  status: number;
};

// => Like / Unlike Area
export type LikePostResponseType = {
  code: number;
  data: string;
  message: string;
  status: number;
};

export type UnlikePostResponseType = {
  code: number;
  data: string;
  message: string;
  status: number;
};

// => Comment Area
export type CommentList = {
  id: string;
  caption: string;
  likesCount: number;
  repliedTo: string;
  parentID: string;
  commentsCount: number;
  commentTotal: number;
  commentLevel?: number;
  createdAt?: string;
  comments: CommentList2[];
  isLiked: boolean;
  timeAgo: string;
  commentOwner: {
    UUID: string;
    fullname: string;
    username: string;
    image: string;
  };
};

export type CommentList2 = {
  id: string;
  caption: string;
  likesCount: number;
  repliedTo: string;
  parentID: string;
  commentsCount: number;
  commentTotal: number;
  commentLevel?: number;
  createdAt?: string;
  comments: CommentList3[];
  isLiked: boolean;
  timeAgo: string;
  commentOwner: {
    UUID: string;
    fullname: string;
    username: string;
    image: string;
  };
};

export type CommentList3 = {
  id: string;
  caption: string;
  likesCount: number;
  repliedTo: string;
  parentID: string;
  commentsCount: number;
  commentLevel?: number;
  createdAt?: string;
  isLiked: boolean;
  timeAgo: string;
  commentOwner: {
    UUID: string;
    fullname: string;
    username: string;
    image: string;
  };
};

export type ListCommentResponseType = {
  code: number;
  data: CommentList[];
  message: string;
  meta: PaginationType;
  status: number;
};

export type CommentDetailData = {
  id: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  commentLevel: number;
  createdAt: string;
  comments: null | [];
};

export type CommentDetailResponseType = {
  code: number;
  data: CommentDetailData;
  message: string;
  status: number;
};

export type CommentResponseType = {
  code: number;
  data: DataComment;
  message: string;
  status: number;
};

export type commentUpdateData = {
  id: string;
  caption: string;
  likes: number;
  comment_level: number;
  created_at: string;
};

export type CommentUpdateResponseType = {
  code: number;
  data: DataComment;
  message: string;
  status: number;
};

export type CreatePostResponseData = {
  id: string;
  caption: string;
  likesCount?: number;
  category: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
};

export type CreatePostResponseType = {
  code: number;
  data: CreatePostResponseData;
  message: string;
  status: number;
};

export type DeletePostResponseType = {
  code: number;
  data: string;
  message: string;
  status: number;
};

export type MostPlayedSongResponseType = {
  code: number;
  data: QuoteToPost;
  message: string;
  status: number;
};

export type ViewsCount = {};

export type SetViewsCountResponseType = {
  code: number;
  data: ViewsCount;
  message: string;
  status: number;
};

export type PostEngagementData = {
  avgView: string;
  avgViewCompare: 'improve' | 'regression' | 'same';
  avgViewProgress: string;
  avgLiked: string;
  avgLikedCompare: 'improve' | 'regression' | 'same';
  avgLikedProgress: string;
  avgComment: string;
  avgCommentCompare: 'improve' | 'regression' | 'same';
  avgCommentProgress: string;
  avgShared: string;
  avgSharedCompare: 'improve' | 'regression' | 'same';
  avgSharedProgress: string;
};

export type AnalyticPostEngagementResponseType = {
  code: number;
  data: PostEngagementData;
  message: string;
  status: number;
};
