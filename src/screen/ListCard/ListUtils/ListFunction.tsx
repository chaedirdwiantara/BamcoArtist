import {useEffect} from 'react';
import {PostList, PostPropsTypeA} from '../../../interface/feed.interface';
import {ParamsProps} from '../../../interface/base.interface';

export const playSongOnFeed = (
  val: PostList,
  addPlaylistFeed: ({
    dataSong,
    playSongId,
    isPlay,
  }: {
    dataSong: PostList[];
    playSongId?: number;
    isPlay?: boolean;
  }) => Promise<void>,
  setPauseModeOn: React.Dispatch<React.SetStateAction<boolean>>,
  setIdNowPlaing: React.Dispatch<React.SetStateAction<string | undefined>>,
  setPlaySong: () => void,
  hidePlayer: () => void,
) => {
  let data = [val];
  addPlaylistFeed({
    dataSong: data,
    playSongId: Number(val.quoteToPost.targetId),
    isPlay: true,
  });
  setPauseModeOn(true);
  setIdNowPlaing(val.id);
  setPlaySong();
  hidePlayer();
};

export const likePressedOnFeed = (
  id: string,
  isLiked: boolean,
  selectedId: string[] | undefined,
  setSelectedId: React.Dispatch<React.SetStateAction<string[] | undefined>>,
  setUnlikePost: (props?: PostPropsTypeA | undefined) => Promise<void>,
  setLikePost: (props?: PostPropsTypeA | undefined) => Promise<void>,
  setRecorder: React.Dispatch<React.SetStateAction<string[]>>,
  recorder: string[],
) => {
  if (isLiked === true && selectedId === undefined) {
    setUnlikePost({id});
    setSelectedId([]);
    if (!recorder.includes(id)) {
      setRecorder([...recorder, id]);
    }
  }
  if (isLiked === true && !selectedId?.includes(id) && !recorder.includes(id)) {
    setUnlikePost({id});
    if (!recorder.includes(id)) {
      setRecorder([...recorder, id]);
    }
  }
  if (
    isLiked === false &&
    !selectedId?.includes(id) &&
    !recorder.includes(id)
  ) {
    setLikePost({id});
    setSelectedId(selectedId ? [...selectedId, id] : [id]);
    if (!recorder.includes(id)) {
      setRecorder([...recorder, id]);
    }
  }
  if (isLiked === true && !selectedId?.includes(id) && recorder.includes(id)) {
    setLikePost({id});
    setSelectedId(selectedId ? [...selectedId, id] : [id]);
    if (!recorder.includes(id)) {
      setRecorder([...recorder, id]);
    }
  }
  if (isLiked === false && !selectedId?.includes(id) && recorder.includes(id)) {
    setLikePost({id});
    setSelectedId(selectedId ? [...selectedId, id] : [id]);
    if (!recorder.includes(id)) {
      setRecorder([...recorder, id]);
    }
  }
  if (isLiked === true && selectedId?.includes(id) && recorder.includes(id)) {
    setUnlikePost({id});
    setSelectedId(selectedId.filter((x: string) => x !== id));
    if (!recorder.includes(id)) {
      setRecorder([...recorder, id]);
    }
  }
  if (isLiked === false && selectedId?.includes(id) && recorder.includes(id)) {
    setUnlikePost({id});
    setSelectedId(selectedId.filter((x: string) => x !== id));
    if (!recorder.includes(id)) {
      setRecorder([...recorder, id]);
    }
  }
};

export const useRefreshingEffect = (
  refreshing: boolean,
  getListDataPost: (props?: ParamsProps | undefined) => Promise<void>,
  getCreditCount: () => Promise<void>,
  perPage: number,
  filterByValue?: string | undefined,
  categoryValue?: string | undefined,
) => {
  useEffect(() => {
    if (refreshing) {
      getListDataPost({
        page: 1,
        perPage: perPage,
        sortBy: filterByValue,
        category: categoryValue,
      });
      getCreditCount();
    }
  }, [refreshing]);
};

export const useStopRefreshing = (
  feedIsLoading: boolean,
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    if (!feedIsLoading) {
      setRefreshing(false);
    }
  }, [feedIsLoading]);
};
