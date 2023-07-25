import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  NativeModules,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {
  DropDownFilter,
  Gap,
  ListCard,
  ModalDonate,
  ModalShare,
  ModalSuccessDonate,
  ProgressBar,
  SsuToast,
} from '../../components';
import {
  DataDropDownType,
  DropDownFilterType,
  DropDownSortType,
} from '../../data/dropdown';
import {color, font, typography} from '../../theme';
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainTabParams, RootStackParams} from '../../navigations';
import {EmptyState} from '../../components/molecule/EmptyState/EmptyState';
import {FriedEggIcon, TickCircleIcon} from '../../assets/icon';
import ListToFollowMusician from './ListToFollowMusician';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {PostList} from '../../interface/feed.interface';
import {dateFormat} from '../../utils/date-format';
import categoryNormalize from '../../utils/categoryNormalize';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {useTranslation} from 'react-i18next';
import {useCreditHook} from '../../hooks/use-credit.hook';
import ChildrenCard from './ChildrenCard';
import {profileStorage} from '../../hooks/use-storage.hook';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';
import {
  handleEndScrollOnFeed,
  likePressedInFeed,
  likePressedOnFeed,
  likesCountInFeed,
  playSongOnFeed,
  useCategoryFilter,
  useCheckNewUpdate,
  useGetCreditCount,
  useGetDataOnMountNoId,
  useRefreshingEffect,
  useSetDataMainQuery,
  useSetDataToMainData,
  useSortByFilter,
  useStopRefreshing,
} from './ListUtils/ListFunction';
import Clipboard from '@react-native-community/clipboard';
import {useQuery} from 'react-query';
import {useVideoStore} from '../../store/video.store';
import {useUploadImageHook} from '../../hooks/use-uploadImage.hook';
import {useHeaderAnimation} from '../../hooks/use-header-animation.hook';

const {height} = Dimensions.get('screen');
const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

interface PostListProps {
  dataRightDropdown: DataDropDownType[];
  dataLeftDropdown: DropDownFilterType[] | DropDownSortType[];
  uuidMusician?: string;
  videoUploadProgress?: number;
  uriVideo?: string;
  allowRefresh?: boolean;
}

const urlText =
  'https://open.ssu.io/track/19AiJfAtRiccvSU1EWcttT?si=36b9a686dad44ae0';

const PostListMyPost: FC<PostListProps> = (props: PostListProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const navigateProfile =
    useNavigation<NativeStackNavigationProp<MainTabParams>>();
  const {
    dataRightDropdown,
    dataLeftDropdown,
    uuidMusician,
    videoUploadProgress,
    uriVideo,
    allowRefresh,
  } = props;

  const {handleScroll, compCTranslateY} = useHeaderAnimation();

  const [recorder, setRecorder] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>();
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(15);
  const [dataTemporary, setDataTemporary] = useState<PostList[]>();
  const [dataMain, setDataMain] = useState<PostList[]>([]);
  const [filterActive, setFilterActive] = useState<boolean>(true);
  const [filterByValue, setFilterByValue] = useState<string>();
  const [categoryValue, setCategoryValue] = useState<string>();
  const [selectedFilterMenu, setSelectedFilterMenu] =
    useState<DataDropDownType>();
  const [selectedCategoryMenu, setSelectedCategoryMenu] =
    useState<DataDropDownType>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // * UPDATE HOOKS
  const [selectedIdPost, setSelectedIdPost] = useState<string>();
  const [selectedMenu, setSelectedMenu] = useState<DataDropDownType>();
  const [selectedMusicianId, setSelectedMusicianId] = useState<string>('');

  //* MUSIC HOOKS
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [idNowPlaying, setIdNowPlaing] = useState<string>();

  const {setDataVideo} = useUploadImageHook();

  const {
    feedIsLoading,
    feedIsError,
    feedMessage,
    dataPostList,
    getListDataMyPost,
    setLikePost,
    setUnlikePost,
    setDeletePost,
    getListDataMyPostQuery,
    setDataCreatePost,
  } = useFeedHook();

  const {
    seekPlayer,
    setPlaySong,
    setPauseSong,
    hidePlayer,
    isPlaying,
    playerProgress,
    addPlaylistFeed,
  } = usePlayerHook();

  const {setUriVideo} = useVideoStore();

  const {creditCount, getCreditCount} = useCreditHook();
  const uuid = profileStorage()?.uuid;

  //* QUERY AREA
  const [previousData, setPreviousData] = useState<PostList[]>();

  const {
    data: postData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery('posts-myPost', () =>
    getListDataMyPostQuery({
      page: 1,
      perPage: perPage,
      sortBy: filterByValue,
      category: categoryValue,
    }),
  );

  //?setData if not same as current
  useEffect(() => {
    if (!queryDataLoading && postData) {
      if (postData.data !== previousData) {
        setPreviousData(postData.data);
      }
    }
  }, [queryDataLoading, postData]);

  //? set data into main (show data)
  useSetDataMainQuery(previousData, setDataMain);

  //* END OF QUERY AREA

  //* get data on mount this page
  useGetCreditCount(modalDonate, getCreditCount);
  // useGetDataOnMountNoId(perPage, getListDataMyPost, setPage);
  // //?get data on mount this page
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  //* get data when video post suceeded
  useEffect(() => {
    if (allowRefresh) {
      setRefreshing(true);
    }
  }, [allowRefresh]);

  //* call when refreshing
  useRefreshingEffect(
    refreshing,
    getListDataMyPost,
    getCreditCount,
    perPage,
    filterByValue,
    categoryValue,
  );

  useStopRefreshing(feedIsLoading, setRefreshing);

  //* set response data list post to main data
  useEffect(() => {
    if (postData?.data) {
      setDataTemporary(postData?.data);
    }
  }, [postData]);

  useEffect(() => {
    if (dataPostList) {
      setDataTemporary(dataPostList);
    }
  }, [dataPostList]);

  useSetDataToMainData(dataTemporary, filterActive, dataMain, setDataMain);

  //* hit sort by endpoint
  useSortByFilter(
    selectedFilterMenu?.label,
    t,
    getListDataMyPost,
    perPage,
    page,
    categoryValue,
    setFilterActive,
    setFilterByValue,
  );

  //* hit category endpoint
  useCategoryFilter(
    selectedCategoryMenu?.label,
    getListDataMyPost,
    perPage,
    page,
    filterByValue,
    selectedCategoryMenu?.value,
    setFilterActive,
    setCategoryValue,
  );

  //* Handle when end of Scroll
  const handleEndScroll = () => {
    handleEndScrollOnFeed(
      dataMain,
      getListDataMyPost,
      perPage,
      page,
      setPage,
      setFilterActive,
      categoryValue,
      filterByValue,
    );
  };

  const cardOnPress = (data: PostList) => {
    navigation.navigate('PostDetail', data);
  };

  const likeOnPress = (id: string, isLiked: boolean) => {
    likePressedOnFeed(
      id,
      isLiked,
      selectedId,
      setSelectedId,
      setUnlikePost,
      setLikePost,
      setRecorder,
      recorder,
    );
  };

  const shareOnPress = () => {
    setModalShare(true);
  };

  //Credit onPress
  const tokenOnPress = (musicianId: string) => {
    setSelectedMusicianId(musicianId);
    setModalDonate(true);
  };

  const onPressDonate = () => {
    setModalDonate(false);
    setTrigger2ndModal(true);
  };

  const onPressSuccess = () => {
    setModalSuccessDonate(false);
  };

  const onPressCloseModalDonate = () => {
    setModalDonate(false);
    setModalSuccessDonate(false);
    setTrigger2ndModal(false);
  };

  const handleToDetailMusician = () => {
    navigateProfile.navigate('Profile', {
      showToast: false,
      deletePlaylist: false,
    });
  };

  const onModalShareHide = () => {
    setToastVisible(true);
    setIsCopied(false);
  };

  const onPressCopy = () => {
    setIsCopied(true);
    if (Clipboard && Clipboard.setString) {
      Clipboard.setString(urlText);
    }
  };

  // ! UPDATE POST AREA
  useEffect(() => {
    if (
      selectedIdPost !== undefined &&
      selectedMenu !== undefined &&
      dataMain
    ) {
      if (t(selectedMenu.label) === 'Delete Post') {
        setDeletePost({id: selectedIdPost});
        setDataMain(dataMain.filter(data => data.id !== selectedIdPost));
        setSelectedMenu(undefined);
      }
      if (t(selectedMenu.label) === 'Edit Post') {
        setUriVideo(null);
        setDataCreatePost(null);
        setDataVideo(undefined);
        let dataSelected = dataMain.filter(data => data.id === selectedIdPost);
        navigation.navigate('CreatePost', {postData: dataSelected[0]});
        setSelectedMenu(undefined);
      }
    }
  }, [selectedIdPost, selectedMenu, dataMain]);
  // ! END OF UPDATE POST AREA

  // ! MUSIC AREA
  const onPressPlaySong = (val: PostList) => {
    playSongOnFeed(
      val,
      addPlaylistFeed,
      setPauseModeOn,
      setIdNowPlaing,
      setPlaySong,
      hidePlayer,
    );
  };

  const handlePausePlay = () => {
    if (isPlaying) {
      setPauseSong();
    } else {
      setPlaySong();
    }
  };
  // ! END OF MUSIC AREA

  return (
    <>
      <Animated.View
        style={[
          styles.filterContainer,
          {transform: [{translateY: compCTranslateY}]},
        ]}>
        <DropDownFilter
          labelCaption={
            selectedFilterMenu
              ? t(selectedFilterMenu.label)
              : t('Feed.Sort.Title')
          }
          dataFilter={dataLeftDropdown}
          selectedMenu={setSelectedFilterMenu}
          leftPosition={widthResponsive(-60)}
          containerStyle={{
            marginTop: widthResponsive(20),
            marginBottom: widthResponsive(20),
          }}
        />
        <DropDownFilter
          labelCaption={
            selectedCategoryMenu
              ? t(selectedCategoryMenu.label)
              : t('Home.Tab.TopPost.Category.Title')
          }
          dataFilter={dataRightDropdown}
          selectedMenu={setSelectedCategoryMenu}
          leftPosition={widthResponsive(-144)}
          containerStyle={{
            marginTop: widthResponsive(20),
            marginBottom: widthResponsive(20),
          }}
        />
      </Animated.View>
      {videoUploadProgress ? (
        <ProgressBar
          progress={videoUploadProgress}
          caption={'Uploading is in progress, it will take few second'}
          uri={uriVideo}
          containerStyles={{
            position: 'absolute',
            top:
              Platform.OS === 'ios'
                ? heightResponsive(137)
                : heightResponsive(barHeight + 160),
          }}
        />
      ) : null}
      {dataMain && dataMain.length !== 0 ? (
        <View style={styles.bodyContainer}>
          {refreshing && (
            <View style={styles.loadingContainer}>
              <LoadingSpinner />
            </View>
          )}
          <Animated.FlatList
            data={
              filterActive
                ? dataMain
                : dataMain.sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime(),
                  )
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom:
                height >= 800 ? heightResponsive(220) : heightResponsive(160),
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
              />
            }
            onScroll={handleScroll}
            onEndReached={handleEndScroll}
            onEndReachedThreshold={1}
            bounces={false}
            renderItem={({item, index}) => (
              <>
                {index === 0 && !videoUploadProgress ? (
                  <Gap
                    height={
                      Platform.OS === 'ios'
                        ? widthResponsive(134)
                        : widthResponsive(barHeight + 154)
                    }
                  />
                ) : index === 0 && videoUploadProgress ? (
                  <Gap
                    height={
                      Platform.OS === 'ios'
                        ? widthResponsive(180)
                        : widthResponsive(barHeight + 205)
                    }
                  />
                ) : null}
                <ListCard.PostList
                  toDetailOnPress={handleToDetailMusician}
                  musicianName={item.musician.fullname}
                  musicianId={`@${item.musician.username}`}
                  imgUri={
                    item.musician.imageProfileUrls.length !== 0
                      ? item.musician.imageProfileUrls[0]?.image
                      : ''
                  }
                  postDate={
                    item?.timeAgo ? item.timeAgo : dateFormat(item.createdAt)
                  }
                  postDate2={item.createdAt}
                  category={categoryNormalize(item.category)}
                  onPress={() => cardOnPress(item)}
                  likeOnPress={() => likeOnPress(item.id, item.isLiked)}
                  likePressed={likePressedInFeed(selectedId, item, recorder)}
                  likeCount={likesCountInFeed(selectedId, item, recorder)}
                  tokenOnPress={() => tokenOnPress(item.musician.uuid)}
                  shareOnPress={shareOnPress}
                  commentCount={item.commentsCount}
                  myPost={item.musician.uuid === uuid}
                  selectedMenu={setSelectedMenu}
                  idPost={item.id}
                  selectedIdPost={setSelectedIdPost}
                  isPremium={item.isPremiumPost}
                  viewCount={item.viewsCount}
                  shareCount={item.shareCount}
                  showDropdown
                  children={
                    <ChildrenCard
                      data={item}
                      onPress={onPressPlaySong}
                      isPlay={isPlaying}
                      playOrPause={handlePausePlay}
                      pauseModeOn={pauseModeOn}
                      currentProgress={playerProgress.position}
                      duration={playerProgress.duration}
                      seekPlayer={seekPlayer}
                      isIdNowPlaying={item.id === idNowPlaying}
                    />
                  }
                />
                <Gap height={16} />
              </>
            )}
          />
        </View>
      ) : dataTemporary?.length === 0 &&
        postData?.message === 'you not follow anyone' ? (
        <>
          <Gap height={195} />
          <ListToFollowMusician />
        </>
      ) : dataTemporary?.length === 0 &&
        postData?.message === `You don't have any post` ? (
        <>
          <Gap height={195} />
          <EmptyState
            text={t('EmptyState.DontHavePost') || ''}
            containerStyle={{
              justifyContent: 'flex-start',
              paddingTop: heightPercentage(24),
            }}
            icon={<FriedEggIcon />}
          />
        </>
      ) : dataTemporary?.length === 0 &&
        postData?.message ===
          'Your subscribed musician has not yet posted any exclusive content.' ? (
        <>
          <Gap height={195} />
          <EmptyState
            text={t('EmptyState.Exclusive') || ''}
            containerStyle={{
              justifyContent: 'flex-start',
              paddingTop: heightPercentage(24),
            }}
            icon={<FriedEggIcon />}
          />
        </>
      ) : null}
      <ModalShare
        url={urlText}
        modalVisible={modalShare}
        onPressClose={() => setModalShare(false)}
        titleModal={t('General.Share.Feed')}
        hideMusic
        onPressCopy={onPressCopy}
        onModalHide={
          isCopied
            ? onModalShareHide
            : () => console.log(modalShare, 'modal is hide')
        }
      />
      <SsuToast
        modalVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        children={
          <View style={[styles.modalContainer]}>
            <TickCircleIcon
              width={widthResponsive(21)}
              height={heightPercentage(20)}
              stroke={color.Neutral[10]}
            />
            <Gap width={widthResponsive(7)} />
            <Text style={[typography.Button2, styles.textStyle]}>
              {t('General.LinkCopied')}
            </Text>
          </View>
        }
        modalStyle={{marginHorizontal: widthResponsive(24)}}
      />
      <ModalDonate
        userId={selectedMusicianId}
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onPressClose={onPressCloseModalDonate}
        onModalHide={() => setModalSuccessDonate(true)}
      />
      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal ? true : false}
        toggleModal={onPressSuccess}
      />
      {!refreshing && (
        <ModalLoading visible={queryDataLoading && !previousData} />
      )}
    </>
  );
};

export default PostListMyPost;

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    marginHorizontal: widthResponsive(-24),
  },
  filterContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top:
      Platform.OS === 'ios'
        ? heightResponsive(80)
        : heightResponsive(barHeight + 100),
    left: widthResponsive(24),
    zIndex: 1,
    backgroundColor: color.Dark[800],
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthResponsive(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  textStyle: {
    color: color.Neutral[10],
  },
  categoryContainerStyle: {
    width: undefined,
    aspectRatio: undefined,
    alignSelf: 'flex-end',
    marginRight: widthResponsive(-3),
  },
  categoryTextStyle: {
    fontSize: mvs(10),
    fontWeight: '500',
    color: color.Dark[50],
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: heightPercentage(20),
  },
});
