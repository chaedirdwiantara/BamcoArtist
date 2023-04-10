import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  InteractionManager,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ms, mvs} from 'react-native-size-matters';
import {
  Button,
  ButtonGradient,
  FilterModal,
  Gap,
  ListCard,
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
import {
  heightPercentage,
  heightResponsive,
  widthPercentage,
  widthResponsive,
} from '../../utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
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
import ImageModal from '../Detail/ImageModal';

const {height} = Dimensions.get('screen');

interface PostListProps {
  dataRightDropdown: DataDropDownType[];
  dataLeftDropdown: DropDownFilterType[] | DropDownSortType[];
  uuidMusician?: string;
}

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;

const PostListExclusive: FC<PostListProps> = (props: PostListProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const {dataRightDropdown, dataLeftDropdown, uuidMusician = ''} = props;

  const {dataExclusiveContent, getExclusiveContent} = useSettingHook();
  const [dataProfileImg, setDataProfileImg] = useState<string>('');
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

  const fetchExclusiveContent = () => {
    getExclusiveContent({uuid: MyUuid});
  };

  useEffect(() => {
    fetchExclusiveContent();
  }, []);

  useFocusEffect(
    useCallback(() => {
      uuidMusician !== ''
        ? (getListDataMyPost({
            page: 1,
            perPage: perPage,
            musician_uuid: uuidMusician,
            isPremium: true,
          }),
          setUuid(uuidMusician))
        : getListDataMyPost({page: 1, perPage: perPage, isPremium: true});
      setPage(1);
    }, [uuidMusician]),
  );

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

  //* hit sort by endpoint
  useEffect(() => {
    if (selectedSort) {
      const dataSortS =
        t(selectedSort.toLowerCase()) === 'feed.sort.latest'
          ? 'latest'
          : 'popular';

      getListDataMyPost({
        page: 1,
        perPage: perPage * page,
        sortBy: dataSortS,
        category: categoryValue,
        isPremium: true,
        musician_uuid: uuid,
      });
      setFilterActive(true);
      setFilterByValue(dataSortS);
    }
  }, [selectedSort]);

  //* hit category endpoint
  useEffect(() => {
    if (selectedCategory) {
      selectedCategory === 'Home.Tab.TopPost.Category.All'
        ? (getListDataMyPost({
            page: 1,
            perPage: perPage * page,
            sortBy: filterByValue,
            isPremium: true,
            musician_uuid: uuid,
          }),
          setFilterActive(false))
        : (getListDataMyPost({
            page: 1,
            perPage: perPage * page,
            category: selectedCategoryValue,
            sortBy: filterByValue,
            isPremium: true,
            musician_uuid: uuid,
          }),
          setFilterActive(true));
      setCategoryValue(selectedCategoryValue);
    }
  }, [selectedCategory, selectedCategoryValue]);

  //* Handle when end of Scroll
  const handleEndScroll = () => {
    if (dataMain.length >= 15) {
      getListDataMyPost({
        page: page + 1,
        perPage: perPage,
        category: categoryValue,
        sortBy: filterByValue,
        isPremium: true,
        musician_uuid: uuid,
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

  // ? OFFSET AREA
  const [offsetSortFilter, setOffsetSortFilter] = React.useState<{
    px: number;
    py: number;
  }>();
  const [offsetCategoryFilter, setOffsetCategoryFilter] = React.useState<{
    px: number;
    py: number;
  }>();

  // ? END OF OFFSET AREA

  return (
    <>
      <View style={styles.container}>
        <View
          style={styles.dropdownContainer}
          onLayout={event => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              setOffsetSortFilter({
                px: pageX + width,
                py: Platform.OS === 'android' ? pageY - barHeight : pageY,
              });
            });
          }}>
          <Button
            label={selectedSort ? t(selectedSort) : t('Feed.Sort.Title')}
            type="border"
            containerStyles={styles.categoryContainerStyle}
            textStyles={styles.categoryTextStyle}
            borderColor={'transparent'}
            typeOfButton={'withIcon'}
            onPress={() =>
              setModalVisible({
                modalSortBy: true,
                modalCategory: false,
              })
            }
          />
        </View>
        <View
          style={styles.dropdownContainer}
          onLayout={event => {
            event.target.measure((x, y, width, height, pageX, pageY) => {
              setOffsetCategoryFilter({
                px: pageX + width,
                py: Platform.OS === 'android' ? pageY - barHeight : pageY,
              });
            });
          }}>
          <Button
            label={
              selectedCategory
                ? t(selectedCategory)
                : t('Home.Tab.TopPost.Category.Title')
            }
            type="border"
            containerStyles={styles.categoryContainerStyle}
            textStyles={styles.categoryTextStyle}
            borderColor={'transparent'}
            typeOfButton={'withIcon'}
            onPress={() =>
              setModalVisible({
                modalSortBy: false,
                modalCategory: true,
              })
            }
          />
        </View>
      </View>
      {dataExclusiveContent && feedIsLoading === false ? (
        dataMain !== null && dataMain.length !== 0 ? (
          <View style={{flex: 1, marginHorizontal: widthResponsive(-24)}}>
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
              onEndReached={handleEndScroll}
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
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onPressClose={onPressCloseModalDonate}
        onModalHide={() => setModalSuccessDonate(true)}
      />
      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal ? true : false}
        toggleModal={onPressSuccess}
      />
      {offsetCategoryFilter !== undefined && (
        <FilterModal
          toggleModal={() =>
            setModalVisible({
              modalCategory: false,
              modalSortBy: false,
            })
          }
          modalVisible={isModalVisible.modalCategory}
          dataFilter={dataRightDropdown}
          filterOnPress={setSelectedCategory}
          sendCategory={setSelectedCategoryValue}
          translation={true}
          xPosition={offsetCategoryFilter?.px}
          yPosition={offsetCategoryFilter?.py}
          containerStyle={{
            top: offsetCategoryFilter?.py + ms(2),
            left: offsetCategoryFilter?.px - widthResponsive(125),
            width: widthResponsive(125),
          }}
          textStyle={{fontSize: mvs(10)}}
        />
      )}
      {offsetSortFilter !== undefined && (
        <FilterModal
          toggleModal={() =>
            setModalVisible({
              modalCategory: false,
              modalSortBy: false,
            })
          }
          modalVisible={isModalVisible.modalSortBy}
          dataFilter={dataLeftDropdown}
          filterOnPress={setSelectedSort}
          sendCategory={() => {}}
          translation={true}
          xPosition={offsetSortFilter?.px}
          yPosition={offsetSortFilter?.py}
          containerStyle={{
            top: offsetSortFilter?.py + ms(2),
            left: offsetSortFilter?.px - widthResponsive(58),
            width: widthResponsive(125),
          }}
          textStyle={{fontSize: mvs(10)}}
        />
      )}
      <ModalLoading visible={feedIsLoading} />
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
