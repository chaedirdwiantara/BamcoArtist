import React, {FC, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {
  DropDownFilter,
  ListCard,
  ModalConfirm,
  ModalDonate,
  ModalShare,
  ModalSuccessDonate,
  SuccessToast,
} from '../../components';
import {
  DataDropDownType,
  DropDownFilterType,
  DropDownSortType,
} from '../../data/dropdown';
import {color, font} from '../../theme';
import {
  elipsisText,
  heightPercentage,
  heightResponsive,
  widthResponsive,
} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {EmptyState} from '../../components/molecule/EmptyState/EmptyState';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {PostList} from '../../interface/feed.interface';
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
  useGetCreditCount,
  useGetDataOnMount,
  useRefreshingEffect,
  useSetDataToMainData,
  useSortByFilter,
  useStopRefreshing,
} from './ListUtils/ListFunction';
import Clipboard from '@react-native-community/clipboard';
import {useShareHook} from '../../hooks/use-share.hook';
import {imageShare} from '../../utils/share';
import {useReportHook} from '../../hooks/use-report.hook';
import {feedReportRecorded} from '../../store/idReported';
import {ReportParamsProps} from '../../interface/report.interface';
import {reportingMenu} from '../../data/report';
import {ModalReport} from '../../components/molecule/Modal/ModalReport';
import {useBlockHook} from '../../hooks/use-block.hook';

const {height} = Dimensions.get('screen');

type RenderItemProps = {
  item: PostList;
  index: number;
};
interface PostListProps {
  dataRightDropdown: DataDropDownType[];
  dataLeftDropdown: DropDownFilterType[] | DropDownSortType[];
  uuidMusician?: string;
  hideDropdown?: boolean;
}

const PostListSimilar: FC<PostListProps> = (props: PostListProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    dataRightDropdown,
    dataLeftDropdown,
    uuidMusician = '',
    hideDropdown,
  } = props;

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
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const [toastBlockSucceed, setToastBlockSucceed] = useState<boolean>(false);

  //* MUSIC HOOKS
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [idNowPlaying, setIdNowPlaing] = useState<string>();

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
    getListSimilarPost,
    setLikePost,
    setUnlikePost,
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

  const {
    shareLink,
    getShareLink,
    successGetLink,
    setSelectedSharePost,
    selectedSharePost,
  } = useShareHook();

  const {blockLoading, blockError, blockResponse, setBlockUser} =
    useBlockHook();

  const {creditCount, getCreditCount} = useCreditHook();
  const MyUuid = profileStorage()?.uuid;

  const {t} = useTranslation();

  //* get data on mount this page
  useGetCreditCount(modalDonate, getCreditCount);

  useGetDataOnMount(
    uuidMusician,
    perPage,
    getListSimilarPost,
    setUuid,
    setPage,
  );

  //* call when refreshing
  useRefreshingEffect(
    refreshing,
    getListSimilarPost,
    getCreditCount,
    perPage,
    filterByValue,
    categoryValue,
  );

  useStopRefreshing(feedIsLoading, setRefreshing);

  //* set response data list post to main data
  useSetDataToMainData(dataPostList, filterActive, dataMain, setDataMain);

  //* hit sort by endpoint
  useSortByFilter(
    selectedFilterMenu?.label,
    t,
    getListSimilarPost,
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
    getListSimilarPost,
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
      getListSimilarPost,
      perPage,
      page,
      setPage,
      setFilterActive,
      categoryValue,
      filterByValue,
      false,
      uuid,
    );
  };

  const cardOnPress = (id: string) => {
    navigation.navigate('PostDetail', {id});
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
  };

  //Credit onPress
  const tokenOnPress = () => {
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
  // ! END OF REPORT POST AREA

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
      {!hideDropdown && (
        <View style={styles.container}>
          <DropDownFilter
            labelCaption={
              selectedFilterMenu
                ? t(selectedFilterMenu.label)
                : t('Feed.Sort.Title')
            }
            dataFilter={dataLeftDropdown}
            selectedMenu={setSelectedFilterMenu}
            leftPosition={widthResponsive(60)}
            topPosition={widthResponsive(3)}
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
            leftPosition={widthResponsive(-26)}
            topPosition={widthResponsive(3)}
            containerStyle={{
              marginTop: widthResponsive(20),
              marginBottom: widthResponsive(20),
            }}
          />
        </View>
      )}
      {dataMain !== null && dataMain.length !== 0 ? (
        <View style={{flex: 1, marginHorizontal: widthResponsive(-24)}}>
          {refreshing && (
            <View style={styles.loadingContainer}>
              <LoadingSpinner />
            </View>
          )}
          <FlatList
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
            renderItem={({item, index}: RenderItemProps) => (
              <>
                <ListCard.PostList
                  data={item}
                  toDetailOnPress={() =>
                    handleToDetailMusician(item.musician.uuid)
                  }
                  onPress={() => cardOnPress(item.id)}
                  likeOnPress={() => likeOnPress(item.id, item.isLiked)}
                  likePressed={likePressedInFeed(selectedId, item, recorder)}
                  likeCount={likesCountInFeed(selectedId, item, recorder)}
                  tokenOnPress={tokenOnPress}
                  shareOnPress={() => shareOnPress(item)}
                  containerStyles={{marginTop: mvs(16)}}
                  selectedMenu={setSelectedMenuPost}
                  selectedIdPost={setSelectedIdPost}
                  selectedUserUuid={setSelectedUserUuid}
                  selectedUserName={setSelectedUserName}
                  showDropdown
                  reportSent={
                    idReported.includes(item.id) ? true : item.reportSent
                  }
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
              </>
            )}
          />
        </View>
      ) : !feedIsLoading && dataMain?.length === 0 ? (
        <EmptyState
          text={t('Home.DiveIn.Similar.EmptyState')}
          containerStyle={styles.containerEmpty}
          textStyle={styles.emptyText}
          hideIcon={true}
        />
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
        userId={uuidMusician}
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onPressClose={onPressCloseModalDonate}
        onModalHide={() => setModalSuccessDonate(true)}
      />
      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal ? true : false}
        toggleModal={onPressSuccess}
      />

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

export default PostListSimilar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightResponsive(10),
    marginBottom: heightResponsive(8),
  },
  childrenPostTitle: {
    flexShrink: 1,
    maxWidth: widthResponsive(288),
    fontFamily: font.InterRegular,
    fontWeight: '400',
    fontSize: mvs(13),
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
  containerEmpty: {
    alignSelf: 'center',
  },
  emptyText: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    textAlign: 'center',
    color: color.Neutral[10],
    lineHeight: mvs(16),
  },
  rightButtonStyle: {
    backgroundColor: color.Error.block,
    borderRadius: 4,
    paddingHorizontal: widthResponsive(16),
    paddingVertical: widthResponsive(6),
  },
});
