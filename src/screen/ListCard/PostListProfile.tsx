import React, {FC, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {
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
import {dateFormat} from '../../utils/date-format';
import categoryNormalize from '../../utils/categoryNormalize';
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
  useGetCreditCount,
  useGetDataOnMount,
  useRefreshingEffect,
  useSetDataToMainData,
  useStopRefreshing,
} from './ListUtils/ListFunction';
import Clipboard from '@react-native-community/clipboard';
import {imageShare} from '../../utils/share';
import {useShareHook} from '../../hooks/use-share.hook';
import {DataDropDownType} from '../../data/dropdown';
import {useReportHook} from '../../hooks/use-report.hook';
import {feedReportRecorded} from '../../store/idReported';
import {ReportParamsProps} from '../../interface/report.interface';
import {ModalReport} from '../../components/molecule/Modal/ModalReport';
import {reportingMenu} from '../../data/report';

const {height} = Dimensions.get('screen');

type RenderItemProps = {
  item: PostList;
  index: number;
};

interface PostListProps extends DataExclusiveResponse {
  uuidMusician?: string;
}

const PostListProfile: FC<PostListProps> = (props: PostListProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {coverImage, title, description, uuidMusician = ''} = props;

  const dataToExc = {coverImage, title, description};

  const [recorder, setRecorder] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>();
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [reportToast, setReportToast] = useState(false);
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

  const {creditCount, getCreditCount} = useCreditHook();
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

  //* call when refreshing

  useRefreshingEffect(refreshing, getListProfilePost, getCreditCount, perPage);

  useStopRefreshing(feedIsLoading, setRefreshing);

  //* set response data list post to main data
  useSetDataToMainData(dataPostList, filterActive, dataMain, setDataMain);

  //* Handle when end of Scroll
  const handleEndScroll = () => {
    handleEndScrollOnFeed(
      dataMain,
      getListProfilePost,
      perPage,
      page,
      setPage,
      setFilterActive,
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
        default:
          break;
      }
      setSelectedMenuPost(undefined);
    }
  }, [selectedIdPost, selectedMenuPost, selectedUserUuid]);

  //? set status disable after report sent to make sure the status report is updated
  useEffect(() => {
    if (dataReport && selectedIdPost) {
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

  const closeModalSuccess = () => {
    setDataReport(false);
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

  return (
    <>
      {dataMain !== null && dataMain.length !== 0 ? (
        <View
          style={{
            flex: 1,
            marginHorizontal: widthResponsive(-24),
            marginTop: widthResponsive(24),
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
            onEndReached={handleEndScroll}
            onEndReachedThreshold={1}
            renderItem={({item, index}: RenderItemProps) => (
              <>
                <ListCard.PostList
                  toDetailOnPress={
                    item.isPremiumPost &&
                    item.musician.uuid !== MyUuid &&
                    !item.isSubscribe
                      ? handleOnBlur
                      : () => {
                          handleToDetailMusician(item.musician.uuid);
                        }
                  }
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
                  onPress={
                    item.isPremiumPost &&
                    item.musician.uuid !== MyUuid &&
                    !item.isSubscribe
                      ? handleOnBlur
                      : () => cardOnPress(item)
                  }
                  likeOnPress={() => likeOnPress(item.id, item.isLiked)}
                  likePressed={likePressedInFeed(selectedId, item, recorder)}
                  likeCount={likesCountInFeed(selectedId, item, recorder)}
                  tokenOnPress={tokenOnPress}
                  shareOnPress={() => shareOnPress(item)}
                  commentCount={item.commentsCount}
                  myPost={item.musician.uuid === MyUuid}
                  musicianUuid={item.musician.uuid}
                  idPost={item.id}
                  selectedMenu={setSelectedMenuPost}
                  selectedIdPost={setSelectedIdPost}
                  selectedUserUuid={setSelectedUserUuid}
                  isPremium={item.isPremiumPost}
                  viewCount={item.viewsCount}
                  shareCount={item.shareCount}
                  showDropdown={
                    item.isPremiumPost &&
                    item.musician.uuid !== MyUuid &&
                    !item.isSubscribe
                      ? false
                      : true
                  }
                  reportSent={idReported.includes(item.id) ?? item.reportSent}
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
      ) : dataMain?.length === 0 &&
        feedMessage === `Musician don't have any post` ? (
        <Text style={styles.emptyState}>{t('EmptyState.Musician')}</Text>
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
      />
      {/* //? When report succesfully */}
      <SuccessToast
        toastVisible={dataReport}
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
