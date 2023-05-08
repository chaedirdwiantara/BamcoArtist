import React, {FC, useCallback, useEffect, useState} from 'react';
import {FlatList, Platform, StyleSheet, Text, View} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {
  BottomSheetGuest,
  DropDownFilter,
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
import {heightPercentage, heightResponsive, widthResponsive} from '../../utils';
import {LogBox} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {storage} from '../../hooks/use-storage.hook';
import {EmptyState} from '../../components/molecule/EmptyState/EmptyState';
import {PostList} from '../../interface/feed.interface';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {dateFormat} from '../../utils/date-format';
import categoryNormalize from '../../utils/categoryNormalize';
import {TickCircleIcon} from '../../assets/icon';
import {profileStorage} from '../../hooks/use-storage.hook';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {useTranslation} from 'react-i18next';
import {useCreditHook} from '../../hooks/use-credit.hook';
import ChildrenCard from './ChildrenCard';
import {
  likePressedInFeed,
  likePressedOnFeed,
  likesCountInFeed,
  playSongOnFeed,
} from './ListUtils/ListFunction';
import Clipboard from '@react-native-community/clipboard';

interface PostListProps {
  dataRightDropdown: DataDropDownType[];
  dataLeftDropdown: DropDownFilterType[] | DropDownSortType[];
  hideDropdown?: boolean;
}

const urlText =
  'https://open.ssu.io/track/19AiJfAtRiccvSU1EWcttT?si=36b9a686dad44ae0';

const PostListHome: FC<PostListProps> = (props: PostListProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const isLogin = storage.getString('profile');
  const {dataRightDropdown, dataLeftDropdown, hideDropdown} = props;
  // ignore warning
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const {
    feedIsLoading,
    dataTopPost,
    setLikePost,
    setUnlikePost,
    getListTopPost,
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

  const [dataMain, setDataMain] = useState<PostList[]>([]);
  const [modalGuestVisible, setModalGuestVisible] = useState<boolean>(false);
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

  // * UPDATE HOOKS
  const [selectedIdPost, setSelectedIdPost] = useState<string>();
  const [selectedMenu, setSelectedMenu] = useState<DataDropDownType>();
  const [selectedCategoryMenu, setSelectedCategoryMenu] =
    useState<DataDropDownType>();
  const [selectedFilterMenu, setSelectedFilterMenu] =
    useState<DataDropDownType>();

  //* MUSIC HOOKS
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [idNowPlaying, setIdNowPlaing] = useState<string>();

  useEffect(() => {
    getCreditCount();
  }, [modalDonate]);

  useFocusEffect(
    useCallback(() => {
      getListTopPost({page: page, perPage: perPage});
    }, []),
  );

  useEffect(() => {
    setDataMain(dataTopPost);
  }, [dataTopPost]);

  //* hit filter
  useEffect(() => {
    if (selectedFilterMenu) {
      const dates = new Date();
      dates.setDate(dates.getDate() - Number(selectedFilterMenu.value));
      let dataFilter = [...dataTopPost];
      dataFilter = dataFilter.filter(x => new Date(x.createdAt) > dates);
      setDataMain(dataFilter);
    }
  }, [selectedFilterMenu]);

  //* hit category endpoint
  useEffect(() => {
    if (selectedCategoryMenu) {
      selectedCategoryMenu.label === 'Home.Tab.TopPost.Category.All'
        ? getListTopPost({
            page: page,
            perPage: perPage,
          })
        : getListTopPost({
            page: 1,
            perPage: perPage,
            category: selectedCategoryMenu.value,
          });
    }
  }, [selectedCategoryMenu]);

  const cardOnPress = (data: PostList) => {
    isLogin
      ? navigation.navigate('PostDetail', data)
      : setModalGuestVisible(true);
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
    if (isLogin) {
      setModalShare(true);
    } else {
      setModalGuestVisible(true);
    }
  };

  const tokenOnPress = () => {
    if (isLogin) {
      setModalDonate(true);
    } else {
      setModalGuestVisible(true);
    }
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
      {!hideDropdown && (
        <View style={styles.container}>
          <DropDownFilter
            labelCaption={
              selectedFilterMenu
                ? t(selectedFilterMenu.label)
                : t('Home.Tab.TopPost.Filter.Title')
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
      )}
      {dataMain?.length !== 0 ? (
        <View
          style={{
            flex: 1,
            marginHorizontal: widthResponsive(-24),
          }}>
          <FlatList
            data={dataMain}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingBottom:
                Platform.OS === 'ios'
                  ? heightResponsive(25)
                  : heightResponsive(40),
            }}
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
                  tokenOnPress={tokenOnPress}
                  shareOnPress={shareOnPress}
                  commentCount={item.commentsCount}
                  myPost={item.musician.uuid === profileStorage()?.uuid}
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
      ) : !feedIsLoading && dataMain?.length === 0 ? (
        <EmptyState
          text={t('Home.DiveIn.Trending.EmptyState')}
          containerStyle={styles.containerEmpty}
          textStyle={styles.emptyText}
          hideIcon={true}
        />
      ) : null}
      <BottomSheetGuest
        modalVisible={modalGuestVisible}
        onPressClose={() => setModalGuestVisible(false)}
      />
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
        onPressDonate={onPressDonate}
        modalVisible={modalDonate}
        onPressClose={onPressCloseModalDonate}
        onModalHide={() => setModalSuccessDonate(true)}
      />
      <ModalSuccessDonate
        modalVisible={modalSuccessDonate && trigger2ndModal ? true : false}
        toggleModal={onPressSuccess}
      />
    </>
  );
};

export default PostListHome;

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
    marginTop: widthResponsive(13),
    marginBottom: widthResponsive(10),
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
});
