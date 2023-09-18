import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Animated,
  Platform,
  NativeModules,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {
  DropDownFilter,
  Gap,
  ListCard,
  ModalConfirm,
  ModalDonate,
  ModalShare,
  ModalSuccessDonate,
  NewPostAvail,
  ProgressBar,
  SuccessToast,
} from '../../components';
import {
  DataDropDownType,
  DropDownFilterType,
  DropDownSortType,
} from '../../data/dropdown';
import {color} from '../../theme';
import {
  elipsisText,
  heightPercentage,
  heightResponsive,
  widthResponsive,
} from '../../utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {EmptyState} from '../../components/molecule/EmptyState/EmptyState';
import ListToFollowMusician from './ListToFollowMusician';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {PostList} from '../../interface/feed.interface';
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
  useRefreshingEffect,
  useSetDataMainQuery,
  useSetDataToMainData,
  useSortByFilter,
  useStopRefreshing,
} from './ListUtils/ListFunction';
import Clipboard from '@react-native-community/clipboard';
import {useQuery} from 'react-query';
import {useHeaderAnimation} from '../../hooks/use-header-animation.hook';
import {usePostLogger} from './ListUtils/use-PostLogger';
import {imageShare} from '../../utils/share';
import {useShareHook} from '../../hooks/use-share.hook';
import {useReportHook} from '../../hooks/use-report.hook';
import {ReportParamsProps} from '../../interface/report.interface';
import {reportingMenu} from '../../data/report';
import {feedReportRecorded} from '../../store/idReported';
import {ModalReport} from '../../components/molecule/Modal/ModalReport';
import {useBlockHook} from '../../hooks/use-block.hook';

const {height} = Dimensions.get('screen');
const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

type RenderItemProps = {
  item: PostList;
  index: number;
};
interface PostListProps {
  dataRightDropdown: DataDropDownType[];
  dataLeftDropdown: DropDownFilterType[] | DropDownSortType[];
  uuidMusician?: string;
  videoUploadProgress?: number;
  uriVideo?: string;
}

const PostListPublic: FC<PostListProps> = (props: PostListProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    dataRightDropdown,
    dataLeftDropdown,
    uuidMusician = '',
    videoUploadProgress,
    uriVideo,
  } = props;

  const noPostYetMessage = 'musician not have post';

  const {handleScroll, compCTranslateY} = useHeaderAnimation();
  const {viewabilityConfig, onViewableItemsChanged} = usePostLogger();
  const {
    shareLink,
    getShareLink,
    successGetLink,
    setSelectedSharePost,
    selectedSharePost,
  } = useShareHook();

  const [recorder, setRecorder] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>();
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [reportToast, setReportToast] = useState(false);
  const [reportSuccessToast, setReportSuccessToast] = useState(false);
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(15);
  const [dataTemporary, setDataTemporary] = useState<PostList[]>([]);
  const [dataMain, setDataMain] = useState<PostList[]>([]);
  const [filterActive, setFilterActive] = useState<boolean>(true);
  const [filterByValue, setFilterByValue] = useState<string>();
  const [categoryValue, setCategoryValue] = useState<string>();
  const [uuid, setUuid] = useState<string>();
  const [selectedFilterMenu, setSelectedFilterMenu] =
    useState<DataDropDownType>();
  const [selectedCategoryMenu, setSelectedCategoryMenu] =
    useState<DataDropDownType>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedMusicianId, setSelectedMusicianId] = useState<string>('');
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const [toastBlockSucceed, setToastBlockSucceed] = useState<boolean>(false);

  //* MUSIC HOOKS
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [idNowPlaying, setIdNowPlaing] = useState<string>();

  // * REPORT HOOKS
  const [selectedIdPost, setSelectedIdPost] = useState<string>();
  const [selectedMenuPost, setSelectedMenuPost] = useState<DataDropDownType>();
  const [selectedUserUuid, setSelectedUserUuid] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [reason, setReason] = useState<string>('');

  const {
    feedIsLoading,
    feedIsError,
    feedMessage,
    dataPostList,
    getListDataPost,
    setLikePost,
    setUnlikePost,
    getListDataPostQuery,
    sendLogShare,
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

  const {blockLoading, blockError, blockResponse, setBlockUser} =
    useBlockHook();

  const {creditCount, getCreditCount} = useCreditHook();
  const MyUuid = profileStorage()?.uuid;

  //* QUERY AREA
  const [previousData, setPreviousData] = useState<PostList[]>();
  const [showUpdateNotif, setShowUpdateNotif] = useState(false);
  const [numberOfNewData, setNumberOfNewData] = useState<number>(0);

  const flatListRef = useRef<FlatList<any> | null>(null);

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({offset: 0});
  };

  const {
    data: postData,
    isLoading: queryDataLoading,
    isError,
    refetch,
  } = useQuery(
    'posts-public',
    () =>
      getListDataPostQuery({
        page: 1,
        perPage: perPage,
        sortBy: filterByValue,
        category: categoryValue,
      }),
    {
      staleTime: 300000,
      refetchInterval: 300000,
    },
  );

  //* check if there's new update
  useCheckNewUpdate(
    queryDataLoading,
    postData,
    previousData,
    setShowUpdateNotif,
    setNumberOfNewData,
    setPreviousData,
  );

  const handleUpdateClick = () => {
    setShowUpdateNotif(false);
    scrollToTop();
    postData?.data && setPreviousData(postData.data);
  };

  //* set data into main (show data)
  useSetDataMainQuery(previousData, setDataMain);
  //* END OF QUERY AREA

  //* get data on mount this page
  useGetCreditCount(modalDonate, getCreditCount);

  // useGetDataOnMount(uuidMusician, perPage, getListDataPost, setUuid, setPage);
  //?get data on mount this page
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  //* call when refreshing
  useRefreshingEffect(
    refreshing,
    getListDataPost,
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

  //? set no data into main cz of message
  useEffect(() => {
    if (dataTemporary?.length === 0 && feedMessage === noPostYetMessage) {
      setDataMain(dataTemporary);
    }
  }, [dataTemporary, feedMessage]);

  useSetDataToMainData(dataTemporary, filterActive, dataMain, setDataMain);

  //* hit sort by endpoint
  useSortByFilter(
    selectedFilterMenu?.label,
    t,
    getListDataPost,
    perPage,
    page,
    categoryValue,
    setFilterActive,
    setFilterByValue,
    uuid,
  );

  //* hit category endpoint
  useCategoryFilter(
    selectedCategoryMenu?.label,
    getListDataPost,
    perPage,
    page,
    filterByValue,
    selectedCategoryMenu?.value,
    setFilterActive,
    setCategoryValue,
    uuid,
  );

  //* Handle when end of Scroll
  const handleEndScroll = () => {
    handleEndScrollOnFeed(
      dataMain,
      getListDataPost,
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

  const shareOnPress = (content: PostList) => {
    setModalShare(true);
    setSelectedSharePost(content);
    setSelectedMusicianId(content.id);
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

  const handleToDetailMusician = (id: string) => {
    navigation.navigate('MusicianProfile', {id});
  };

  const onModalShareHide = () => {
    setToastVisible(true);
    setIsCopied(false);
  };

  const onPressCopy = () => {
    setIsCopied(true);
    if (Clipboard && Clipboard.setString) {
      Clipboard.setString(shareLink);
      sendLogShare({id: selectedMusicianId});
    }
  };

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

  // ! REPORT POST AREA
  const {
    dataReport,
    reportIsLoading,
    reportIsError,
    setDataReport,
    setPostReport,
  } = useReportHook();

  const {idReported, setIdReported} = feedReportRecorded();

  useEffect(() => {
    if (selectedIdPost && selectedMenuPost && selectedUserUuid && dataMain) {
      const selectedValue = t(selectedMenuPost.value);

      switch (selectedValue) {
        case '11':
          navigation.navigate('MusicianProfile', {
            id: selectedUserUuid,
          });
          break;
        case '22':
          setReportToast(true);
          break;
        case '33':
          setModalConfirm(true);
          break;
        default:
          break;
      }
      setSelectedMenuPost(undefined);
    }
  }, [selectedIdPost, selectedMenuPost, selectedUserUuid]);

  //? set status disable after report sent to make sure the status report is updated
  useEffect(() => {
    if (dataReport && selectedIdPost) {
      setReportToast(false);
      if (!idReported.includes(selectedIdPost)) {
        setIdReported([...idReported, selectedIdPost]);
      }
    }
  }, [dataReport]);

  const sendOnPress = () => {
    const reportBody: ReportParamsProps = {
      reportType: 'post',
      reportTypeId: selectedIdPost ?? '0',
      reporterUuid: MyUuid ?? '',
      reportedUuid: selectedUserUuid ?? '',
      reportCategory: t(selectedCategory ?? ''),
      reportReason: reason ?? '',
    };
    setPostReport(reportBody);
  };

  const onModalReportHide = () => {
    setReportSuccessToast(true);
  };

  const closeModalSuccess = () => {
    setDataReport(false);
    setReportSuccessToast(false);
  };
  // ! END OF REPORT POST AREASE

  // SHARE LINK
  useEffect(() => {
    if (selectedSharePost) {
      getShareLink({
        scheme: `/feed/${selectedSharePost.id}`,
        image: imageShare(selectedSharePost),
        title: t('ShareLink.Feed.Title', {
          musician: selectedSharePost.musician.fullname,
        }),
        description: selectedSharePost.caption
          ? elipsisText(selectedSharePost.caption, 50)
          : t('ShareLink.Feed.Subtitle'),
      });
    }
  }, [selectedSharePost]);

  // ! BLOCK USER AREA
  const blockModalOnPress = () => {
    setBlockUser({uuid: selectedUserUuid});
    setModalConfirm(false);
  };

  useEffect(() => {
    if (blockResponse === 'Success') {
      setDataMain(
        dataMain.filter(data => data.musician.uuid !== selectedUserUuid),
      );
      setToastBlockSucceed(true);
    }
  }, [blockResponse]);

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
      {dataMain !== null && dataMain?.length !== 0 ? (
        <View style={styles.bodyContainer}>
          {refreshing && (
            <View style={styles.loadingContainer}>
              <LoadingSpinner />
            </View>
          )}
          <Animated.FlatList
            ref={flatListRef}
            data={dataMain}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom:
                uuidMusician !== ''
                  ? undefined
                  : height >= 800
                  ? heightResponsive(220)
                  : heightResponsive(160),
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
              />
            }
            onEndReached={handleEndScroll}
            onEndReachedThreshold={1}
            onScroll={handleScroll}
            bounces={false}
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged}
            renderItem={({item, index}: RenderItemProps) => (
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
                  data={item}
                  toDetailOnPress={() =>
                    handleToDetailMusician(item.musician.uuid)
                  }
                  onPress={() => cardOnPress(item)}
                  likeOnPress={() => likeOnPress(item.id, item.isLiked)}
                  likePressed={likePressedInFeed(selectedId, item, recorder)}
                  likeCount={likesCountInFeed(selectedId, item, recorder)}
                  tokenOnPress={() => tokenOnPress(item.musician.uuid)}
                  shareOnPress={() => shareOnPress(item)}
                  selectedMenu={setSelectedMenuPost}
                  selectedIdPost={setSelectedIdPost}
                  selectedUserUuid={setSelectedUserUuid}
                  selectedUserName={setSelectedUserName}
                  reportSent={
                    idReported.includes(item.id) ? true : item.reportSent
                  }
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
          <Gap height={Platform.OS === 'android' ? 195 : 145} />
          <ListToFollowMusician />
        </>
      ) : dataTemporary?.length === 0 &&
        (postData?.message === noPostYetMessage ||
          feedMessage === noPostYetMessage) ? (
        <>
          <Gap height={Platform.OS === 'android' ? 195 : 145} />
          <EmptyState
            text={t('EmptyState.FollowMusician') || ''}
            containerStyle={{
              justifyContent: 'flex-start',
              paddingTop: heightPercentage(24),
            }}
          />
        </>
      ) : null}
      <ModalReport
        modalVisible={reportToast}
        onPressClose={() => setReportToast(false)}
        title={`${t('ModalComponent.Report.Type.Post.FirstTitle')}`}
        secondTitle={`${t('ModalComponent.Report.Type.Post.SecondTitle')}`}
        dataReport={reportingMenu}
        onPressOk={sendOnPress}
        category={setSelectedCategory}
        reportReason={setReason}
        modalOnHide={
          dataReport
            ? onModalReportHide
            : () => console.log(modalShare, 'modal is hide')
        }
      />
      {/* //? When report succesfully */}
      <SuccessToast
        toastVisible={reportSuccessToast}
        onBackPressed={closeModalSuccess}
        caption={t('ModalComponent.Report.ReportSuccess')}
      />
      <ModalShare
        url={shareLink}
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
        disabled={!successGetLink}
      />
      {/* //? When copy link done */}
      <SuccessToast
        toastVisible={toastVisible}
        onBackPressed={() => setToastVisible(false)}
        caption={t('General.LinkCopied')}
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

      {showUpdateNotif && (
        <NewPostAvail
          onPress={handleUpdateClick}
          numberOfNewData={numberOfNewData}
        />
      )}

      {/* //? Block user modal */}
      {modalConfirm && (
        <ModalConfirm
          modalVisible={modalConfirm}
          title={`${t('Block.Modal.Title')} @${selectedUserName} ?`}
          subtitle={`${t('Block.Modal.Subtitle')} @${selectedUserName}`}
          yesText={`${t('Block.Modal.RightButton')}`}
          noText={`${t('Block.Modal.LeftButton')}`}
          onPressClose={() => setModalConfirm(false)}
          onPressOk={blockModalOnPress}
          rightButtonStyle={styles.rightButtonStyle}
        />
      )}
      {/* //? When block succeed */}
      <SuccessToast
        toastVisible={toastBlockSucceed}
        onBackPressed={() => setToastBlockSucceed(false)}
        caption={`${t('General.BlockSucceed')} @${selectedUserName}`}
      />
    </>
  );
};

export default PostListPublic;

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
  rightButtonStyle: {
    backgroundColor: color.Error.block,
    borderRadius: 4,
    paddingHorizontal: widthResponsive(16),
    paddingVertical: widthResponsive(6),
  },
});
