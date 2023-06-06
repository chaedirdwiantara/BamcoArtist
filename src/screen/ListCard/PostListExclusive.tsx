import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {
  ButtonGradient,
  DropDownFilter,
  Gap,
  ListCard,
  ModalDonate,
  ModalShare,
  ModalSuccessDonate,
  NewPostAvail,
  SsuToast,
} from '../../components';
import {
  DataDropDownType,
  DropDownFilterType,
  DropDownSortType,
} from '../../data/dropdown';
import {color, font, typography} from '../../theme';
import {
  heightPercentage,
  heightResponsive,
  widthPercentage,
  widthResponsive,
} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
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
import {useSettingHook} from '../../hooks/use-setting.hook';
import {profileStorage} from '../../hooks/use-storage.hook';
import ChildrenCard from './ChildrenCard';
import {
  handleEndScrollOnFeed,
  likePressedInFeed,
  likePressedOnFeed,
  likesCountInFeed,
  playSongOnFeed,
  useCategoryFilter,
  useCheckNewUpdate,
  useGetCreditCount,
  useGetDataOnMount,
  useSetDataMainQuery,
  useSetDataToMainData,
  useSortByFilter,
} from './ListUtils/ListFunction';
import Clipboard from '@react-native-community/clipboard';
import {useQuery} from 'react-query';

const {height} = Dimensions.get('screen');

type OnScrollEventHandler = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

interface PostListProps {
  dataRightDropdown: DataDropDownType[];
  dataLeftDropdown: DropDownFilterType[] | DropDownSortType[];
  uuidMusician?: string;
}

const urlText =
  'https://open.ssu.io/track/19AiJfAtRiccvSU1EWcttT?si=36b9a686dad44ae0';

const PostListExclusive: FC<PostListProps> = (props: PostListProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataRightDropdown, dataLeftDropdown, uuidMusician = ''} = props;

  const {dataExclusiveContent, getExclusiveContent} = useSettingHook();
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
  const [dataMain, setDataMain] = useState<PostList[]>([]);
  const [filterActive, setFilterActive] = useState<boolean>(true);
  const [filterByValue, setFilterByValue] = useState<string>();
  const [categoryValue, setCategoryValue] = useState<string>();
  const [uuid, setUuid] = useState<string>();
  const [selectedFilterMenu, setSelectedFilterMenu] =
    useState<DataDropDownType>();
  const [selectedCategoryMenu, setSelectedCategoryMenu] =
    useState<DataDropDownType>();
  const [scrollEffect, setScrollEffect] = useState(false);
  const [selectedMusicianId, setSelectedMusicianId] = useState<string>('');

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
    getListDataMyPost,
    setLikePost,
    setUnlikePost,
    setDeletePost,
    getListDataExclusiveQuery,
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
    'posts-exclusive',
    () =>
      getListDataExclusiveQuery({
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

  const fetchExclusiveContent = () => {
    getExclusiveContent({uuid: MyUuid});
  };

  useEffect(() => {
    fetchExclusiveContent();
  }, []);

  //* get data on mount this page
  useGetCreditCount(modalDonate, getCreditCount);

  useGetDataOnMount(
    uuidMusician,
    perPage,
    getListDataMyPost,
    setUuid,
    setPage,
    true,
  );

  //* set response data list post to main data
  useSetDataToMainData(dataPostList, filterActive, dataMain, setDataMain);

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
    uuid,
    true,
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
    uuid,
    true,
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
      true,
      uuid,
    );
  };

  //* Handle when scrolling
  const handleOnScroll: OnScrollEventHandler = event => {
    let offsetY = event.nativeEvent.contentOffset.y;
    const scrolled = offsetY > 120;
    setScrollEffect(scrolled);
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
      Clipboard.setString(urlText);
    }
  };

  // ! UPDATE COMMENT AREA
  useEffect(() => {
    if (
      selectedIdPost !== undefined &&
      selectedMenu !== undefined &&
      dataMain
    ) {
      if (selectedMenu.label === 'Delete Post') {
        setDeletePost({id: selectedIdPost});
        setDataMain(dataMain.filter(data => data.id !== selectedIdPost));
        setSelectedMenu(undefined);
      }
      if (selectedMenu.label === 'Edit Post') {
        let dataSelected = dataMain.filter(data => data.id === selectedIdPost);
        navigation.navigate('CreatePost', {postData: dataSelected[0]});
        setSelectedMenu(undefined);
      }
    }
  }, [selectedIdPost, selectedMenu, dataMain]);
  // ! END OF UPDATE COMMENT AREA

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
      {/* //TODO: HOLD SCROLL EFFECT {!scrollEffect && ( */}
      <View style={styles.container}>
        <DropDownFilter
          labelCaption={
            selectedFilterMenu
              ? t(selectedFilterMenu.label)
              : t('Feed.Sort.Title')
          }
          dataFilter={dataLeftDropdown}
          selectedMenu={setSelectedFilterMenu}
          leftPosition={widthResponsive(-60)}
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
        />
      </View>
      {/* )} */}
      {dataExclusiveContent && feedIsLoading === false ? (
        dataMain !== null && dataMain.length !== 0 ? (
          <View style={{flex: 1, marginHorizontal: widthResponsive(-24)}}>
            <FlatList
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
              onEndReached={handleEndScroll}
              onScroll={handleOnScroll}
              renderItem={({item, index}) => (
                <>
                  <ListCard.PostList
                    toDetailOnPress={() =>
                      handleToDetailMusician(item.musician.uuid)
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
                    onPress={() => cardOnPress(item)}
                    likeOnPress={() => likeOnPress(item.id, item.isLiked)}
                    likePressed={likePressedInFeed(selectedId, item, recorder)}
                    likeCount={likesCountInFeed(selectedId, item, recorder)}
                    tokenOnPress={() => tokenOnPress(item.musician.uuid)}
                    shareOnPress={shareOnPress}
                    commentCount={item.commentsCount}
                    myPost={item.musician.uuid === MyUuid}
                    selectedMenu={setSelectedMenu}
                    idPost={item.id}
                    selectedIdPost={setSelectedIdPost}
                    isPremium={item.isPremiumPost}
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
        ) : dataMain?.length === 0 &&
          feedMessage === 'you not follow anyone' ? (
          <ListToFollowMusician />
        ) : dataMain?.length === 0 &&
          feedMessage === 'you not subscribe any premium content' ? (
          <EmptyState
            text={t('EmptyState.Donate') || ''}
            containerStyle={{
              justifyContent: 'flex-start',
              paddingTop: heightPercentage(24),
            }}
            icon={<FriedEggIcon />}
          />
        ) : dataMain?.length === 0 &&
          feedMessage ===
            'Your subscribed musician has not yet posted any exclusive content.' ? (
          <EmptyState
            text={t('EmptyState.Exclusive') || ''}
            containerStyle={{
              justifyContent: 'flex-start',
              paddingTop: heightPercentage(24),
            }}
            icon={<FriedEggIcon />}
          />
        ) : (
          <>
            <EmptyState
              text={t('EmptyState.NoECData') || ''}
              containerStyle={{
                justifyContent: 'flex-start',
                paddingTop: heightPercentage(24),
              }}
              icon={<FriedEggIcon />}
            />
            <View style={styles.btnECContainer}>
              <ButtonGradient
                label={t('Btn.Create')}
                onPress={() =>
                  navigation.navigate('CreatePost', {
                    audience: 'Feed.Exclusive',
                  })
                }
                containerStyles={{paddingTop: heightPercentage(20)}}
                gradientStyles={styles.btnEC}
              />
            </View>
          </>
        )
      ) : !dataExclusiveContent && feedIsLoading === false ? (
        <>
          <EmptyState
            text={t('EmptyState.NoECData') || ''}
            containerStyle={{
              justifyContent: 'flex-start',
              paddingTop: heightPercentage(24),
            }}
            icon={<FriedEggIcon />}
          />
          <View style={styles.btnECContainer}>
            <ButtonGradient
              label={t('Btn.Create')}
              onPress={() => navigation.navigate('CreatePost')}
              containerStyles={{paddingTop: heightPercentage(20)}}
              gradientStyles={styles.btnEC}
            />
          </View>
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
      <ModalLoading visible={queryDataLoading && !previousData} />

      {showUpdateNotif && (
        <NewPostAvail
          onPress={handleUpdateClick}
          numberOfNewData={numberOfNewData}
        />
      )}
    </>
  );
};

export default PostListExclusive;

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
  btnEC: {
    width: widthPercentage(120),
    aspectRatio: heightPercentage(155 / 45),
  },
  btnECContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
