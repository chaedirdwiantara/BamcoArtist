import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  InteractionManager,
  NativeModules,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {
  Button,
  FilterModal,
  Gap,
  ListCard,
  ModalConfirm,
  ModalDonate,
  ModalShare,
  ModalSuccessDonate,
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
import {RootStackParams} from '../../navigations';
import {EmptyState} from '../../components/molecule/EmptyState/EmptyState';
import ListToFollowMusician from './ListToFollowMusician';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {PostList} from '../../interface/feed.interface';
import {dateFormat} from '../../utils/date-format';
import {TickCircleIcon} from '../../assets/icon';
import categoryNormalize from '../../utils/categoryNormalize';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {useTranslation} from 'react-i18next';
import {useCreditHook} from '../../hooks/use-credit.hook';
import ChildrenCard from './ChildrenCard';
import {profileStorage} from '../../hooks/use-storage.hook';
import LoadingSpinner from '../../components/atom/Loading/LoadingSpinner';

const {height} = Dimensions.get('screen');

interface PostListProps {
  dataRightDropdown: DataDropDownType[];
  dataLeftDropdown: DropDownFilterType[] | DropDownSortType[];
  uuidMusician?: string;
}

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

const PostListProfile: FC<PostListProps> = (props: PostListProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {uuidMusician = ''} = props;

  const [recorder, setRecorder] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>();
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState(false);
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
  const [selectedSort, setSelectedSort] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCategoryValue, setSelectedCategoryValue] =
    useState<string>('');
  const [isModalVisible, setModalVisible] = useState({
    modalSortBy: false,
    modalCategory: false,
  });
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalConfirm, setModalConfirm] = useState(false);

  // * UPDATE HOOKS
  const [selectedIdPost, setSelectedIdPost] = useState<string>();
  const [selectedMenu, setSelectedMenu] = useState<DataDropDownType>();

  //* MUSIC HOOKS
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [idNowPlaying, setIdNowPlaing] = useState<string>();

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

  const {creditCount, getCreditCount} = useCreditHook();
  const MyUuid = profileStorage()?.uuid;

  useEffect(() => {
    getCreditCount();
  }, [modalDonate]);

  useFocusEffect(
    useCallback(() => {
      uuidMusician !== ''
        ? (getListProfilePost({
            page: 1,
            perPage: perPage,
            musician_uuid: uuidMusician,
          }),
          setUuid(uuidMusician))
        : getListProfilePost({page: 1, perPage: perPage});
      setPage(1);
    }, [uuidMusician]),
  );

  //* call when refreshing
  useEffect(() => {
    if (refreshing) {
      getListProfilePost({
        page: 1,
        perPage: perPage,
      });
      getCreditCount();
    }
  }, [refreshing]);

  useEffect(() => {
    if (!feedIsLoading) {
      setRefreshing(false);
    }
  }, [feedIsLoading]);

  //* set response data list post to main data
  useEffect(() => {
    if (dataPostList && filterActive === false) {
      let filterDataPost = [...dataMain, ...dataPostList];
      let filterDuplicate = filterDataPost.filter(
        (v, i, a) => a.findIndex(v2 => v2.id === v.id) === i,
      );
      setDataMain(filterDuplicate);
    }
    if (dataPostList && filterActive) {
      setDataMain(dataPostList);
    }
  }, [dataPostList, filterActive]);

  //* Handle when end of Scroll
  const handleEndScroll = () => {
    if (dataMain.length >= 15) {
      getListProfilePost({
        page: page + 1,
        perPage: perPage,
      });
      setPage(page + 1);
      setFilterActive(false);
    }
  };

  const cardOnPress = (data: PostList) => {
    navigation.navigate('PostDetail', data);
  };

  const likeOnPress = (id: string, isLiked: boolean) => {
    if (isLiked === true && selectedId === undefined) {
      setUnlikePost({id});
      setSelectedId([]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (!isLiked && selectedId === undefined) {
      setLikePost({id});
      setSelectedId([id]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === true &&
      !selectedId?.includes(id) &&
      !recorder.includes(id)
    ) {
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
    if (
      isLiked === true &&
      !selectedId?.includes(id) &&
      recorder.includes(id)
    ) {
      setLikePost({id});
      setSelectedId(selectedId ? [...selectedId, id] : [id]);
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
    if (
      isLiked === false &&
      !selectedId?.includes(id) &&
      recorder.includes(id)
    ) {
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
    if (
      isLiked === false &&
      selectedId?.includes(id) &&
      recorder.includes(id)
    ) {
      setUnlikePost({id});
      setSelectedId(selectedId.filter((x: string) => x !== id));
      if (!recorder.includes(id)) {
        setRecorder([...recorder, id]);
      }
    }
  };

  const shareOnPress = () => {
    setModalShare(true);
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

  // ! MUSIC AREA
  const onPressPlaySong = (val: PostList) => {
    let data = [val];
    addPlaylistFeed({
      dataSong: data,
      playSongId: Number(val.quoteToPost.targetId),
      isPlay: true,
    });
    setPlaySong();
    setPauseModeOn(true);
    setIdNowPlaing(val.id);
    hidePlayer();
  };

  const handlePausePlay = () => {
    if (isPlaying) {
      setPauseSong();
    } else {
      setPlaySong();
    }
  };
  // ! END OF MUSIC AREA

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
            renderItem={({item}) => (
              <>
                <ListCard.PostList
                  toDetailOnPress={
                    item.isPremiumPost && item.musician.uuid !== MyUuid
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
                    item.isPremiumPost && item.musician.uuid !== MyUuid
                      ? handleOnBlur
                      : () => cardOnPress(item)
                  }
                  likeOnPress={() => likeOnPress(item.id, item.isLiked)}
                  likePressed={
                    selectedId === undefined
                      ? item.isLiked
                      : selectedId.includes(item.id) &&
                        recorder.includes(item.id)
                      ? true
                      : !selectedId.includes(item.id) &&
                        recorder.includes(item.id)
                      ? false
                      : !selectedId.includes(item.id) &&
                        !recorder.includes(item.id)
                      ? item.isLiked
                      : item.isLiked
                  }
                  likeCount={
                    selectedId === undefined
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
                      : item.likesCount
                  }
                  tokenOnPress={tokenOnPress}
                  shareOnPress={shareOnPress}
                  commentCount={item.commentsCount}
                  myPost={item.musician.uuid === MyUuid}
                  selectedMenu={setSelectedMenu}
                  idPost={item.id}
                  selectedIdPost={setSelectedIdPost}
                  isPremium={item.isPremiumPost}
                  noNavigate
                  children={
                    <ChildrenCard
                      data={item}
                      onPress={
                        item.isPremiumPost && item.musician.uuid !== MyUuid
                          ? handleOnBlur
                          : onPressPlaySong
                      }
                      isPlay={isPlaying}
                      playOrPause={
                        item.isPremiumPost && item.musician.uuid !== MyUuid
                          ? handleOnBlur
                          : handlePausePlay
                      }
                      pauseModeOn={pauseModeOn}
                      currentProgress={playerProgress.position}
                      duration={playerProgress.duration}
                      seekPlayer={
                        item.isPremiumPost && item.musician.uuid !== MyUuid
                          ? handleOnBlur
                          : seekPlayer
                      }
                      isIdNowPlaying={item.id === idNowPlaying}
                      blurModeOn={
                        item.isPremiumPost && item.musician.uuid !== MyUuid
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
      ) : dataMain?.length === 0 && feedMessage === 'musician not have post' ? (
        <EmptyState
          text={t('EmptyState.FollowMusician') || ''}
          containerStyle={{
            justifyContent: 'flex-start',
            paddingTop: heightPercentage(24),
          }}
        />
      ) : null}
      <ModalShare
        url={
          'https://open.ssu.io/track/19AiJfAtRiccvSU1EWcttT?si=36b9a686dad44ae0'
        }
        modalVisible={modalShare}
        onPressClose={() => setModalShare(false)}
        titleModal={t('General.Share.Feed')}
        hideMusic
        onPressCopy={() =>
          InteractionManager.runAfterInteractions(() => setToastVisible(true))
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
        totalCoin={creditCount}
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
  dropdownContainer: {
    marginTop: 7,
    marginBottom: 9,
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
