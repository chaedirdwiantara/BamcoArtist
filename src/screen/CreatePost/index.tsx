import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {color, font} from '../../theme';
import {
  Avatar,
  Button,
  ButtonGradient,
  ButtonGradientwithIcon,
  Dropdown,
  Gap,
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
import {
  ImportMusicIcon,
  ImportPhotoIcon,
  OpenCameraIcon,
} from '../../assets/icon';
import {
  DataDropDownType,
  dropdownCategoryMusician,
  dropDownSetAudience,
} from '../../data/dropdown';
import FilterModal from './modalFilter';
import ImageList from './showImage';
import {useFeedHook} from '../../hooks/use-feed.hook';
import {useUploadImageHook} from '../../hooks/use-uploadImage.hook';
import {ModalLoading} from '../../components/molecule/ModalLoading/ModalLoading';
import {Image} from 'react-native-image-crop-picker';
import MusicPreview from '../../components/molecule/MusicPreview/MusicPreview';
import {ListDataSearchSongs, Transcode} from '../../interface/search.interface';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {dummySongImg} from '../../data/image';
import {SongList, TranscodedSongType} from '../../interface/song.interface';
import {useProfileHook} from '../../hooks/use-profile.hook';
import {useTranslation} from 'react-i18next';

type PostDetailProps = NativeStackScreenProps<RootStackParams, 'CreatePost'>;

const CreatePost: FC<PostDetailProps> = ({route}: PostDetailProps) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const dataSongNavigation = route.params?.songData;
  const dataUpdatePostProps = route.params?.postData;

  const [inputText, setInputText] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState({
    modalFilter: false,
    modalImagePicker: false,
  });

  const {
    dataCreatePost,
    createPostLoading,
    dataUpdatePost,
    setCreatePost,
    setUpdatePost,
  } = useFeedHook();
  const {isLoadingImage, dataImage, setUploadImage} = useUploadImageHook();
  const {
    isPlaying,
    seekPlayer,
    setPauseSong,
    setPlaySong,
    playerProgress,
    addPlaylist,
  } = usePlayerHook();
  const {dataProfile, getProfileUser} = useProfileHook();
  const [label, setLabel] = useState<string>();
  const [valueFilter, setValueFilter] = useState<string>();
  const [dataAudience, setDataAudience] = useState<string>('');
  const [dataResponseImg, setDataResponseImg] = useState<string[]>([]);
  const [musicData, setMusicData] = useState<ListDataSearchSongs>();
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);
  const [updateOn, setUpdateOn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  // * Hooks for uploading
  const [uri, setUri] = useState<Image[]>([]);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    getProfileUser();
  }, []);

  // ! EDIT POST AREA
  useEffect(() => {
    if (dataUpdatePostProps !== undefined && updateOn == false) {
      setUserId(dataUpdatePostProps.id);
      setUpdateOn(true);
      setLabel(dataUpdatePostProps.category);
      setValueFilter(dataUpdatePostProps.category);
      setInputText(dataUpdatePostProps.caption);
      setDataAudience(
        (dataUpdatePostProps.isPremium
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
    }
  }, [dataUpdatePostProps, updateOn]);

  useEffect(() => {
    dataUpdatePost !== null && navigation.goBack(), setUpdateOn(false);
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
    setActive(true);
  };

  //  * 3. trigger hook to hit upload image api
  useEffect(() => {
    if (
      active == true &&
      uri.length == 0 &&
      musicData == undefined &&
      dataUpdatePostProps === undefined
    ) {
      setCreatePost({
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === t('Feed.Exclusive') ? true : false,
      });
    }

    // ? for UPDATE POST text only
    if (
      active == true &&
      uri.length == 0 &&
      musicData == undefined &&
      dataUpdatePostProps !== undefined
    ) {
      setUpdatePost({
        id: dataUpdatePostProps.id,
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === t('Feed.Exclusive') ? true : false,
      });
    }

    if (active == true && uri.length !== 0) {
      for (let i = 0; i < uri.length; i++) {
        setUploadImage(uri[i]);
      }
    }

    if (
      active == true &&
      uri.length == 0 &&
      musicData !== undefined &&
      updateOn === false
    ) {
      setCreatePost({
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === t('Feed.Exclusive') ? true : false,
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

    // ? for EDIT UPLOAD MUSIC only
    if (
      active == true &&
      uri.length == 0 &&
      musicData !== undefined &&
      updateOn === true
    ) {
      setUpdatePost({
        id: userId,
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === t('Feed.Exclusive') ? true : false,
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
  }, [active, uri, musicData]);

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
    dataUpdatePostProps === undefined
      ? (setCreatePost({
          caption: inputText,
          category: valueFilter ? valueFilter : 'highlight',
          image: dataResponseImg,
          isPremium: dataAudience === t('Feed.Exclusive') ? true : false,
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
          isPremium: dataAudience === t('Feed.Exclusive') ? true : false,
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
      imageUrl: dataMusic[0] ? dataMusic[0].imageUrl : undefined,
      songDuration:
        dataMusic[0] && dataMusic[0].songDuration !== null
          ? dataMusic[0].songDuration
          : 60,
      lyrics: dataMusic[0] ? dataMusic[0].lyrics : '',
      transcodedSongUrl: [transcode, transcode],
      originalSongUrl: dataMusic[0] ? dataMusic[0].originalSongUrl : '',
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
    });
  };

  const closeImage = (id: number) => {
    setUri(uri.filter((x: Image) => x.path !== uri[id].path));
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <TopNavigation.Type1
          title={t('Post.Create.Title')}
          maxLengthTitle={20}
          itemStrokeColor={'white'}
          leftIconAction={navigation.goBack}
        />
        <View style={styles.mainContainer}>
          {/* //! TOP AREA */}
          <View style={styles.topBody}>
            <View style={styles.userCategory}>
              <Avatar
                imgUri={
                  dataProfile && dataProfile?.data.imageProfileUrls.length > 0
                    ? dataProfile?.data.imageProfileUrls[0].image
                    : ''
                }
              />
              <Gap width={12} />
              <ButtonGradientwithIcon
                label={label ? t(label) : t('Post.Create.Category')}
                onPress={() =>
                  setModalVisible({
                    modalFilter: true,
                    modalImagePicker: false,
                  })
                }
                gradientStyles={{}}
                textStyles={{
                  fontFamily: font.InterRegular,
                  fontWeight: '500',
                  fontSize: mvs(10),
                }}
              />
            </View>
            <View style={{}}>
              <SsuInput.InputText
                value={inputText}
                onChangeText={(newText: string) => setInputText(newText)}
                placeholder={`${t('Post.Create.Write')}...`}
                containerStyles={{
                  width: widthResponsive(290),
                  backgroundColor: 'transparent',
                  paddingLeft: 0,
                }}
                multiline={true}
                maxLength={400}
              />
              <ImageList
                imgData={uri}
                disabled={true}
                width={162}
                height={79}
                onPress={closeImage}
              />
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
          </View>
          {/* //! END OF TOP AREA */}

          {/* //! BOTTOM AREA */}
          <View style={styles.footerBody}>
            <View style={styles.iconsAndCategory}>
              <View style={styles.iconsContainer}>
                {!musicData && (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        setModalVisible({
                          modalFilter: false,
                          modalImagePicker: true,
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
              <View style={styles.dropdownContainer}>
                <Dropdown.Menu
                  data={dropDownSetAudience}
                  placeHolder={t('Post.Create.Audience')}
                  selectedMenu={resultDataAudience}
                  containerStyle={{
                    width: widthResponsive(138),
                    marginLeft: widthResponsive(-57),
                  }}
                  placeHolderStyles={styles.placeHolderStyle}
                  translation={true}
                />
              </View>
            </View>
            <View style={styles.textCounter}>
              <Text
                style={[
                  styles.footerText,
                  {
                    color:
                      inputText.length === 400
                        ? color.Error[400]
                        : color.Neutral[10],
                  },
                ]}>
                {inputText.length}/400
              </Text>
              {inputText.length === 0 ? (
                <Button
                  label={t('Post.Title')}
                  containerStyles={{
                    width: widthResponsive(100),
                    aspectRatio: heightResponsive(279 / 77),
                    backgroundColor: color.Dark[50],
                  }}
                  textStyles={{}}
                  // onPress={handlePostOnPress}
                  disabled
                />
              ) : (
                <ButtonGradient
                  label={t('Post.Title')}
                  gradientStyles={{
                    width: widthResponsive(100),
                    aspectRatio: heightResponsive(279 / 77),
                  }}
                  textStyles={{}}
                  onPress={handlePostOnPress}
                />
              )}
            </View>
          </View>
          {/* //! END OF BOTTOM AREA */}
        </View>

        {/* //! MODAL AREA */}
        <FilterModal
          toggleModal={() =>
            setModalVisible({
              modalFilter: !isModalVisible.modalFilter,
              modalImagePicker: false,
            })
          }
          modalVisible={isModalVisible.modalFilter}
          dataFilter={dropdownCategoryMusician}
          filterOnPress={setLabel}
          sendCategory={setValueFilter}
          translation={true}
        />
        <ModalImagePicker
          title={t('Post.Create.Media') || ''}
          modalVisible={isModalVisible.modalImagePicker}
          sendUri={sendSingleUri}
          sendUriMultiple={sendUri}
          onDeleteImage={resetImage}
          onPressClose={closeModal}
          multiple
        />
        <ModalLoading visible={isLoadingImage} />
        <ModalLoading visible={createPostLoading} />
        {/* //! END OF MODAL AREA */}
      </View>
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
    paddingTop: widthResponsive(16),
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
    borderColor: color.Dark[50],
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
});
