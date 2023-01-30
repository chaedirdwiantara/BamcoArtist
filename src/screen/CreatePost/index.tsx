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
import {ListDataSearchSongs} from '../../interface/search.interface';
import {usePlayerHook} from '../../hooks/use-player.hook';
import {dummySongImg} from '../../data/image';

type PostDetailProps = NativeStackScreenProps<RootStackParams, 'CreatePost'>;

const CreatePost: FC<PostDetailProps> = ({route}: PostDetailProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const data = route.params;

  const [inputText, setInputText] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState({
    modalFilter: false,
    modalImagePicker: false,
  });

  const {dataCreatePost, createPostLoading, setCreatePost} = useFeedHook();
  const {isLoadingImage, dataImage, setUploadImage} = useUploadImageHook();
  const {
    isPlay,
    seekPlayer,
    setMusicDataPlayer,
    setPauseSong,
    setPlaySong,
    duration,
    currentProgress,
  } = usePlayerHook();

  const [label, setLabel] = useState<string>();
  const [valueFilter, setValueFilter] = useState<string>();
  const [dataAudience, setDataAudience] = useState<string>('');
  const [dataResponseImg, setDataResponseImg] = useState<string[]>([]);
  const [musicData, setMusicData] = useState<ListDataSearchSongs>();
  const [pauseModeOn, setPauseModeOn] = useState<boolean>(false);

  // * Hooks for uploading
  const [uri, setUri] = useState<Image[]>([]);
  const [active, setActive] = useState<boolean>(false);

  // ! UPLOAD PHOTO STEPS
  // * 1. set to hook state picked images
  const sendUri = (val: Image[]) => {
    uri.length + val.length <= 4 ? setUri([...uri, ...val]) : null;
  };

  //  * 2. trigger hook state to active when Post Button pressed
  const handlePostOnPress = () => {
    setActive(true);
  };

  //  * 3. trigger hook to hit upload image api
  useEffect(() => {
    if (active == true && uri.length == 0 && musicData == undefined) {
      setCreatePost({
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === 'Exclusive' ? true : false,
      });
    }

    if (active == true && uri.length !== 0) {
      for (let i = 0; i < uri.length; i++) {
        setUploadImage(uri[i]);
      }
    }
    if (active == true && uri.length == 0 && musicData !== undefined) {
      setCreatePost({
        caption: inputText,
        category: valueFilter ? valueFilter : 'highlight',
        isPremium: dataAudience === 'Exclusive' ? true : false,
        quoteToPost:
          musicData !== undefined && musicData?.transcodedSongUrl !== undefined
            ? {
                targetId: musicData.id?.toString(),
                targetType: 'song',
                title: musicData.title,
                musician: musicData.musicianName,
                coverImage: musicData.imageUrl
                  ? musicData.imageUrl
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

  //  * 5. hook to hit create post api when all data uploaded has beed received
  useEffect(() => {
    active && uri.length !== 0 && dataResponseImg.length === uri.length
      ? (setCreatePost({
          caption: inputText,
          category: valueFilter ? valueFilter : 'highlight',
          image: dataResponseImg,
          isPremium: dataAudience === 'Exclusive' ? true : false,
          quoteToPost:
            musicData !== undefined &&
            musicData?.transcodedSongUrl !== undefined
              ? {
                  targetId: musicData.id?.toString(),
                  targetType: 'song',
                  title: musicData.title,
                  musician: musicData.musicianName,
                  coverImage: musicData.imageUrl,
                  encodeDashUrl: musicData.transcodedSongUrl[0].encodedDashUrl,
                  encodeHlsUrl: musicData.transcodedSongUrl[0].encodedHlsUrl,
                  startAt: '0:00',
                }
              : undefined,
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
    if (data !== undefined) {
      setMusicData(data);
      setPauseModeOn(false);
    }
  }, [data]);

  useEffect(() => {
    if (musicData !== undefined) {
      setMusicDataPlayer({
        id: musicData.transcodedSongUrl[0].songId,
        title: musicData.title,
        artist: musicData.musicianName,
        albumImg: musicData.imageUrl,
        musicUrl: musicData.transcodedSongUrl[0].encodedHlsUrl,
        musicianId: musicData.musicianUUID,
      });
    }
  }, [musicData]);

  const onPressPlaySong = () => {
    setPlaySong();
    seekPlayer(0);
    setPauseModeOn(true);
  };

  const handlePausePlay = () => {
    if (isPlay) {
      setPauseSong();
    } else {
      setPlaySong();
    }
  };

  const handleClosedPlayer = () => {
    setPauseModeOn(false);
    setMusicData(undefined);
    if (isPlay) {
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
          title="Create Post"
          maxLengthTitle={20}
          itemStrokeColor={'white'}
          leftIconAction={navigation.goBack}
        />
        <View style={styles.mainContainer}>
          {/* //! TOP AREA */}
          <View style={styles.topBody}>
            <View style={styles.userCategory}>
              <Avatar />
              <Gap width={12} />
              <ButtonGradientwithIcon
                label={label ? label : 'Select Category'}
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
                placeholder={'Write Something...'}
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
              {musicData !== undefined && (
                <MusicPreview
                  targetId={musicData.id.toString()}
                  title={musicData.title}
                  musician={musicData.musicianName}
                  coverImage={
                    musicData.imageUrl ? musicData.imageUrl : dummySongImg
                  }
                  encodeDashUrl={musicData.transcodedSongUrl[0].encodedDashUrl}
                  encodeHlsUrl={musicData.transcodedSongUrl[0].encodedHlsUrl}
                  startAt={'0:00'}
                  onPress={onPressPlaySong}
                  closeOnPress={handleClosedPlayer}
                  isPlay={isPlay}
                  playOrPause={handlePausePlay}
                  pauseModeOn={pauseModeOn}
                  currentProgress={currentProgress}
                  duration={duration}
                  seekPlayer={seekPlayer}
                />
              )}
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
                  placeHolder={'Set Audience'}
                  selectedMenu={resultDataAudience}
                  containerStyle={{
                    width: widthResponsive(138),
                    marginLeft: widthResponsive(-57),
                  }}
                  placeHolderStyles={styles.placeHolderStyle}
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
                  label={'Post'}
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
                  label={'Post'}
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
        />
        <ModalImagePicker
          title={'Upload media'}
          modalVisible={isModalVisible.modalImagePicker}
          sendUri={() => {}}
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
