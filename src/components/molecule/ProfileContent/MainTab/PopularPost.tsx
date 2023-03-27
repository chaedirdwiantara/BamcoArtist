import {InteractionManager, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {color, font, typography} from '../../../../theme';
import {mvs} from 'react-native-size-matters';
import {ListCard} from '../../ListCard';
import {Gap, SsuToast} from '../../../atom';
import {useFeedHook} from '../../../../hooks/use-feed.hook';
import categoryNormalize from '../../../../utils/categoryNormalize';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../navigations';
import {PostList} from '../../../../interface/feed.interface';
import {dateFormat} from '../../../../utils/date-format';
import {DataDropDownType} from '../../../../data/dropdown';
import ChildrenCard from '../../../../screen/ListCard/ChildrenCard';
import {usePlayerHook} from '../../../../hooks/use-player.hook';
import {profileStorage} from '../../../../hooks/use-storage.hook';
import {useCreditHook} from '../../../../hooks/use-credit.hook';
import {ModalDonate} from '../../Modal/ModalDonate';
import {ModalSuccessDonate} from '../../Modal/ModalSuccessDonate';
import {ModalShare} from '../../Modal/ModalShare';
import {useTranslation} from 'react-i18next';
import {TickCircleIcon} from '../../../../assets/icon';
import {heightPercentage, widthResponsive} from '../../../../utils';

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

  return (
    <View>
      <Text style={styles.textComp}>Popular Post</Text>
      <Gap height={16} />
      {dataPostList.length > 0 && (
        <ListCard.PostList
          containerStyles={{paddingHorizontal: 0}}
          toDetailOnPress={() => {}}
          musicianName={dataPostList[0].musician.fullname}
          musicianId={`@${dataPostList[0].musician.username}`}
          imgUri={
            dataPostList[0].musician.imageProfileUrls.length !== 0
              ? dataPostList[0].musician.imageProfileUrls[0]?.image
              : ''
          }
          postDate={
            dataPostList[0]?.timeAgo
              ? dataPostList[0].timeAgo
              : dateFormat(dataPostList[0].createdAt)
          }
          postDate2={dataPostList[0].createdAt}
          category={categoryNormalize(dataPostList[0].category)}
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
          tokenOnPress={tokenOnPress}
          shareOnPress={shareOnPress}
          commentCount={dataPostList[0].commentsCount}
          myPost={dataPostList[0].musician.uuid === MyUuid}
          selectedMenu={setSelectedMenu}
          idPost={dataPostList[0].id}
          selectedIdPost={setSelectedIdPost}
          isPremium={dataPostList[0].isPremiumPost}
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
            />
          }
        />
      )}
      <Gap height={16} />
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
    </View>
  );
};

export default PopularPost;

const styles = StyleSheet.create({
  textComp: {
    fontFamily: font.InterRegular,
    fontSize: mvs(16),
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
});
