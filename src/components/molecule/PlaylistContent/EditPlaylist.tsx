import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  InteractionManager,
  TouchableOpacity,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {mvs} from 'react-native-size-matters';
import {Image} from 'react-native-image-crop-picker';

import {Gap, SsuInput, SsuToast} from '../../atom';
import {Dropdown} from '../DropDown';
import {color, font, typography} from '../../../theme';
import {PhotoPlaylist} from './PhotoPlaylist';
import {TopNavigation} from '../TopNavigation';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {dataVisibility} from '../../../data/playlist';
import {uploadImage} from '../../../api/uploadImage.api';
import {updatePlaylist} from '../../../api/playlist.api';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {SongList} from '../../../interface/song.interface';
import {
  ArrowLeftIcon,
  MenuIcon,
  MinusCircleIcon,
  SaveIcon,
  TickCircleIcon,
} from '../../../assets/icon';
import {Playlist} from '../../../interface/playlist.interface';
import {
  heightPercentage,
  heightResponsive,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';

interface EditPlaylistProps {
  playlist: Playlist;
  listSongs: SongList[] | undefined;
  goToPlaylist: (params: any) => void;
  onPressGoBack: () => void;
  toastVisible: boolean;
  setToastVisible: (param: boolean) => void;
  onPressRemoveSong: (songId: number, songName: string) => void;
  toastText: string;
}

export const EditPlaylistContent: React.FC<EditPlaylistProps> = ({
  playlist,
  listSongs,
  goToPlaylist,
  onPressGoBack,
  toastVisible,
  setToastVisible,
  onPressRemoveSong,
  toastText,
}) => {
  const isPublic = playlist.isPublic ? 'Public' : 'Private';
  const [state, setState] = useState({
    playlistName: playlist.name || '',
    playlistDesc: playlist.description || '',
    isPublic: isPublic,
    thumbnailUrl: playlist.thumbnailUrl || '',
  });

  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
    modalImage: false,
  });
  const [playlistUri, setPlaylistUri] = useState({
    path: playlist.thumbnailUrl || '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeText = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const setUploadImage = async (image: Image) => {
    InteractionManager.runAfterInteractions(() => setIsLoading(true));
    try {
      const response = await uploadImage(image);
      setState({...state, thumbnailUrl: response.data});
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetImage = () => {
    setPlaylistUri({path: ''});
    setModalVisible({
      modalConfirm: false,
      modalImage: false,
    });
  };

  const sendUri = (val: Image) => {
    setUploadImage(val);
    setPlaylistUri(val);
  };

  const openModal = (type: string) => {
    setModalVisible({
      ...isModalVisible,
      [type]: true,
    });
  };

  const closeModal = () => {
    setModalVisible({
      modalConfirm: false,
      modalImage: false,
    });
  };

  const onPressConfirm = async () => {
    InteractionManager.runAfterInteractions(() => setIsLoading(true));
    try {
      const payload = {
        name: state.playlistName,
        description: state.playlistDesc,
        thumbnailUrl: state.thumbnailUrl,
        isPublic: state.isPublic === 'Public',
      };
      const response = await updatePlaylist(playlist, payload);
      goToPlaylist(response.data.id);
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const hideMenuDelete =
    playlistUri?.path !== undefined && playlistUri?.path !== '';

  const maxColorTitle =
    state.playlistName.length === 100 ? color.Error[400] : color.Neutral[10];
  const maxColorDesc =
    state.playlistDesc.length === 600 ? color.Error[400] : color.Neutral[10];

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.root}>
        <TopNavigation.Type4
          title="Edit Playlist"
          rightIcon={<SaveIcon />}
          leftIcon={<ArrowLeftIcon />}
          itemStrokeColor={color.Neutral[10]}
          leftIconAction={onPressGoBack}
          rightIconAction={() => openModal('modalConfirm')}
          containerStyles={{paddingHorizontal: widthPercentage(20)}}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center'}}>
            <PhotoPlaylist
              uri={playlistUri?.path}
              showIcon
              onPress={() => openModal('modalImage')}
            />

            <View>
              <SsuInput.InputLabel
                label=""
                value={state.playlistName}
                onChangeText={(newText: string) => {
                  onChangeText('playlistName', newText);
                }}
                placeholder={'Playlist Name'}
                containerStyles={styles.textInput}
                maxLength={100}
                numberOfLines={1}
              />
              <Text
                style={[
                  styles.length,
                  {color: maxColorTitle},
                ]}>{`${state.playlistName.length}/100`}</Text>
            </View>

            <View>
              <SsuInput.InputLabel
                label=""
                value={state.playlistDesc}
                onChangeText={(newText: string) => {
                  onChangeText('playlistDesc', newText);
                }}
                placeholder={'Playlist Description'}
                inputStyles={styles.inputDesc}
                maxLength={600}
                numberOfLines={5}
                multiline
                containerStyles={{
                  marginTop: heightPercentage(15),
                  marginBottom: heightPercentage(4),
                }}
              />
              <Text
                style={[
                  styles.length,
                  {color: maxColorDesc},
                ]}>{`${state.playlistDesc.length}/600`}</Text>
            </View>

            <Dropdown.Input
              data={dataVisibility}
              initialValue={state.isPublic}
              placeHolder={'Visibility'}
              dropdownLabel={'Visibility'}
              textTyped={(newText: {label: string; value: string}) =>
                onChangeText('isPublic', newText.value)
              }
              containerStyles={{
                marginTop: heightPercentage(15),
                width: width * 0.9,
              }}
            />
          </View>

          <View style={styles.containerListSong}>
            <FlashList
              data={listSongs ?? []}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({item, index}) => (
                <View key={index} style={styles.containerSong}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => onPressRemoveSong(item.id, item.title)}>
                      <MinusCircleIcon />
                    </TouchableOpacity>
                    <Gap width={widthPercentage(10)} />
                    <View>
                      <Text style={styles.songTitle}>{item.title}</Text>
                      <Text style={styles.songDesc}>{item.musicianName}</Text>
                    </View>
                  </View>

                  <MenuIcon />
                </View>
              )}
              estimatedItemSize={heightResponsive(500)}
            />
          </View>
        </ScrollView>

        <ModalImagePicker
          title="Edit Playlist Cover"
          modalVisible={isModalVisible.modalImage}
          sendUri={sendUri}
          onDeleteImage={resetImage}
          onPressClose={closeModal}
          hideMenuDelete={hideMenuDelete}
        />

        <ModalConfirm
          modalVisible={isModalVisible.modalConfirm}
          title="Save"
          subtitle="Are you sure you want to update your playlist?"
          onPressClose={closeModal}
          onPressOk={onPressConfirm}
        />

        <SsuToast
          modalVisible={toastVisible}
          onBackPressed={() => setToastVisible(false)}
          children={
            <View style={[styles.modalContainer]}>
              <TickCircleIcon
                width={widthPercentage(21)}
                height={heightPercentage(20)}
                stroke={color.Neutral[10]}
              />
              <Gap width={widthPercentage(7)} />
              <Text style={[typography.Button2, styles.textStyle]}>
                {toastText}
              </Text>
            </View>
          }
          modalStyle={{marginHorizontal: widthPercentage(24)}}
        />

        <ModalLoading visible={isLoading} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  containerContent: {
    paddingHorizontal: widthPercentage(12),
    alignItems: 'center',
  },
  containerInput: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: heightPercentage(15),
  },
  textInput: {
    width: width * 0.9,
    marginTop: heightPercentage(10),
    marginBottom: heightPercentage(4),
  },
  textArea: {
    paddingHorizontal: 0,
    marginVertical: heightPercentage(10),
    marginTop: heightPercentage(15),
  },
  footer: {
    width: widthPercentage(327),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: heightPercentage(40),
  },
  btnContainer: {
    width: widthPercentage(150),
    aspectRatio: heightPercentage(150 / 36),
  },
  inputDesc: {
    width: width * 0.9,
    aspectRatio: 3 / 1,
    textAlignVertical: 'top',
    marginBottom: heightPercentage(4),
  },
  length: {
    fontFamily: font.InterRegular,
    fontSize: mvs(11),
  },
  containerListSong: {
    flex: 1,
    paddingHorizontal: widthPercentage(20),
    paddingTop: heightPercentage(15),
    marginBottom: heightPercentage(30),
  },
  songTitle: {
    fontFamily: font.InterRegular,
    fontSize: normalize(12),
    fontWeight: '500',
    color: color.Neutral[10],
  },
  songDesc: {
    fontFamily: font.InterRegular,
    fontWeight: '500',
    fontSize: normalize(10),
    color: color.Dark[50],
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: heightPercentage(22),
    height: heightPercentage(36),
    backgroundColor: color.Success[400],
    paddingHorizontal: widthPercentage(12),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: color.Neutral[10],
  },
  containerSong: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: mvs(15),
  },
});
