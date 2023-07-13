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
import {storage} from '../../../hooks/use-storage.hook';
import {useFeedHook} from '../../../hooks/use-feed.hook';
import {usePlayerHook} from '../../../hooks/use-player.hook';
import {DataDropDownType, dropDownAlbumRange} from '../../../data/dropdown';
import {useTranslation} from 'react-i18next';
import {PostList} from '../../../interface/feed.interface';
import {
  DropDownFilter,
  Gap,
  ListCard,
  ModalShare,
  SsuToast,
} from '../../../components';
import {heightPercentage, widthResponsive} from '../../../utils';
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
  const {
    analyticPostLoading,
    analyticPostError,
    analyticPostMessage,
    analyticPostData,
    getAnalyticPopularPost,
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

  const [recorder, setRecorder] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string[]>();
  const [modalShare, setModalShare] = useState<boolean>(false);
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [idNowPlaying, setIdNowPlaing] = useState<string>();
  const [toastVisible, setToastVisible] = useState(false);

  const {t} = useTranslation();

  useEffect(() => {
    getAnalyticPopularPost({
      interval:
        t(selectedRange.label) === 'Monthly'
          ? 'monthly'
          : t(selectedRange.label) === 'Weekly'
          ? 'weekly'
          : t(selectedRange.label) === 'Daily'
          ? 'daily'
          : t(selectedRange.label) === 'All Time'
          ? 'all_time'
          : '',
    });
  }, [uuidMusician]);

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

  const lang = storage.getString('lang');
  const [selectedRange, setSelectedRange] = useState<DataDropDownType>({
    label: 'Home.Tab.Analytic.Album.Filter.Range.Alltime',
    value: '1',
  });

  return (
    //TODO:NAVIGATE TO POST LIST (TOP POST)
    // <TouchableOpacity style={styles.container} onPress={() => {}}>
    //   {analyticPostData && (
    //     <>
    //       <View style={styles.titleStyle}>
    //         <StarPinkIcon />
    //         <Gap width={10} />
    //         <Text style={styles.textComp}>
    //           {t('Home.Tab.Analytic.Post.Popular.Title')}
    //         </Text>
    //       </View>
    //       {/* DROPDOWN AREA */}
    //       <View style={{width: 90, zIndex: 100}}>
    //         <DropDownFilter
    //           labelCaption={t(selectedRange.label)}
    //           dataFilter={dropDownAlbumRange}
    //           selectedMenu={setSelectedRange}
    //           leftPosition={
    //             lang === 'en' ? widthResponsive(-85) : widthResponsive(-85)
    //           }
    //           topPosition={widthResponsive(20)}
    //           containerStyle={styles.dropdownContainer}
    //           textCustomStyle={{color: color.Neutral[10], fontSize: mvs(11)}}
    //           iconColor={color.Neutral[10]}
    //           dropdownStyle={styles.dropdown}
    //         />
    //       </View>
    //       <ListCard.PostListOld
    //         containerStyles={{paddingHorizontal: 0}}
    //         onPress={() => cardOnPress(analyticPostData[0])}
    //         likeOnPress={() =>
    //           likeOnPress(analyticPostData.ID, analyticPostData.IsLiked)
    //         }
    //         likePressed={
    //           selectedId === undefined
    //             ? analyticPostData.IsLiked
    //             : selectedId.includes(analyticPostData.ID) &&
    //               recorder.includes(analyticPostData.ID)
    //             ? true
    //             : !selectedId.includes(analyticPostData.ID) &&
    //               recorder.includes(analyticPostData.ID)
    //             ? false
    //             : !selectedId.includes(analyticPostData.ID) &&
    //               !recorder.includes(analyticPostData.ID)
    //             ? analyticPostData.IsLiked
    //             : analyticPostData.IsLiked
    //         }
    //         likeCount={
    //           selectedId === undefined
    //             ? analyticPostData.likes_count
    //             : selectedId.includes(analyticPostData.ID) &&
    //               recorder.includes(analyticPostData.ID) &&
    //               analyticPostData.IsLiked === true
    //             ? analyticPostData.likes_count
    //             : selectedId.includes(analyticPostData.ID) &&
    //               recorder.includes(analyticPostData.ID) &&
    //               analyticPostData.IsLiked === false
    //             ? analyticPostData.likes_count + 1
    //             : !selectedId.includes(analyticPostData.ID) &&
    //               recorder.includes(analyticPostData.ID) &&
    //               analyticPostData.IsLiked === true
    //             ? analyticPostData.likes_count - 1
    //             : !selectedId.includes(analyticPostData.ID) &&
    //               recorder.includes(analyticPostData.ID) &&
    //               analyticPostData.IsLiked === false
    //             ? analyticPostData.likes_count
    //             : analyticPostData.likes_count
    //         }
    //         shareOnPress={shareOnPress}
    //         commentCount={analyticPostData.comments_count}
    //         children={
    //           <ChildrenCard
    //             data={analyticPostData[0]}
    //             onPress={onPressPlaySong}
    //             isPlay={isPlaying}
    //             playOrPause={handlePausePlay}
    //             pauseModeOn={pauseModeOn}
    //             currentProgress={playerProgress.position}
    //             duration={playerProgress.duration}
    //             seekPlayer={seekPlayer}
    //             isIdNowPlaying={analyticPostData.Id === idNowPlaying}
    //             imgWidth={125}
    //             imgWidth2={290}
    //           />
    //         }
    //       />
    //     </>
    //   )}
    //   <ModalShare
    //     url={
    //       'https://open.ssu.io/track/19AiJfAtRiccvSU1EWcttT?si=36b9a686dad44ae0'
    //     }
    //     modalVisible={modalShare}
    //     onPressClose={() => setModalShare(false)}
    //     titleModal={t('General.Share.Feed')}
    //     hideMusic
    //     onPressCopy={() =>
    //       InteractionManager.runAfterInteractions(() => setToastVisible(true))
    //     }
    //   />
    //   <SsuToast
    //     modalVisible={toastVisible}
    //     onBackPressed={() => setToastVisible(false)}
    //     children={
    //       <View style={[styles.modalContainer]}>
    //         <TickCircleIcon
    //           width={widthResponsive(21)}
    //           height={heightPercentage(20)}
    //           stroke={color.Neutral[10]}
    //         />
    //         <Gap width={widthResponsive(7)} />
    //         <Text style={[typography.Button2, styles.textStyle]}>
    //           {t('General.LinkCopied')}
    //         </Text>
    //       </View>
    //     }
    //     modalStyle={{marginHorizontal: widthResponsive(24)}}
    //   />
    // </TouchableOpacity>
    <View></View>
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
