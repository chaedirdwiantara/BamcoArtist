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
import {profileStorage, storage} from '../../../../hooks/use-storage.hook';
import {useCreditHook} from '../../../../hooks/use-credit.hook';
import {ModalDonate} from '../../Modal/ModalDonate';
import {ModalSuccessDonate} from '../../Modal/ModalSuccessDonate';
import {ModalShare} from '../../Modal/ModalShare';
import {useTranslation} from 'react-i18next';
import {TickCircleIcon} from '../../../../assets/icon';
import {
  heightPercentage,
  heightResponsive,
  widthResponsive,
} from '../../../../utils';
import {ModalConfirm} from '../../Modal/ModalConfirm';
import {BottomSheetGuest} from '../../GuestComponent/BottomSheetGuest';

interface PopularPostProps {
  uuidMusician: string;
  coverImage: string;
  title: string;
  description: string;
}

const PopularPost: FC<PopularPostProps> = (props: PopularPostProps) => {
  const {coverImage, title, description, uuidMusician} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const MyUuid = profileStorage()?.uuid;
  const isLogin = storage.getString('profile');
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

  const {getCreditCount} = useCreditHook();

  const [recorder, setRecorder] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>();
  const [modalDonate, setModalDonate] = useState<boolean>(false);
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [selectedIdPost, setSelectedIdPost] = useState<string>();
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [idNowPlaying, setIdNowPlaing] = useState<string>();
  const [trigger2ndModal, setTrigger2ndModal] = useState<boolean>(false);
  const [modalSuccessDonate, setModalSuccessDonate] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [modalGuestVisible, setModalGuestVisible] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [selectedMenuPost, setSelectedMenuPost] = useState<DataDropDownType>();
  const [selectedUserUuid, setSelectedUserUuid] = useState<string>();

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
    if (modalDonate) getCreditCount();
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

  const handleMaybeLater = () => {
    setModalConfirm(false);
  };

  const handleConfirmModal = () => {
    setModalConfirm(false);
    navigation.navigate('ExclusiveContent', {data: props});
  };

  const handleNotLogin = () => {
    setModalGuestVisible(true);
  };

  const handleOnBlur = () => {
    setModalConfirm(true);
  };

  // ! REPORT POST AREA
  useEffect(() => {
    if (selectedIdPost && selectedMenuPost && selectedUserUuid) {
      const selectedValue = t(selectedMenuPost.value);

      if (selectedValue) console.log('REPORT', selectedIdPost);
      setSelectedMenuPost(undefined);
    }
  }, [selectedIdPost, selectedMenuPost, selectedUserUuid]);
  // ! END OF REPORT POST AREA

  const item = dataPostList[0];

  return (
    <View>
      <Text style={styles.textComp}>Popular Post</Text>

      {dataPostList.length > 0 ? (
        <>
          <Gap height={heightPercentage(16)} />
          <ListCard.PostList
            containerStyles={{paddingHorizontal: 0}}
            toDetailOnPress={() => {}}
            musicianName={item.musician.fullname}
            musicianId={`@${item.musician.username}`}
            imgUri={
              item.musician.imageProfileUrls.length !== 0
                ? item.musician.imageProfileUrls[0]?.image
                : ''
            }
            postDate={item?.timeAgo ? item.timeAgo : dateFormat(item.createdAt)}
            postDate2={item.createdAt}
            category={categoryNormalize(item.category)}
            onPress={() => cardOnPress(item)}
            likeOnPress={() => likeOnPress(item.id, item.isLiked)}
            likePressed={
              selectedId === undefined
                ? item.isLiked
                : selectedId.includes(item.id) && recorder.includes(item.id)
                ? true
                : !selectedId.includes(item.id) && recorder.includes(item.id)
                ? false
                : !selectedId.includes(item.id) && !recorder.includes(item.id)
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
            onProfile
            noNavigate
            children={
              <ChildrenCard
                data={item}
                onPress={
                  !isLogin
                    ? handleNotLogin
                    : item.isPremiumPost &&
                      item.musician.uuid !== MyUuid &&
                      !item.isSubscribe
                    ? handleOnBlur
                    : onPressPlaySong
                }
                isPlay={isPlaying}
                playOrPause={
                  !isLogin
                    ? handleNotLogin
                    : item.isPremiumPost &&
                      item.musician.uuid !== MyUuid &&
                      !item.isSubscribe
                    ? handleOnBlur
                    : handlePausePlay
                }
                pauseModeOn={pauseModeOn}
                currentProgress={playerProgress.position}
                duration={playerProgress.duration}
                seekPlayer={
                  !isLogin
                    ? handleNotLogin
                    : item.isPremiumPost &&
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

          <Gap height={heightPercentage(24)} />
        </>
      ) : (
        <Text style={styles.emptyState}>{t('EmptyState.PopularPost')}</Text>
      )}
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
      <ModalConfirm
        modalVisible={modalConfirm}
        title={'Subscribe to reveal exclusive content'}
        subtitle={
          'You need to subscribe exclusive content to unlock current post'
        }
        onPressClose={handleMaybeLater}
        onPressOk={handleConfirmModal}
      />
      <BottomSheetGuest
        modalVisible={modalGuestVisible}
        onPressClose={() => setModalGuestVisible(false)}
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
  emptyState: {
    color: color.Neutral[10],
    paddingVertical: heightResponsive(60),
    textAlign: 'center',
  },
});
