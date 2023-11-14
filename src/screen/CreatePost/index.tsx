import {
  Dimensions,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Image, Video} from 'react-native-image-crop-picker';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Button,
  ButtonGradient,
  ButtonGradientwithIcon,
  Gap,
  ModalConfirm,
  ModalImagePicker,
  SsuInput,
  StepCopilot,
  SuccessToast,
  TopNavigation,
} from '../../components';
import {
  DataDropDownType,
  dataDurationVote,
  dropdownCategoryMusician,
  dropDownSetAudience,
} from '../../data/dropdown';
import ImageList from './showImage';
import VoteComponent from './VotePost';
import {color, font} from '../../theme';
import {useTranslation} from 'react-i18next';
import {dummySongImg} from '../../data/image';
import {RootStackParams} from '../../navigations';
import {ms, mvs} from 'react-native-size-matters';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {setImagePost} from './UtilsPost/setImagePost';
import {usePlayerStore} from '../../store/player.store';
import {editPostUtils} from './UtilsPost/editPostUtils';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {dataVoteProps} from '../../interface/vote.interface';
import {heightResponsive, widthResponsive} from '../../utils';
import {useTriggerUploadImage} from './UtilsPost/uploadImageUtils';
import {useUploadImageHook} from '../../hooks/use-uploadImage.hook';
import {ListDataSearchSongs} from '../../interface/search.interface';
import VideoComp from '../../components/molecule/VideoPlayer/videoComp';
import {useDataVideoForPost, useVideoStore} from '../../store/video.store';
import {convertCategoryValue, createAddMusicObject} from './UtilsPost/utils';
import MusicPreview from '../../components/molecule/MusicPreview/MusicPreview';
import {AddVoteIcon, ImportMusicIcon, ImportPhotoIcon} from '../../assets/icon';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import FilterModal from '../../components/molecule/V2/DropdownFilter/modalFilter';
import {CopilotProvider, useCopilot} from 'react-native-copilot';
import {useCoachmarkHook} from '../../hooks/use-coachmark.hook';
import {useCopilotStore} from '../../store/copilot.store';
import {StepNumber, Tooltip} from '../../components/molecule/TooltipGuideline';
import {useCreatePostStatus} from '../../store/postState.store';

type PostDetailProps = NativeStackScreenProps<RootStackParams, 'CreatePost'>;

const {StatusBarManager} = NativeModules;
const barHeight = StatusBarManager.HEIGHT;
export const {width} = Dimensions.get('screen');
const vooteInitialChoices: dataVoteProps[] = [
  {id: '1', text: ''},
  {id: '2', text: ''},
];

const CreatePostCopilot: FC<PostDetailProps> = ({route}: PostDetailProps) => {
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

  const {setWithoutBottomTab, show} = usePlayerStore();
  const {postSuccess, setPostSuccess} = useCreatePostStatus();

  const [label, setLabel] = useState<string>();
  const [userId, setUserId] = useState<string>('');
  const [valueFilter, setValueFilter] = useState<string>();
  const [updateOn, setUpdateOn] = useState<boolean>(false);
  const [dataAudience, setDataAudience] = useState<string>('');
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [allowToBack, setAllowToBack] = useState<boolean>(false);
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [musicData, setMusicData] = useState<ListDataSearchSongs>();
  const [dataResponseImg, setDataResponseImg] = useState<string[]>([]);
  const [showIcon, setShowIcon] = useState<
    'All' | 'ImageVideo' | 'Music' | 'Vote'
  >('All');
  const [dataVote, setDataVote] =
    useState<dataVoteProps[]>(vooteInitialChoices);
  const [pollDuration, setPollDuration] = useState<DataDropDownType>(
    dataDurationVote[0],
  );
  const [voteCompleted, setVoteCompleted] = useState<boolean>(true);

  // * Hooks for uploading
  const [uri, setUri] = useState<Image[]>([]);
  const [active, setActive] = useState<boolean>(false);

  // * video hooks
  const [keyBrdIsActive, setKeybrdIsActive] = useState<boolean>(false);
  const [videoTemporary, setVideoTemporary] = useState<Video>();
  const [updateToUpload, setUpdateToUpload] = useState<boolean>(false);
  const [showCoachmark, setShowCoachmark] = useState<boolean>(true);

  const {
    uriVideo,
    allowToUpdate,
    setUriVideo,
    setAllowToUpload,
    setAllowToUpdate,
  } = useVideoStore();
  const {
    setStoredInputText,
    setStoredValueFilter,
    setStoredDataAudience,
    setStoredIdForUpdate,
  } = useDataVideoForPost();

  useFocusEffect(
    useCallback(() => {
      if (show) {
        setWithoutBottomTab(true);
      }
    }, [show]),
  );

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

  //? Make sure the edit video has new video, if yes then we need to upload the video first
  useEffect(() => {
    if (uriVideo && updateOn) {
      if (!videoTemporary) {
        setVideoTemporary(uriVideo);
      } else if (videoTemporary && videoTemporary !== uriVideo) {
        setUpdateToUpload(true);
      }
    }
  }, [uriVideo, updateOn]);

  // ! EDIT POST AREA
  editPostUtils(
    dataUpdatePostProps,
    updateOn,
    setUpdateOn,
    setUserId,
    setLabel,
    setValueFilter,
    setInputText,
    setDataAudience,
    setMusicData,
    setUriVideo,
    setUri,
    t,
  );

  useEffect(() => {
    if (dataUpdatePost) {
      setUpdateOn(false);
      show && setWithoutBottomTab(false);
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
      show && setWithoutBottomTab(false);
      navigation.goBack();
      setAllowToBack(false);
    } else {
      setActive(true);
    }
  };

  //  * 3. trigger hook to hit upload image api
  useTriggerUploadImage(
    active,
    showIcon,
    uri,
    musicData,
    updateOn,
    uriVideo,
    updateToUpload,
    dataUpdatePostProps,
    inputText,
    valueFilter,
    dataAudience,
    userId,
    show,
    dataVote,
    pollDuration,
    setCreatePost,
    setUpdatePost,
    setUploadImage,
    setStoredIdForUpdate,
    setStoredInputText,
    setStoredValueFilter,
    setStoredDataAudience,
    setAllowToUpdate,
    setWithoutBottomTab,
    navigation,
  );

  // * 4. set to hook state when response upload image has received
  useEffect(() => {
    dataImage?.data !== undefined && !dataResponseImg.includes(dataImage.data)
      ? setDataResponseImg([...dataResponseImg, dataImage?.data])
      : null;
  }, [dataImage]);

  // * 5. hook to hit create post api when all data uploaded has beed received
  setImagePost(
    active,
    uri,
    dataResponseImg,
    dataUpdatePostProps,
    dataVideo,
    inputText,
    valueFilter,
    dataAudience,
    setCreatePost,
    setUpdatePost,
    setActive,
  );

  // * 6. go back after successful create post
  useEffect(() => {
    if (dataCreatePost !== null) {
      show && setWithoutBottomTab(false);
      setPostSuccess(true);
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
    const addMusicObject = createAddMusicObject(dataMusic);

    addPlaylist({
      dataSong: [addMusicObject],
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

  const handleBackAction = () => {
    show && setWithoutBottomTab(false);
    navigation.goBack();
  };

  //* Icon Order
  useEffect(() => {
    if (uri.length !== 0 || uriVideo !== null) {
      setShowIcon('ImageVideo');
    } else if (musicData) {
      setShowIcon('Music');
    } else {
      setShowIcon('All');
    }
  }, [uri, uriVideo, musicData]);

  const voteIconOnPress = () => {
    setShowIcon('Vote');
    setVoteCompleted(false);
  };

  const cancelVoteOnPress = () => {
    setShowIcon('All');
    setVoteCompleted(true);
  };

  // COACHMARK START
  const {start} = useCopilot();
  const {useCoachmark} = useCoachmarkHook();
  const {data: dataCoachmark} = useCoachmark();
  const {setTutorialId} = useCopilotStore();

  useEffect(() => {
    // Check status coachmark first post
    // tutorial id feed = 7, check postman
    const hideCoachmark =
      dataCoachmark?.data &&
      dataCoachmark?.data.filter(
        (val: {TutorialID: number}) => val.TutorialID === 7,
      )[0]?.IsFinished;

    const timeout = setTimeout(() => {
      if (!hideCoachmark && showCoachmark) {
        start(t('Coachmark.TypeContent') || '', null);
        setTutorialId(7);
        setShowCoachmark(false);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [start, dataCoachmark]);

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
          leftIconAction={handleBackAction}
          rightIconAction={() => {}}
        />
        <View style={styles.mainContainer}>
          {/* //! TOP AREA */}
          <StepCopilot
            children={
              <ScrollView style={styles.topBody}>
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
                    autoFocus
                  />
                  {uri[0]?.mime !== 'video/mp4' && (
                    <ImageList
                      imgData={uri}
                      disabled={true}
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
                      encodeDashUrl={
                        musicData.transcodedSongUrl[0].encodedDashUrl
                      }
                      encodeHlsUrl={
                        musicData.transcodedSongUrl[0].encodedHlsUrl
                      }
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
                  {showIcon === 'Vote' && (
                    <VoteComponent
                      dataVote={dataVote}
                      setDataVote={setDataVote}
                      setVoteCompleted={setVoteCompleted}
                      pollDuration={pollDuration}
                      setPollDuration={setPollDuration}
                    />
                  )}
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
              </ScrollView>
            }
            order={31}
            name={t('Coachmark.TypeContent')}
            text={t('Coachmark.SubtitleTypeContent')}
          />
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
                {showIcon === 'All' || showIcon === 'ImageVideo' ? (
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
                ) : null}
                {showIcon === 'All' || showIcon === 'Music' ? (
                  <>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('QuoteMusic')}>
                      <ImportMusicIcon />
                    </TouchableOpacity>
                    <Gap width={16} />
                  </>
                ) : null}
                {showIcon === 'All' && (
                  <TouchableOpacity onPress={voteIconOnPress}>
                    <AddVoteIcon />
                  </TouchableOpacity>
                )}
                {showIcon === 'Vote' && (
                  <TouchableOpacity onPress={cancelVoteOnPress}>
                    <Text style={styles.cancelVote}>Cancel</Text>
                  </TouchableOpacity>
                )}
              </View>

              <StepCopilot
                children={
                  <View
                    onLayout={event => {
                      event.target.measure(
                        (x, y, width, height, pageX, pageY) => {
                          setOffset({
                            px: pageX,
                            py:
                              Platform.OS === 'android'
                                ? pageY - barHeight
                                : pageY,
                            width: width,
                          });
                        },
                      );
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
                }
                order={32}
                name={t('Coachmark.Category')}
                text={t('Coachmark.SubtitleCategory')}
              />
            </View>
            <View style={styles.textCounter}>
              {inputText.length > 0 && voteCompleted ? (
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

const CreatePost: FC<PostDetailProps> = ({
  route,
  navigation,
}: PostDetailProps) => {
  return (
    <CopilotProvider
      stepNumberComponent={StepNumber}
      tooltipComponent={Tooltip}
      tooltipStyle={{
        backgroundColor: color.DarkBlue[100],
      }}
      arrowColor={color.DarkBlue[100]}>
      <CreatePostCopilot route={route} navigation={navigation} />
    </CopilotProvider>
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
  cancelVote: {
    fontFamily: font.InterRegular,
    fontSize: mvs(13),
    fontWeight: '400',
    color: color.Error[900],
  },
});
