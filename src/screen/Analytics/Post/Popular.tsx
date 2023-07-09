import {
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigations';
import {profileStorage, storage} from '../../../hooks/use-storage.hook';
import {useFeedHook} from '../../../hooks/use-feed.hook';
import {usePlayerHook} from '../../../hooks/use-player.hook';
import {useCreditHook} from '../../../hooks/use-credit.hook';
import {DataDropDownType, dropDownAlbumRange} from '../../../data/dropdown';
import {useTranslation} from 'react-i18next';
import {PostList} from '../../../interface/feed.interface';
import {
  DropDownFilter,
  Gap,
  ListCard,
  ModalDonate,
  ModalShare,
  ModalSuccessDonate,
  SsuToast,
} from '../../../components';
import {heightPercentage, widthResponsive} from '../../../utils';
import {dateFormat} from '../../../utils/date-format';
import categoryNormalize from '../../../utils/categoryNormalize';
import ChildrenCard from '../../ListCard/ChildrenCard';
import {StarPinkIcon, TickCircleIcon} from '../../../assets/icon';
import {color, font, typography} from '../../../theme';
import {mvs} from 'react-native-size-matters';

interface PopularPostProps {
  uuidMusician: string;
}

const PopularPost: FC<PopularPostProps> = (props: PopularPostProps) => {
  const {uuidMusician} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const MyUuid = profileStorage()?.uuid;
  const {
    feedIsLoading,
    feedIsError,
    feedMessage,
    dataPostList,
    getListDataPost,
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

  const {creditCount, getCreditCount} = useCreditHook();

  const [recorder, setRecorder] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>();
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<DataDropDownType>();
  const [selectedIdPost, setSelectedIdPost] = useState<string>();
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [idNowPlaying, setIdNowPlaing] = useState<string>();
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState(false);

  const {t} = useTranslation();

  useEffect(() => {
    getListDataPost({
      page: 1,
      perPage: 1,
      musician_uuid: uuidMusician,
      sortBy: 'popular',
    });
  }, [uuidMusician]);

  useEffect(() => {
    getCreditCount();
  }, [modalDonate]);

  const cardOnPress = (data: PostList) => {
    navigation.navigate('PostDetail', data);
  };

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

  const tokenOnPress = () => {
    setModalDonate(true);
  };

  const shareOnPress = () => {
    setModalShare(true);
  };

  const handlePausePlay = () => {
    if (isPlaying) {
      setPauseSong();
    } else {
      setPlaySong();
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

  // ! UPDATE POST AREA
  useEffect(() => {
    if (
      selectedIdPost !== undefined &&
      selectedMenu !== undefined &&
      dataPostList
    ) {
      if (t(selectedMenu.label) === 'Delete Post') {
        // setDeletePost({id: selectedIdPost});
        setSelectedMenu(undefined);
      }
      if (t(selectedMenu.label) === 'Edit Post') {
        navigation.navigate('CreatePost', {postData: dataPostList[0]});
        setSelectedMenu(undefined);
      }
    }
  }, [selectedIdPost, selectedMenu, dataPostList]);
  // ! END OF UPDATE POST AREA

  const lang = storage.getString('lang');
  const [selectedRange, setSelectedRange] = useState<DataDropDownType>({
    label: 'Home.Tab.Analytic.Album.Filter.Range.Alltime',
    value: '1',
  });

  return (
    //TODO:NAVIGATE TO POST LIST (TOP POST)
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      {dataPostList.length > 0 && (
        <>
          <View style={styles.titleStyle}>
            <StarPinkIcon />
            <Gap width={10} />
            <Text style={styles.textComp}>
              {t('Home.Tab.Analytic.Post.Popular.Title')}
            </Text>
          </View>
          {/* DROPDOWN AREA */}
          <View style={{width: 90, zIndex: 100}}>
            <DropDownFilter
              labelCaption={t(selectedRange.label)}
              dataFilter={dropDownAlbumRange}
              selectedMenu={setSelectedRange}
              leftPosition={
                lang === 'en' ? widthResponsive(-85) : widthResponsive(-85)
              }
              topPosition={widthResponsive(20)}
              containerStyle={styles.dropdownContainer}
              textCustomStyle={{color: color.Neutral[10], fontSize: mvs(11)}}
              iconColor={color.Neutral[10]}
              dropdownStyle={styles.dropdown}
            />
          </View>
          <ListCard.PostListOld
            containerStyles={{paddingHorizontal: 0}}
            onPress={() => cardOnPress(dataPostList[0])}
            likeOnPress={() =>
              likeOnPress(dataPostList[0].id, dataPostList[0].isLiked)
            }
            likePressed={
              selectedId === undefined
                ? dataPostList[0].isLiked
                : selectedId.includes(dataPostList[0].id) &&
                  recorder.includes(dataPostList[0].id)
                ? true
                : !selectedId.includes(dataPostList[0].id) &&
                  recorder.includes(dataPostList[0].id)
                ? false
                : !selectedId.includes(dataPostList[0].id) &&
                  !recorder.includes(dataPostList[0].id)
                ? dataPostList[0].isLiked
                : dataPostList[0].isLiked
            }
            likeCount={
              selectedId === undefined
                ? dataPostList[0].likesCount
                : selectedId.includes(dataPostList[0].id) &&
                  recorder.includes(dataPostList[0].id) &&
                  dataPostList[0].isLiked === true
                ? dataPostList[0].likesCount
                : selectedId.includes(dataPostList[0].id) &&
                  recorder.includes(dataPostList[0].id) &&
                  dataPostList[0].isLiked === false
                ? dataPostList[0].likesCount + 1
                : !selectedId.includes(dataPostList[0].id) &&
                  recorder.includes(dataPostList[0].id) &&
                  dataPostList[0].isLiked === true
                ? dataPostList[0].likesCount - 1
                : !selectedId.includes(dataPostList[0].id) &&
                  recorder.includes(dataPostList[0].id) &&
                  dataPostList[0].isLiked === false
                ? dataPostList[0].likesCount
                : dataPostList[0].likesCount
            }
            shareOnPress={shareOnPress}
            commentCount={dataPostList[0].commentsCount}
            children={
              <ChildrenCard
                data={dataPostList[0]}
                onPress={onPressPlaySong}
                isPlay={isPlaying}
                playOrPause={handlePausePlay}
                pauseModeOn={pauseModeOn}
                currentProgress={playerProgress.position}
                duration={playerProgress.duration}
                seekPlayer={seekPlayer}
                isIdNowPlaying={dataPostList[0].id === idNowPlaying}
                imgWidth={125}
                imgWidth2={290}
              />
            }
          />
        </>
      )}
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
    </TouchableOpacity>
  );
};

export default PopularPost;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: color.Dark[400],
    borderRadius: 4,
    padding: widthResponsive(20),
  },
  titleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textComp: {
    fontFamily: font.InterRegular,
    fontSize: mvs(18),
    fontWeight: '600',
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
    borderWidth: 1,
    borderColor: color.Dark[400],
    paddingHorizontal: widthResponsive(12),
    paddingVertical: widthResponsive(8),
    borderRadius: 4,
  },
  dropdown: {
    backgroundColor: color.Dark[800],
    borderWidth: 1,
    borderColor: color.Dark[400],
  },
});
