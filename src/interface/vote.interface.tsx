import {imageTypes} from './base.interface';
import {
  MusicianData,
  PollingOptions,
  QuoteToPost,
  VideoResponseType,
} from './feed.interface';

export interface VoteParamsProps {
  postId: string;
  optionId: string;
}
export interface dataVoteProps {
  id: string;
  text: string;
}

export type VoteData = {
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

export type VoteDataResponseType = {
  code: number;
  data: VoteData;
  message: string;
  status: number;
};
