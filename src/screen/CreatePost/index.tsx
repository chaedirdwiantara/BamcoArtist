import {
  Dimensions,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {color, font} from '../../theme';
import {
  Button,
  ButtonGradient,
  ButtonGradientwithIcon,
  Gap,
  ModalConfirm,
  ModalImagePicker,
  SsuInput,
  TopNavigation,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigations';
import {heightResponsive, widthResponsive} from '../../utils';
import {ms, mvs} from 'react-native-size-matters';
import {ImportMusicIcon, ImportPhotoIcon} from '../../assets/icon';
import {
  DataDropDownType,
  dropdownCategoryMusician,
  dropDownSetAudience,
} from '../../data/dropdown';
import FilterModal from '../../components/molecule/V2/DropdownFilter/modalFilter';
import ImageList from './showImage';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {useUploadImageHook} from '../../hooks/use-uploadImage.hook';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {Image, Video} from 'react-native-image-crop-picker';
import MusicPreview from '../../components/molecule/MusicPreview/MusicPreview';
import {ListDataSearchSongs, Transcode} from '../../interface/search.interface';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {dummySongImg} from '../../data/image';
import {SongList, TranscodedSongType} from '../../interface/song.interface';
import {useTranslation} from 'react-i18next';
import VideoComp from '../../components/molecule/VideoPlayer/videoComp';
import {useDataVideoForPost, useVideoStore} from '../../store/video.store';
import {convertCategoryValue} from './UtilsPost/utils';

type PostDetailProps = NativeStackScreenProps<RootStackParams, 'CreatePost'>;

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;
export const {width} = Dimensions.get('screen');

const CreatePost: FC<PostDetailProps> = ({route}: PostDetailProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const dataSongNavigation = route.params?.songData;
  const dataUpdatePostProps = route.params?.postData;
  const dataAudienceChoosen = route.params?.audience;

  const [inputText, setInputText] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState({
    modalFilter: false,
    modalImagePicker: false,
    modalSetAudience: false,
  });

  const {
    dataCreatePost,
    createPostLoading,
    dataUpdatePost,
    setCreatePost,
    setUpdatePost,
  } = useFeedHook();
  const {isLoadingImage, dataImage, dataVideo, setUploadImage} =
    useUploadImageHook();
  const {
    isPlaying,
    seekPlayer,
    setPauseSong,
    setPlaySong,
    playerProgress,
    addPlaylist,
  } = usePlayerHook();

  const [label, setLabel] = useState<string>();
  const [valueFilter, setValueFilter] = useState<string>();
  const [dataAudience, setDataAudience] = useState<string>('');
  const [dataResponseImg, setDataResponseImg] = useState<string[]>([]);
  const [musicData, setMusicData] = useState<ListDataSearchSongs>();
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [updateOn, setUpdateOn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [allowToBack, setAllowToBack] = useState<boolean>(false);

  // * Hooks for uploading
  const [uri, setUri] = useState<Image[]>([]);
  const [active, setActive] = useState<boolean>(false);

  // * video hooks
  const [keyBrdIsActive, setKeybrdIsActive] = useState<boolean>(false);

  const {uriVideo, setUriVideo, setAllowToUpload} = useVideoStore();
  const {setStoredInputText, setStoredValueFilter, setStoredDataAudience} =
    useDataVideoForPost();

  useEffect(() => {
    if (dataAudienceChoosen) {
      setDataAudience(dataAudienceChoosen);
    }
  }, [dataAudienceChoosen]);

  useEffect(() => {
    if (!label) {
      setLabel('Home.Tab.TopPost.Category.Highlight');
    }
  }, [label]);

  // ! UPLOAD VIDEO AREA

  //! set data video to global state
  const sendVideoUri = (val: Video) => {
    setUriVideo(val);
  };

  //! save data for upload video to global state
  useEffect(() => {
    if (uriVideo && inputText) {
      setStoredInputText(inputText);
      setStoredValueFilter(valueFilter ? valueFilter : 'highlight');
      setStoredDataAudience(dataAudience);
      setAllowToBack(true);
    }
  }, [uriVideo, inputText]);

  // ! END OF UPLOAD VIDEO AREA

  // ! EDIT POST AREA

  useEffect(() => {
    if (dataUpdatePostProps !== undefined && !updateOn) {
      setUpdateOn(true);
      setUserId(dataUpdatePostProps.id);
      setLabel(dataUpdatePostProps.category);
      setValueFilter(dataUpdatePostProps.category);
      setInputText(dataUpdatePostProps.caption);
      setDataAudience(
        (dataUpdatePostProps.isPremiumPost
          ? t('Feed.Exclusive')
          : t('Feed.Public')) || '',
      );
      if (dataUpdatePostProps.images.length !== 0) {
        let dataForSet = [];
        for (let i = 0; i < dataUpdatePostProps.images.length; i++) {
          dataForSet.push({
            path: dataUpdatePostProps.images[i][3]?.image,
            sourceURL: dataUpdatePostProps.images[i][3]?.image,
            mime: 'image/jpeg',
          });
        }
        //@ts-ignore
        setUri(dataForSet);
      }
      if (dataUpdatePostProps.quoteToPost.encodeHlsUrl !== null) {
        let transcode: Transcode = {
          trackId: dataUpdatePostProps.quoteToPost.targetId,
          songId: Number(dataUpdatePostProps.quoteToPost.targetId),
          sessionId: dataUpdatePostProps.quoteToPost.targetId,
          encodedDashUrl: dataUpdatePostProps.quoteToPost.encodeDashUrl,
          encodedHlsUrl: dataUpdatePostProps.quoteToPost.encodeHlsUrl,
          quality: 1,
          bitrate: '320k',
          presetName: 'high',
          encodeStatus: 'FINISHED',
        };
        let dataMusicProps: ListDataSearchSongs = {
          id: Number(dataUpdatePostProps.quoteToPost.targetId),
          musicianUUID: dataUpdatePostProps.musician.uuid,
          musicianName: dataUpdatePostProps.musician.fullname,
          title: dataUpdatePostProps.quoteToPost.title,
          imageUrl: dataUpdatePostProps.quoteToPost.coverImage,
          lyrics:
            dataUpdatePostProps.quoteToPost.lyrics !== undefined
              ? dataUpdatePostProps.quoteToPost.lyrics
              : '',
          originalSongUrl: dataUpdatePostProps.quoteToPost.originalSongUrl
            ? dataUpdatePostProps.quoteToPost.originalSongUrl
            : '',
          songDuration: 60,
          transcodedSongUrl: [transcode, transcode],
        };
        setMusicData(dataMusicProps);
      }
      //* step to edit/update video
      if (dataUpdatePostProps.video.encodeHlsUrl.length > 0) {
        setUriVideo(dataUpdatePostProps.video);
      }
    }
  }, [dataUpdatePostProps, updateOn]);

  useEffect(() => {
    if (dataUpdatePost) {
      setUpdateOn(false);
      navigation.goBack();
    }
  }, [dataUpdatePost]);
  // ! END OF EDIT POST AREA

  // ! UPLOAD PHOTO STEPS
  // * 1. set to hook state picked images
  const sendUri = (val: Image[]) => {
    uri.length + val.length <= 4 ? setUri([...uri, ...val]) : null;
  };

  const sendSingleUri = (val: Image) => {
    uri.length + 1 <= 4 ? setUri([...uri, val]) : null;
  };

  //  * 2. trigger hook state to active when Post Button pressed
  const handlePostOnPress = () => {
    if (uriVideo && allowToBack && updateOn === false) {
      setAllowToUpload(true);
      navigation.goBack();
      setAllowToBack(false);
    } else {
      setActive(true);
    }
  };

  //  * 3. trigger hook to hit upload image api
  useEffect(() => {
    if (
      active == true &&
      uri.length == 0 &&
      musicData == undefined &&
      dataUpdatePostProps === undefined &&
      dataVideo === undefined
    ) {
      setCreatePost({
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
      });
    }

    // ? for UPDATE POST text only
    if (
      active == true &&
      uri.length == 0 &&
      musicData == undefined &&
      dataUpdatePostProps !== undefined &&
      !uriVideo
    ) {
      setUpdatePost({
        id: dataUpdatePostProps.id,
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
      });
    }

    if (active == true && uri.length !== 0 && uri[0]?.mime !== 'video/mp4') {
      for (let i = 0; i < uri.length; i++) {
        setUploadImage(uri[i], 'medium');
      }
    }

    if (
      active == true &&
      uri.length == 0 &&
      musicData !== undefined &&
      updateOn === false &&
      dataVideo === undefined
    ) {
      setCreatePost({
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
        quoteToPost:
          musicData !== undefined && musicData?.transcodedSongUrl !== undefined
            ? {
                targetId: musicData.id?.toString(),
                targetType: 'song',
                title: musicData.title,
                musician: musicData.musicianName,
                coverImage:
                  musicData.imageUrl.length !== 0
                    ? musicData.imageUrl[1].image
                    : dummySongImg,
                encodeDashUrl: musicData.transcodedSongUrl[0].encodedDashUrl,
                encodeHlsUrl: musicData.transcodedSongUrl[0].encodedHlsUrl,
                startAt: '00:00',
                endAt: musicData.songDuration.toString(),
              }
            : undefined,
      });
    }

    // ? for EDIT UPLOAD MUSIC only
    if (
      active == true &&
      uri.length == 0 &&
      musicData !== undefined &&
      updateOn === true &&
      !uriVideo
    ) {
      setUpdatePost({
        id: userId,
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
        quoteToPost:
          musicData !== undefined && musicData?.transcodedSongUrl !== undefined
            ? {
                targetId: musicData.id?.toString(),
                targetType: 'song',
                title: musicData.title,
                musician: musicData.musicianName,
                coverImage:
                  musicData.imageUrl.length !== 0
                    ? musicData.imageUrl[1].image
                    : dummySongImg,
                encodeDashUrl: musicData.transcodedSongUrl[0].encodedDashUrl,
                encodeHlsUrl: musicData.transcodedSongUrl[0].encodedHlsUrl,
              }
            : undefined,
      });
    }

    // ? for EDIT UPLOAD VIDEO only
    if (active == true && updateOn && uriVideo) {
      const video = {
        targetType: 'video',
        coverImage: uriVideo.sourceURL ?? '',
        encodeDashUrl: uriVideo.localIdentifier ?? '',
        encodeHlsUrl: uriVideo.path,
        duration: uriVideo.duration ?? 0,
      };

      setUpdatePost({
        id: userId,
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === 'Feed.Exclusive',
        video,
      });
    }
  }, [active, uri, musicData, updateOn, uriVideo]);

  // * 4. set to hook state when response upload image has received
  useEffect(() => {
    dataImage?.data !== undefined && !dataResponseImg.includes(dataImage.data)
      ? setDataResponseImg([...dataResponseImg, dataImage?.data])
      : null;
  }, [dataImage]);

  // * 5. hook to hit create post api when all data uploaded has beed received
  useEffect(() => {
    active &&
    uri.length !== 0 &&
    dataResponseImg.length === uri.length &&
    dataUpdatePostProps === undefined &&
    dataVideo === undefined
      ? (setCreatePost({
          caption: inputText,
          category: valueFilter ? valueFilter : 'highlight',
          image: dataResponseImg,
          isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
        }),
        setActive(false))
      : null;
  }, [dataResponseImg, uri, active]);

  // ? update api for UPDATE POST only
  useEffect(() => {
    active &&
    uri.length !== 0 &&
    dataResponseImg.length === uri.length &&
    dataUpdatePostProps !== undefined
      ? (setUpdatePost({
          id: dataUpdatePostProps.id,
          caption: inputText,
          category: valueFilter ? valueFilter : 'highlight',
          image: dataResponseImg,
          isPremium: dataAudience === 'Feed.Exclusive' ? true : false,
        }),
        setActive(false))
      : null;
  }, [dataResponseImg, uri, active]);

  // * 6. go back after successful create post
  useEffect(() => {
    if (dataCreatePost !== null) {
      navigation.goBack();
    }
  }, [dataCreatePost]);
  // ! END OF UPLOAD PHOTO STEPS

  // ! UPLOAD MUSIC STEPS
  //  * 3. trigger hook to hit upload image api
  useEffect(() => {
    if (dataSongNavigation !== undefined) {
      setMusicData(dataSongNavigation);
      setPauseModeOn(false);
    }
  }, [dataSongNavigation]);

  const onPressPlaySong = () => {
    const dataMusic = [dataSongNavigation];
    const transcode: TranscodedSongType = {
      id: dataMusic[0]?.transcodedSongUrl
        ? dataMusic[0].transcodedSongUrl[1].songId
        : 1,
      songId: dataMusic[0]?.transcodedSongUrl
        ? dataMusic[0].transcodedSongUrl[1].songId
        : 1,
      encodedDashUrl: dataMusic[0]?.transcodedSongUrl
        ? dataMusic[0].transcodedSongUrl[1].encodedDashUrl
        : '',
      encodedHlsUrl: dataMusic[0]?.transcodedSongUrl
        ? dataMusic[0].transcodedSongUrl[1].encodedHlsUrl
        : '',
      quality: dataMusic[0]?.transcodedSongUrl
        ? dataMusic[0].transcodedSongUrl[1].quality
        : 1,
      presetName: dataMusic[0]?.transcodedSongUrl
        ? dataMusic[0].transcodedSongUrl[1].presetName
        : 'low',
      encodeStatus: dataMusic[0]?.transcodedSongUrl
        ? dataMusic[0].transcodedSongUrl[1].encodeStatus
        : 'ON_PROCESS',
    };

    const addMusic: SongList = {
      isAddedToThisPlaylist: true,
      played: true,
      id: dataMusic[0] ? dataMusic[0].id : 1,
      title: dataMusic[0] ? dataMusic[0].title : '',
      musicianId: dataMusic[0] ? dataMusic[0].musicianUUID : '',
      musicianName: dataMusic[0] ? dataMusic[0].musicianName : '',
      imageUrl: dataMusic[0]?.imageUrl ?? [],
      songDuration:
        dataMusic[0] && dataMusic[0].songDuration !== null
          ? dataMusic[0].songDuration
          : 60,
      lyrics: dataMusic[0] ? dataMusic[0].lyrics : '',
      transcodedSongUrl: [transcode, transcode],
      originalSongUrl: dataMusic[0] ? dataMusic[0].originalSongUrl : '',
      isLiked:
        dataMusic[0]?.isLiked !== undefined ? dataMusic[0].isLiked : false,
      album: {id: -1},
      musician: {name: dataMusic[0] ? dataMusic[0].musicianName : ''},
    };

    addPlaylist({
      dataSong: [addMusic],
      playSongId: dataSongNavigation?.id,
      isPlay: true,
    });
    setPlaySong();
    setPauseModeOn(true);
  };

  const handlePausePlay = () => {
    if (isPlaying) {
      setPauseSong();
    } else {
      setPlaySong();
    }
  };

  const handleClosedPlayer = () => {
    setPauseModeOn(false);
    setMusicData(undefined);
    if (isPlaying) {
      setPauseSong();
    }
  };
  // ! END OF UPLOAD MUSIC STEPS

  const resultDataAudience = (dataAudience: DataDropDownType) => {
    setDataAudience(dataAudience.label);
  };

  const resetImage = () => {
    setUri([]);
    closeModal();
  };

  const closeModal = () => {
    setModalVisible({
      modalFilter: false,
      modalImagePicker: false,
      modalSetAudience: false,
    });
  };

  const closeImage = (id: number) => {
    setUri(uri.filter((x: Image) => x.path !== uri[id].path));
  };

  const closeVideo = (id: number) => {
    setUriVideo(null);
  };

  const handleOkConfirm = () => {
    setModalConfirm(false);
  };

  // ? OFFSET AREA
  const [offset, setOffset] = React.useState<{
    px: number;
    py: number;
    width: number;
  }>();
  const [offsetAudience, setOffsetAudience] = React.useState<{
    px: number;
    py: number;
  }>();
  const [allowOffset, setAllowOffset] = React.useState<boolean>(true);

  //* Prevent ref to set offset non stop
  useEffect(() => {
    if (offset !== undefined) {
      setAllowOffset(false);
    }
  }, [offset]);
  // ? END OF OFFSET AREA

  const setOnHide = () => {
    if (uriVideo?.duration && uriVideo.duration > 15000) {
      setModalConfirm(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <TopNavigation.Type1
          title={
            dataAudience === 'Feed.Exclusive'
              ? t('Post.Create.ExclusiveTitle')
              : t('Post.Create.PublicTitle')
          }
          maxLengthTitle={20}
          itemStrokeColor={'white'}
          leftIconAction={navigation.goBack}
        />
        <View style={styles.mainContainer}>
          {/* //! TOP AREA */}
          <View style={styles.topBody}>
            <View style={{}}>
              <SsuInput.InputText
                onFocus={() => setKeybrdIsActive(true)}
                value={inputText}
                onChangeText={(newText: string) => setInputText(newText)}
                placeholder={`${t('Post.Create.Write')}...`}
                containerStyles={{
                  backgroundColor: 'transparent',
                  paddingHorizontal: 0,
                }}
                multiline={true}
                maxLength={400}
              />
              {uri[0]?.mime !== 'video/mp4' && (
                <ImageList
                  imgData={uri}
                  disabled={true}
                  width={162}
                  height={79}
                  onPress={closeImage}
                />
              )}
              {musicData !== undefined &&
              musicData.transcodedSongUrl !== undefined ? (
                <MusicPreview
                  targetId={musicData.id.toString()}
                  title={musicData.title}
                  musician={musicData.musicianName}
                  coverImage={
                    musicData.imageUrl.length !== 0
                      ? musicData.imageUrl[0].image
                      : dummySongImg
                  }
                  encodeDashUrl={musicData.transcodedSongUrl[0].encodedDashUrl}
                  encodeHlsUrl={musicData.transcodedSongUrl[0].encodedHlsUrl}
                  startAt={'0:00'}
                  onPress={onPressPlaySong}
                  closeOnPress={handleClosedPlayer}
                  isPlay={isPlaying}
                  playOrPause={handlePausePlay}
                  pauseModeOn={pauseModeOn}
                  currentProgress={playerProgress.position}
                  duration={playerProgress.duration}
                  seekPlayer={seekPlayer}
                />
              ) : null}
            </View>

            {/* // ! VIDEO AREA */}
            {uriVideo?.duration && uriVideo?.duration < 15000 && (
              <VideoComp
                sourceUri={uriVideo.path}
                withCloseIcon
                onPress={closeVideo}
                dontShowText={false}
              />
            )}
          </View>
          {/* //! END OF TOP AREA */}

          {/* //! BOTTOM AREA */}
          <View style={styles.footerBody}>
            <Text
              style={[
                styles.footerText,
                {
                  marginLeft: widthResponsive(24),
                  marginBottom: widthResponsive(12),
                  color:
                    inputText.length === 400
                      ? color.Error[400]
                      : color.Neutral[10],
                },
              ]}>
              {inputText.length}/400
            </Text>
            <View style={styles.iconsAndCategory}>
              <View style={styles.iconsContainer}>
                {!musicData && (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        setModalVisible({
                          modalFilter: false,
                          modalImagePicker: true,
                          modalSetAudience: false,
                        })
                      }>
                      <ImportPhotoIcon />
                    </TouchableOpacity>
                    <Gap width={16} />
                  </>
                )}
                {uri.length == 0 && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('QuoteMusic')}>
                    <ImportMusicIcon />
                  </TouchableOpacity>
                )}
              </View>

              <View
                onLayout={event => {
                  event.target.measure((x, y, width, height, pageX, pageY) => {
                    setOffset({
                      px: pageX,
                      py: Platform.OS === 'android' ? pageY - barHeight : pageY,
                      width: width,
                    });
                  });
                }}
                style={{opacity: 1}}>
                <ButtonGradientwithIcon
                  label={
                    label
                      ? t(convertCategoryValue(label))
                      : t('Post.Create.Category')
                  }
                  onPress={() =>
                    setModalVisible({
                      modalFilter: true,
                      modalImagePicker: false,
                      modalSetAudience: false,
                    })
                  }
                  containerStyles={{
                    width: widthResponsive(140),
                    alignItems: 'flex-start',
                  }}
                  gradientStyles={{
                    width: '100%',
                  }}
                  textIconContainer={{
                    paddingVertical: ms(6),
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                  textStyles={{
                    fontFamily: font.InterRegular,
                    fontWeight: '500',
                    fontSize: ms(12),
                  }}
                />
              </View>
            </View>
            <View style={styles.textCounter}>
              {inputText.length > 0 ? (
                <ButtonGradient
                  label={t('Post.Title')}
                  containerStyles={{
                    width: '100%',
                    height: heightResponsive(36),
                    aspectRatio: undefined,
                  }}
                  gradientStyles={{
                    width: '100%',
                    height: '100%',
                    aspectRatio: undefined,
                  }}
                  textStyles={{}}
                  onPress={handlePostOnPress}
                />
              ) : (
                <Button
                  label={t('Post.Title')}
                  containerStyles={{
                    width: '100%',
                    height: heightResponsive(36),
                    aspectRatio: undefined,
                    backgroundColor: color.Dark[50],
                  }}
                  textStyles={{}}
                  // onPress={handlePostOnPress}
                  disabled
                />
              )}
            </View>
          </View>
          {/* //! END OF BOTTOM AREA */}
        </View>

        {/* //! MODAL AREA */}
        {offset !== undefined && (
          <FilterModal
            toggleModal={() =>
              setModalVisible({
                modalFilter: !isModalVisible.modalFilter,
                modalImagePicker: false,
                modalSetAudience: false,
              })
            }
            modalVisible={isModalVisible.modalFilter}
            dataFilter={dropdownCategoryMusician}
            filterOnPress={setLabel}
            sendCategory={setValueFilter}
            translation={true}
            xPosition={offset?.px}
            yPosition={offset?.py - widthResponsive(202)}
            textStyle={{fontSize: ms(12)}}
            containerStyle={{width: offset?.width}}
          />
        )}
        {offsetAudience !== undefined && (
          <FilterModal
            toggleModal={() =>
              setModalVisible({
                modalFilter: false,
                modalImagePicker: false,
                modalSetAudience: false,
              })
            }
            modalVisible={isModalVisible.modalSetAudience}
            dataFilter={dropDownSetAudience}
            filterOnPress={setDataAudience}
            sendCategory={() => {}}
            translation={true}
            xPosition={offsetAudience?.px}
            yPosition={offsetAudience?.py}
            containerStyle={{
              top: offsetAudience?.py + -96,
              left: offsetAudience?.px,
              width: widthResponsive(102),
            }}
            textStyle={{fontSize: mvs(12)}}
          />
        )}
        <ModalImagePicker
          title={t('Post.Create.Media') || ''}
          modalVisible={isModalVisible.modalImagePicker}
          sendUri={sendSingleUri}
          sendUriVideo={sendVideoUri}
          sendUriMultiple={sendUri}
          onDeleteImage={resetImage}
          onPressClose={closeModal}
          multiple
          showVideo
          onModalHide={setOnHide}
        />
        <ModalLoading visible={isLoadingImage} />
        <ModalLoading visible={createPostLoading} />
        {/* //! END OF MODAL AREA */}
      </View>
      <ModalConfirm
        modalVisible={modalConfirm}
        title={'Upload Video'}
        subtitle={
          'Oops! Your video is more than 15 sec. To make sure your upload goes through, try cutting it down and then uploading again.'
        }
        yesText={'Ok, Got It'}
        onPressOk={handleOkConfirm}
        oneButton
      />
    </KeyboardAvoidingView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.Dark[800],
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBody: {
    paddingHorizontal: widthResponsive(24),
  },
  footerBody: {
    paddingBottom: widthResponsive(16),
  },
  userCategory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(13),
  },
  textCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthResponsive(24),
  },
  iconsAndCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: ms(1),
    borderBottomWidth: 1,
    borderColor: color.Dark[500],
    paddingHorizontal: widthResponsive(24),
    paddingVertical: widthResponsive(8),
    marginBottom: heightResponsive(12),
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: widthResponsive(100),
  },
  placeHolderStyle: {
    color: color.Neutral[10],
    fontFamily: font.InterMedium,
    fontWeight: '500',
    fontSize: mvs(12),
  },
  videoStyle: {
    width: '100%',
    height: width - widthResponsive(48),
  },
});
