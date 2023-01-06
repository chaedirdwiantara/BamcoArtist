import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {SsuInput} from '../../atom';
import {color, font} from '../../../theme';
import {PhotoPlaylist} from './PhotoPlaylist';
import {TopNavigation} from '../TopNavigation';
import {ModalConfirm} from '../Modal/ModalConfirm';
import {ModalImagePicker} from '../Modal/ModalImagePicker';
import {ArrowLeftIcon, SaveIcon} from '../../../assets/icon';
import {
  heightPercentage,
  normalize,
  width,
  widthPercentage,
} from '../../../utils';
import {Dropdown} from '../DropDown';
import {dataVisibility} from '../../../data/playlist';
import {updatePlaylist} from '../../../api/playlist.api';
import {Playlist} from '../../../interface/playlist.interface';

// note: title menggunakan text area dan dan description sebaliknya
// itu karena, menyesuaikan UI di figma dengan component yang sudah dibuat (border)

interface EditPlaylistProps {
  playlist: Playlist;
  goToPlaylist: (params: any) => void;
  onPressGoBack: () => void;
}

export const EditPlaylistContent: React.FC<EditPlaylistProps> = ({
  playlist,
  goToPlaylist,
  onPressGoBack,
}) => {
  const [state, setState] = useState({
    playlistName: playlist.name || '',
    playlistDesc: playlist.description || '',
    isPublic: playlist.isPublic || true,
  });
  const [isModalVisible, setModalVisible] = useState({
    modalConfirm: false,
    modalImage: false,
  });
  const [playlistUri, setPlaylistUri] = useState({
    path: playlist.thumbnailUrl || undefined,
  });
  const [focusInput, setFocusInput] = useState<'name' | 'description' | null>(
    null,
  );

  const onChangeText = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const resetImage = () => {
    setPlaylistUri({path: undefined});
    setModalVisible({
      modalConfirm: false,
      modalImage: false,
    });
  };

  const sendUri = (val: React.SetStateAction<{path: undefined}>) => {
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

  const handleFocusInput = (focus: 'name' | 'description' | null) => {
    setFocusInput(focus);
  };

  const onPressConfirm = async () => {
    try {
      const payload = {
        name: state.playlistName,
        description: state.playlistDesc,
        thumbnailUrl: '',
        isPublic: true,
      };
      const response = await updatePlaylist(playlist, payload);
      goToPlaylist(response.data.id);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const hideMenuDelete =
    playlistUri?.path !== undefined && playlistUri?.path !== '';

  const maxColorTitle =
    state.playlistName.length === 100 ? color.Error[400] : color.Neutral[10];
  const maxColorDesc =
    state.playlistDesc.length === 600 ? color.Error[400] : color.Neutral[10];

  return (
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

      <View style={styles.containerContent}>
        <PhotoPlaylist
          uri={playlistUri?.path}
          showIcon
          onPress={() => openModal('modalImage')}
        />

        <View>
          <SsuInput.TextArea
            value={state.playlistName}
            onChangeText={(newText: string) =>
              onChangeText('playlistName', newText)
            }
            placeholder={'Playlist Name'}
            containerStyles={styles.textInput}
            numberOfLines={1}
            maxLength={100}
            multiline={false}
            onFocus={() => {
              handleFocusInput('name');
            }}
            onBlur={() => {
              handleFocusInput(null);
            }}
            isFocus={focusInput === 'name'}
          />
          <Text
            style={[
              styles.length,
              {color: maxColorTitle},
            ]}>{`${state.playlistName.length}/100`}</Text>
        </View>

        <View>
          <SsuInput.TextArea
            value={state.playlistDesc}
            onChangeText={(newText: string) =>
              onChangeText('playlistDesc', newText)
            }
            placeholder={'Playlist Description'}
            containerStyles={styles.textArea}
            multiline
            numberOfLines={5}
            maxLength={600}
            inputStyles={styles.inputDesc}
            onFocus={() => {
              handleFocusInput('description');
            }}
            onBlur={() => {
              handleFocusInput(null);
            }}
            isFocus={focusInput === 'description'}
          />
          <Text
            style={[
              styles.length,
              {color: maxColorDesc},
            ]}>{`${state.playlistDesc.length}/600`}</Text>
        </View>

        <Dropdown.Input
          data={dataVisibility}
          placeHolder={'Visibility'}
          dropdownLabel={'Visibility'}
          textTyped={(newText: string) => onChangeText('isPublic', newText)}
          containerStyles={{marginTop: heightPercentage(15)}}
        />
      </View>

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
    </View>
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
    marginTop: heightPercentage(10),
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
    textAlignVertical: 'top',
    paddingHorizontal: widthPercentage(10),
  },
  length: {
    fontFamily: font.InterRegular,
    fontSize: normalize(12),
  },
});
