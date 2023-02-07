import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  InteractionManager,
} from 'react-native';
import {mvs} from 'react-native-size-matters';
import {Image} from 'react-native-image-crop-picker';

import {SsuInput} from '../../atom';
import {Dropdown} from '../DropDown';
import {color, font} from '../../../theme';
import {PhotoPlaylist} from './PhotoPlaylist';
import {TopNavigation} from '../TopNavigation';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {dataVisibility} from '../../../data/playlist';
import TopSong from '../../../screen/ListCard/TopSong';
import {uploadImage} from '../../../api/uploadImage.api';
import {updatePlaylist} from '../../../api/playlist.api';
import {ModalLoading} from '../ModalLoading/ModalLoading';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {SongList} from '../../../interface/song.interface';
import {ArrowLeftIcon, SaveIcon} from '../../../assets/icon';
import {Playlist} from '../../../interface/playlist.interface';
import {heightPercentage, width, widthPercentage} from '../../../utils';

interface EditPlaylistProps {
  playlist: Playlist;
  listSongs: SongList[];
  goToPlaylist: (params: any) => void;
  onPressGoBack: () => void;
}

export const EditPlaylistContent: React.FC<EditPlaylistProps> = ({
  playlist,
  goToPlaylist,
  onPressGoBack,
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
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

          {/* <TopSong
            dataSong={listSongs}
            hideDropdownMore={true}
            onPress={() => null}
          /> */}
        </ScrollView>

        <ModalImagePicker
          title="Edit Playlist Cover"
          modalVisible={isModalVisible.modalImage}
          sendUri={sendUri}
          sendUriMultiple={() => null}
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
});
