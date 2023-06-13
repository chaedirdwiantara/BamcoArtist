import {useCallback, useEffect} from 'react';
import {PostList, PostPropsTypeA} from '../../../interface/feed.interface';
import {PaginationType, ParamsProps} from '../../../interface/base.interface';
import {useFocusEffect} from '@react-navigation/native';
import {TFunction} from 'i18next';

export const useGetCreditCount = (
  modalDonate: boolean,
  getCreditCount: () => Promise<void>,
) => {
  useEffect(() => {
    modalDonate && getCreditCount();
  }, [modalDonate]);
};

export const useCheckNewUpdate = (
  isLoading: boolean,
  postData:
    | {
        data: PostList[];
        meta: PaginationType;
      }
    | undefined,
  previousData: PostList[] | undefined,
  setShowUpdateNotif: React.Dispatch<React.SetStateAction<boolean>>,
  setNumberOfNewData: React.Dispatch<React.SetStateAction<number>>,
  setPreviousData: React.Dispatch<React.SetStateAction<PostList[] | undefined>>,
) => {
  useEffect(() => {
    if (!isLoading && postData?.data && !previousData) {
      setPreviousData(postData.data);
    } else if (
      !isLoading &&
      postData &&
      previousData &&
      postData.data !== previousData
    ) {
      if (postData.data[0].caption !== previousData[0].caption) {
        setShowUpdateNotif(true);
        const index = postData.data.findIndex(
          obj => obj.caption === previousData[0].caption,
        );
        setNumberOfNewData(index);
      }
    }
  }, [isLoading, postData, previousData]);
};

export const useSetDataMainQuery = (
  previousData: PostList[] | undefined,
  setDataMain: React.Dispatch<React.SetStateAction<PostList[]>>,
) => {
  useEffect(() => {
    if (previousData) {
      setDataMain(previousData);
    }
  }, [previousData]);
};

export const useGetDataOnMount = (
  uuidMusician: string,
  perPage: number,
  getListDataPost: (props?: ParamsProps | undefined) => Promise<void>,
  setUuid: React.Dispatch<React.SetStateAction<string | undefined>>,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  isPremium?: boolean,
) => {
  interface Params {
    page: number;
    perPage: number;
    musician_uuid?: string;
    isPremium?: boolean;
  }
  const params: Params = {
    page: 1,
    perPage,
  };
  if (isPremium) {
    params.isPremium = isPremium;
  }
  if (uuidMusician) {
    params.musician_uuid = uuidMusician;
  }
  useFocusEffect(
    useCallback(() => {
      uuidMusician !== ''
        ? (getListDataPost(params), setUuid(uuidMusician))
        : getListDataPost(params);
      setPage(1);
    }, [uuidMusician]),
  );
};

export const useGetDataOnMountNoId = (
  perPage: number,
  getListDataPost: (props?: ParamsProps | undefined) => Promise<void>,
  setPage?: React.Dispatch<React.SetStateAction<number>>,
) => {
  useFocusEffect(
    useCallback(() => {
      getListDataPost({page: 1, perPage: perPage});
      setPage && setPage(1);
    }, []),
  );
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

export const useSetDataToMainData = (
  dataPostList: PostList[] | undefined,
  filterActive: boolean,
  dataMain: PostList[],
  setDataMain: React.Dispatch<React.SetStateAction<PostList[]>>,
) => {
  useEffect(() => {
    if (dataPostList && dataPostList.length > 0 && filterActive === false) {
      let filterDataPost = [...dataMain, ...dataPostList];
      let filterDuplicate = filterDataPost.filter(
        (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i,
      );
      setDataMain(filterDuplicate);
    }
    if (dataPostList && dataPostList.length > 0 && filterActive) {
      setDataMain(dataPostList);
    }
  }, [dataPostList, filterActive]);
};

export const useSortByFilter = (
  selectedSort: string | undefined,
  t: TFunction<'translation', undefined, 'translation'>,
  getListDataPost: (props?: ParamsProps | undefined) => Promise<void>,
  perPage: number,
  page: number,
  categoryValue: string | undefined,
  setFilterActive: React.Dispatch<React.SetStateAction<boolean>>,
  setFilterByValue: React.Dispatch<React.SetStateAction<string | undefined>>,
  uuid?: string | undefined,
  isPremium?: boolean,
) => {
  useEffect(() => {
    if (selectedSort) {
      const dataSortS =
        t(selectedSort.toLowerCase()) === 'feed.sort.latest'
          ? 'latest'
          : 'popular';

      getListDataPost({
        page: 1,
        perPage: perPage * page,
        sortBy: dataSortS,
        category: categoryValue,
        isPremium: isPremium,
        musician_uuid: uuid,
      });
      setFilterActive(true);
      setFilterByValue(dataSortS);
    }
  }, [selectedSort]);
};

export const useCategoryFilter = (
  selectedCategory: string | undefined,
  getListDataPost: (props?: ParamsProps | undefined) => Promise<void>,
  perPage: number,
  page: number,
  filterByValue: string | undefined,
  selectedCategoryValue: string | undefined,
  setFilterActive: React.Dispatch<React.SetStateAction<boolean>>,
  setCategoryValue: React.Dispatch<React.SetStateAction<string | undefined>>,
  uuid?: string | undefined,
  isPremium?: boolean,
) => {
  useEffect(() => {
    if (selectedCategory) {
      selectedCategory === 'Home.Tab.TopPost.Category.All'
        ? (getListDataPost({
            page: 1,
            perPage: perPage * page,
            sortBy: filterByValue,
            isPremium: isPremium,
            musician_uuid: uuid,
          }),
          setFilterActive(false))
        : (getListDataPost({
            page: 1,
            perPage: perPage * page,
            category: selectedCategoryValue,
            sortBy: filterByValue,
            isPremium: isPremium,
            musician_uuid: uuid,
          }),
          setFilterActive(true));
      setCategoryValue(selectedCategoryValue);
    }
  }, [selectedCategory, selectedCategoryValue]);
};

export const handleEndScrollOnFeed = (
  dataMain: PostList[],
  getListDataPost: (props?: ParamsProps | undefined) => Promise<void>,
  perPage: number,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  setFilterActive: React.Dispatch<React.SetStateAction<boolean>>,
  categoryValue?: string | undefined,
  filterByValue?: string | undefined,
  isPremium?: boolean,
  uuid?: string | undefined,
) => {
  if (dataMain?.length >= 15) {
    getListDataPost({
      page: page + 1,
      perPage: perPage,
      category: categoryValue,
      sortBy: filterByValue,
      isPremium: isPremium,
      musician_uuid: uuid,
    });
    setPage(page + 1);
    setFilterActive(false);
  }
};

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

//! IN COMPONENT AREA
export const likePressedInFeed = (
  selectedId: string[] | undefined,
  item: PostList,
  recorder: string[],
) => {
  return selectedId === undefined
    ? item.isLiked
    : selectedId.includes(item.id) && recorder.includes(item.id)
    ? true
    : !selectedId.includes(item.id) && recorder.includes(item.id)
    ? false
    : !selectedId.includes(item.id) && !recorder.includes(item.id)
    ? item.isLiked
    : item.isLiked;
};

export const likesCountInFeed = (
  selectedId: string[] | undefined,
  item: PostList,
  recorder: string[],
) => {
  return selectedId === undefined
    ? item.likesCount
    : selectedId.includes(item.id) &&
      recorder.includes(item.id) &&
      item.isLiked === true
    ? item.likesCount
    : selectedId.includes(item.id) &&
      recorder.includes(item.id) &&
      item.isLiked === false
    ? item.likesCount + 1
    : !selectedId.includes(item.id) &&
      recorder.includes(item.id) &&
      item.isLiked === true
    ? item.likesCount - 1
    : !selectedId.includes(item.id) &&
      recorder.includes(item.id) &&
      item.isLiked === false
    ? item.likesCount
    : item.likesCount;
};
