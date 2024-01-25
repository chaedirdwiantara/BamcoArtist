import React, {FC, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {
  DropDownFilter,
  EmptyStateFeed,
  Gap,
  ListCard,
  ModalConfirm,
  ModalDonate,
  ModalShare,
  ModalSuccessDonate,
  SuccessToast,
} from '../../components';
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
import {DataExclusiveResponse} from '../../interface/setting.interface';
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
  useSortFilterPostType,
} from './ListUtils/ListFunction';
import Clipboard from '@react-native-community/clipboard';
import {imageShare} from '../../utils/share';
import {useShareHook} from '../../hooks/use-share.hook';
import {
  DataDropDownType,
  dropDownDataCategory,
  dropDownDataFilterBy,
} from '../../data/dropdown';
import {useReportHook} from '../../hooks/use-report.hook';
import {feedReportRecorded} from '../../store/idReported';
import {ReportParamsProps} from '../../interface/report.interface';
import {ModalReport} from '../../components/molecule/Modal/ModalReport';
import {reportingMenu} from '../../data/report';
import {useVideoStore} from '../../store/video.store';
import {useUploadImageHook} from '../../hooks/use-uploadImage.hook';
import {userProfile} from '../../store/userProfile.store';
import {ModalConfirmChoice} from '../../components/molecule/Modal/ModalConfirmChoice';
import {useSettingHook} from '../../hooks/use-setting.hook';

const {height} = Dimensions.get('screen');

type RenderItemProps = {
  item: PostList;
  index: number;
};
interface ModalPostState {
  isExclusivePostModal: boolean;
  isSetExclusiveSetting: boolean;
  isBanned: boolean;
}
interface PostListProps extends DataExclusiveResponse {
  uuidMusician?: string;
  endReached: boolean;
  setEndReached: (value: boolean) => void;
  setAllowPagination: (value: boolean) => void;
}

const PostListProfile: FC<PostListProps> = (props: PostListProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {
    coverImage,
    title,
    description,
    uuidMusician = '',
    endReached,
    setEndReached,
    setAllowPagination,
  } = props;

  const dataToExc = {coverImage, title, description};

  const {uriVideo, setUriVideo} = useVideoStore();
  const {profileStore} = userProfile();

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
  const [uuid, setUuid] = useState<string>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [selectedFilterMenu, setSelectedFilterMenu] =
    useState<DataDropDownType>();
  const [selectedCategoryMenu, setSelectedCategoryMenu] =
    useState<DataDropDownType>();
  const [filterByValue, setFilterByValue] = useState<string>();
  const [categoryValue, setCategoryValue] = useState<string>();
  const [modalBanned, setModalBanned] = useState<boolean>(false);
  const [showModalPost, setShowModalPost] = useState<ModalPostState>({
    isExclusivePostModal: false,
    isSetExclusiveSetting: false,
    isBanned: false,
  });
  const [postChoice, setPostChoice] = useState<
    'choiceA' | 'choiceB' | undefined
  >();

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
    setLikePost,
    setUnlikePost,
    getListProfilePost,
    setDataCreatePost,
    setDeletePost,
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

  const {setDataVideo} = useUploadImageHook();
  const {creditCount, getCreditCount} = useCreditHook();
  const {dataExclusiveContent, getExclusiveContent} = useSettingHook();
  const MyUuid = profileStorage()?.uuid;

  //* get data on mount this page
  useGetCreditCount(modalDonate, getCreditCount);

  useGetDataOnMount(
    uuidMusician,
    perPage,
    getListProfilePost,
    setUuid,
    setPage,
  );

  const noPostYetMessage = "Musician don't have any post";

  //* call when refreshing
  useRefreshingEffect(refreshing, getListProfilePost, getCreditCount, perPage);

  useStopRefreshing(feedIsLoading, setRefreshing);

  //? set no data into main cz of message
  useEffect(() => {
    if (
      dataPostList?.length === 0 &&
      feedMessage === noPostYetMessage &&
      filterActive
    ) {
      setDataMain(dataPostList);
    }
  }, [dataPostList, feedMessage]);

  //* set response data list post to main data
  useSetDataToMainData(dataPostList, filterActive, dataMain, setDataMain);

  //* hit sort by endpoint
  useSortFilterPostType(
    selectedFilterMenu?.label,
    getListProfilePost,
    perPage,
    page,
    categoryValue,
    setFilterActive,
    setFilterByValue,
    uuidMusician,
  );

  //* hit category endpoint
  useCategoryFilter(
    selectedCategoryMenu?.label,
    getListProfilePost,
    perPage,
    page,
    filterByValue,
    selectedCategoryMenu?.value,
    setFilterActive,
    setCategoryValue,
    uuidMusician,
  );

  //* Handle when end of Scroll
  useEffect(() => {
    if (endReached) {
      handleEndScrollOnFeed(
        dataMain,
        getListProfilePost,
        perPage,
        page,
        setPage,
        setFilterActive,
        undefined,
        undefined,
        undefined,
        uuidMusician.length > 0 ? uuidMusician : undefined,
      );
    }
  }, [endReached]);

  //* Allow pagination when there's still data response
  useEffect(() => {
    if (dataPostList && dataPostList.length > 0) {
      setAllowPagination(true);
      setEndReached(false);
    }
  }, [dataPostList]);

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
        // ? Edit Post
        case '1':
          if (profileStore.data.isBanned) {
            setModalBanned(true);
          } else {
            setUriVideo(null);
            setDataCreatePost(null);
            setDataVideo(undefined);
            let dataSelected = dataMain.filter(
              data => data.id === selectedIdPost,
            );
            navigation.navigate('CreatePost', {postData: dataSelected[0]});
          }
          break;
        // ? Delete Post
        case '2':
          setDeletePost({id: selectedIdPost});
          setDataMain(dataMain.filter(data => data.id !== selectedIdPost));
          break;
        // ? To Profile
        case '11':
          navigation.navigate('MusicianProfile', {
            id: selectedUserUuid,
          });
          break;
        // ? Report Post
        case '22':
          setReportToast(true);
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

  const handleOnBlur = () => {
    setModalConfirm(true);
  };

  const handleConfirmModal = () => {
    setModalConfirm(false);
    navigation.navigate('ExclusiveContent', {data: props});
  };

  const handleMaybeLater = () => {
    setModalConfirm(false);
  };

  const handleEmptyStateOnPress = () => {
    if (profileStore?.data.isBanned) {
      setShowModalPost({
        isExclusivePostModal: false,
        isSetExclusiveSetting: false,
        isBanned: true,
      });
    } else {
      setShowModalPost({
        isExclusivePostModal: true,
        isSetExclusiveSetting: false,
        isBanned: false,
      });
      getExclusiveContent({uuid});
    }
  };

  const handleCreatePostBackdrop = () => {
    setShowModalPost({
      isExclusivePostModal: false,
      isSetExclusiveSetting: false,
      isBanned: false,
    });
  };

  const handleChoiceOnPress = (value: 'choiceA' | 'choiceB') => {
    setPostChoice(value);
    setShowModalPost({
      isExclusivePostModal: false,
      isSetExclusiveSetting: false,
      isBanned: false,
    });
  };

  const handleOnModalHide = () => {
    if (postChoice === 'choiceA') {
      uriVideo && setUriVideo(null);
      setPostChoice(undefined);
      navigation.navigate('CreatePost', {audience: 'Feed.Public'});
    } else if (postChoice === 'choiceB') {
      if (dataExclusiveContent === null) {
        setPostChoice(undefined);
        setShowModalPost({
          isExclusivePostModal: false,
          isSetExclusiveSetting: true,
          isBanned: false,
        });
      } else {
        uriVideo && setUriVideo(null);
        setPostChoice(undefined);
        navigation.navigate('CreatePost', {audience: 'Feed.Exclusive'});
      }
    }
  };

  const handleConfirmModalExclusive = () => {
    setShowModalPost({
      isExclusivePostModal: false,
      isSetExclusiveSetting: false,
      isBanned: false,
    });
    navigation.navigate('ExclusiveContentSetting', {type: 'navToCreatePost'});
  };

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

  const handleCloseBanModal = () => {
    setModalBanned(false);
  };

  const handleOkBanModal = () => {
    setModalBanned(false);
    navigation.navigate('Setting');
  };

  return (
    <>
      <View style={styles.filterContainer}>
        <DropDownFilter
          labelCaption={
            selectedFilterMenu
              ? t(selectedFilterMenu.label)
              : t('Feed.FilterBy.Title')
          }
          dataFilter={dropDownDataFilterBy}
          selectedMenu={setSelectedFilterMenu}
          leftPosition={widthResponsive(58)}
          topPosition={widthResponsive(3)}
          bottomPosition={widthResponsive(-25)}
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
          dataFilter={dropDownDataCategory}
          selectedMenu={setSelectedCategoryMenu}
          leftPosition={
            Platform.OS === 'ios' ? widthResponsive(-26) : widthResponsive(-23)
          }
          topPosition={widthResponsive(3)}
          bottomPosition={widthResponsive(-25)}
          containerStyle={{
            marginTop: widthResponsive(20),
            marginBottom: widthResponsive(20),
          }}
        />
      </View>
      {dataMain !== null && dataMain.length !== 0 ? (
        <View
          style={{
            flex: 1,
            marginHorizontal: widthResponsive(-24),
          }}>
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
            scrollEnabled={false}
            renderItem={({item, index}: RenderItemProps) => (
              <>
                <ListCard.PostList
                  data={item}
                  toDetailOnPress={
                    item.isPremiumPost &&
                    item.musician.uuid !== MyUuid &&
                    !item.isSubscribe
                      ? handleOnBlur
                      : () => {
                          handleToDetailMusician(item.musician.uuid);
                        }
                  }
                  onPress={
                    item.isPremiumPost &&
                    item.musician.uuid !== MyUuid &&
                    !item.isSubscribe
                      ? handleOnBlur
                      : () => cardOnPress(item.id)
                  }
                  likeOnPress={() => likeOnPress(item.id, item.isLiked)}
                  likePressed={likePressedInFeed(selectedId, item, recorder)}
                  likeCount={likesCountInFeed(selectedId, item, recorder)}
                  tokenOnPress={tokenOnPress}
                  shareOnPress={() => shareOnPress(item)}
                  selectedMenu={setSelectedMenuPost}
                  selectedIdPost={setSelectedIdPost}
                  selectedUserUuid={setSelectedUserUuid}
                  showDropdown={
                    item.isPremiumPost &&
                    item.musician.uuid !== MyUuid &&
                    !item.isSubscribe
                      ? false
                      : true
                  }
                  reportSent={
                    idReported.includes(item.id) ? true : item.reportSent
                  }
                  onProfile
                  noNavigate
                  children={
                    <ChildrenCard
                      data={item}
                      onPress={
                        item.isPremiumPost &&
                        item.musician.uuid !== MyUuid &&
                        !item.isSubscribe
                          ? handleOnBlur
                          : onPressPlaySong
                      }
                      isPlay={isPlaying}
                      playOrPause={
                        item.isPremiumPost &&
                        item.musician.uuid !== MyUuid &&
                        !item.isSubscribe
                          ? handleOnBlur
                          : handlePausePlay
                      }
                      pauseModeOn={pauseModeOn}
                      currentProgress={playerProgress.position}
                      duration={playerProgress.duration}
                      seekPlayer={
                        item.isPremiumPost &&
                        item.musician.uuid !== MyUuid &&
                        !item.isSubscribe
                          ? handleOnBlur
                          : seekPlayer
                      }
                      isIdNowPlaying={item.id === idNowPlaying}
                      blurModeOn={
                        item.isPremiumPost &&
                        item.musician.uuid !== MyUuid &&
                        !item.isSubscribe
                      }
                    />
                  }
                />
                <Gap height={16} />
              </>
            )}
          />
        </View>
      ) : dataMain?.length === 0 && feedMessage === 'you not follow anyone' ? (
        <ListToFollowMusician />
      ) : (
        <EmptyStateFeed
          text={t('EmptyState.Musician') || ''}
          onPress={handleEmptyStateOnPress}
          buttonCaption={t('Feed.EmptyStateButtonCaption') || ''}
        />
      )}
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
          dataReport ? onModalReportHide : () => console.log('modal is hide')
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
      {!refreshing && <ModalLoading visible={feedIsLoading} />}
      <ModalConfirm
        modalVisible={modalConfirm}
        title={'Subscribe to reveal exclusive content'}
        subtitle={
          'You need to subscribe exclusive content to unlock current post'
        }
        yesText={'Yes'}
        noText={'No'}
        onPressClose={handleMaybeLater}
        onPressOk={handleConfirmModal}
      />
      {/* //? Banned user modal */}
      <ModalConfirm
        modalVisible={modalBanned}
        title={`${t('Setting.PreventInteraction.Title')}`}
        subtitle={`${t('Setting.PreventInteraction.Subtitle')}`}
        yesText={`${t('Btn.Send')}`}
        noText={`${t('Btn.Cancel')}`}
        onPressClose={handleCloseBanModal}
        onPressOk={handleOkBanModal}
        textNavigate={`${t('Setting.PreventInteraction.TextNavigate')}`}
        textOnPress={handleOkBanModal}
      />
      {/* //? Confirm what post want to make */}
      <ModalConfirmChoice
        modalVisible={showModalPost.isExclusivePostModal}
        backdropOnPress={handleCreatePostBackdrop}
        choiceA={'Post as Public Content'}
        choiceB={'Post as Exclusive Content'}
        choiceOnPress={handleChoiceOnPress}
        onModalHide={handleOnModalHide}
      />
      <ModalConfirm
        modalVisible={showModalPost.isSetExclusiveSetting}
        title={t('Modal.ExclusiveContentConfirm.Title') || ''}
        subtitle={t('Modal.ExclusiveContentConfirm.Body') || ''}
        yesText={t('Modal.ExclusiveContentConfirm.ButtonOk') || ''}
        noText={t('Modal.ExclusiveContentConfirm.ButtonCancel') || ''}
        onPressClose={handleMaybeLater}
        onPressOk={handleConfirmModalExclusive}
      />

      {/* //? Banned user modal */}
      <ModalConfirm
        modalVisible={showModalPost.isBanned}
        title={`${t('Setting.PreventInteraction.Title')}`}
        subtitle={`${t('Setting.PreventInteraction.Subtitle')}`}
        yesText={`${t('Btn.Send')}`}
        noText={`${t('Btn.Cancel')}`}
        onPressClose={handleCloseBanModal}
        onPressOk={handleOkBanModal}
        textNavigate={`${t('Setting.PreventInteraction.TextNavigate')}`}
        textOnPress={handleOkBanModal}
      />
    </>
  );
};

export default PostListProfile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: heightResponsive(10),
    marginBottom: heightResponsive(8),
  },
  filterContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.Dark[800],
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
  emptyState: {
    color: color.Neutral[10],
    paddingVertical: heightResponsive(100),
    textAlign: 'center',
  },
});
